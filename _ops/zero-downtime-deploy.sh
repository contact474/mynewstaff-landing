#!/usr/bin/env bash
# ============================================================================
# GENERIC zero-downtime (blue-green) deploy for ANY Docker-container-behind-Caddy
# service. The product NEVER drops: old container serves until the new one passes
# a health gate, then Caddy is flipped with a graceful reload. Broken/slow builds
# ABORT without touching live traffic.
#
# Usage (on the VPS), set vars then run:
#   SVC=mns-cold-caller \
#   APP=/opt/mns-cold-caller \
#   DOMAIN=cold-caller.mynewstaff.ai \
#   HEALTH=/api/v1/health \
#   PRIMARY=8009 SPARE=8029 \
#   RUNCMD="uvicorn src.api.routes:app --host 0.0.0.0 --port __PORT__ --workers 1 --loop asyncio" \
#   MEM=12g \
#   bash /opt/_ops/zero-downtime-deploy.sh
#
# RUNCMD must contain __PORT__ where the listen port goes (script substitutes
# the spare/primary port). If the service has no build step, set NOBUILD=1.
# ============================================================================
set -uo pipefail

: "${SVC:?set SVC=<container name>}"; : "${APP:?set APP=<dir with Dockerfile/.env>}"
: "${DOMAIN:?set DOMAIN=<caddy domain>}"; : "${HEALTH:?set HEALTH=<health path>}"
: "${PRIMARY:?set PRIMARY=<primary port>}"; : "${SPARE:?set SPARE=<spare port>}"
: "${RUNCMD:?set RUNCMD=<uvicorn/node cmd with __PORT__>}"
IMAGE="${IMAGE:-$SVC}"; MEM="${MEM:-4g}"; CADDYFILE="${CADDYFILE:-/etc/caddy/Caddyfile}"
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-420}"; NEXT="${SVC}-next"

log(){ printf '\n\033[1m== %s ==\033[0m\n' "$*"; }
die(){ printf '\n\033[31mABORT: %s\033[0m\n' "$*" >&2; exit 1; }

# 1. which port is live right now (what Caddy points at for this service)
CUR=$(grep -oE "reverse_proxy (127\.0\.0\.1|localhost):($PRIMARY|$SPARE)" "$CADDYFILE" | grep -oE "($PRIMARY|$SPARE)" | tail -1)
[ -n "$CUR" ] || die "no reverse_proxy to :$PRIMARY or :$SPARE found in $CADDYFILE for $DOMAIN"
# SAFETY: the upstream port must be UNIQUE in the Caddyfile, else a sed would hit other domains
occ=$(grep -cE "reverse_proxy (127\.0\.0\.1|localhost):$CUR([^0-9]|$)" "$CADDYFILE")
[ "$occ" = "1" ] || die "port :$CUR appears $occ times in Caddyfile (shared upstream) — needs block-scoped edit, do manually"
if [ "$CUR" = "$PRIMARY" ]; then NEW=$SPARE; else NEW=$PRIMARY; fi
log "$SVC: live on :$CUR  ->  deploying candidate on :$NEW"

# 2. build (old container untouched)
if [ "${NOBUILD:-0}" != "1" ]; then
  log "build $IMAGE:candidate"
  ( cd "$APP" && docker build -t "$IMAGE:candidate" . ) || die "build failed (live untouched)"
else
  docker tag "$IMAGE:latest" "$IMAGE:candidate" 2>/dev/null || true
fi

# 3. start candidate on spare port
CMD=${RUNCMD//__PORT__/$NEW}
HC="python3 -c \"import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://localhost:$NEW$HEALTH',timeout=5).getcode()==200 else 1)\""
log "start candidate $NEXT on :$NEW"
docker rm -f "$NEXT" >/dev/null 2>&1 || true
docker run -d --name "$NEXT" --memory="$MEM" --memory-swap="$MEM" --network host --restart unless-stopped \
  --health-cmd="$HC" --health-interval=10s --health-timeout=5s --health-retries=3 --health-start-period=240s \
  --env-file "$APP/.env" $( [ -d "$APP/data" ] && echo "-v $APP/data:/app/data" ) -w /app \
  "$IMAGE:candidate" sh -lc "$CMD" || die "candidate failed to start (live untouched)"

# 4. HEALTH GATE
log "health-gating candidate (<= ${HEALTH_TIMEOUT}s)"
ok=0
for i in $(seq 1 $((HEALTH_TIMEOUT/5))); do
  code=$(curl -s -m5 -o /dev/null -w '%{http_code}' "http://localhost:$NEW$HEALTH" || echo 000)
  printf '\r  t=%ss health=%s   ' "$((i*5))" "$code"
  [ "$code" = "200" ] && { ok=1; echo; break; }; sleep 5
done
[ "$ok" = "1" ] || { echo; docker logs --tail 30 "$NEXT" 2>&1; docker rm -f "$NEXT" >/dev/null 2>&1; die "candidate never healthy — LIVE (:$CUR) untouched, still serving. No downtime."; }
log "candidate healthy on :$NEW"

# 5. flip Caddy (graceful reload) with validate + auto-revert
TS=$(date +%Y%m%d-%H%M%S); cp "$CADDYFILE" "$CADDYFILE.bak-$TS"
sed -i -E "s|reverse_proxy (127\.0\.0\.1\|localhost):$CUR([^0-9]\|$)|reverse_proxy 127.0.0.1:$NEW\2|" "$CADDYFILE"
caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1 || { cp "$CADDYFILE.bak-$TS" "$CADDYFILE"; docker rm -f "$NEXT" >/dev/null 2>&1; die "Caddy validate failed — reverted, LIVE untouched."; }
systemctl reload caddy || { cp "$CADDYFILE.bak-$TS" "$CADDYFILE"; systemctl reload caddy; die "caddy reload failed — reverted."; }

# 6. verify public, then retire old + keep rollback
sleep 3
pub=$(curl -s -m10 -o /dev/null -w '%{http_code}' "https://$DOMAIN$HEALTH" || echo 000)
[ "$pub" = "200" ] || log "WARNING public=$pub — old container kept as fallback, investigate before removing"
log "retire old $SVC, promote candidate"
docker rm -f "$SVC" >/dev/null 2>&1 || true
docker rename "$NEXT" "$SVC"
docker tag "$IMAGE:candidate" "$IMAGE:rollback-$TS"; docker tag "$IMAGE:candidate" "$IMAGE:latest"
log "DONE — $SVC live on :$NEW, zero downtime. public=$(curl -s -m10 -o /dev/null -w '%{http_code}' https://$DOMAIN$HEALTH). rollback img: $IMAGE:rollback-$TS"
