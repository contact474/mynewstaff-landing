#!/usr/bin/env bash
# ============================================================================
# Zero-downtime (blue-green) deploy for the Brooke cold-caller container.
#
# WHY THIS EXISTS: the product must NEVER drop while we change the backend.
# The OLD container keeps serving the entire time. We build the new image,
# start it on a SPARE port, wait until it is HEALTHY, and only THEN flip the
# Caddy upstream (graceful reload = zero dropped connections) and retire the
# old one. A broken/slow build ABORTS and never touches live traffic.
#
# Run ON THE VPS:  bash deploy-cold-caller-zero-downtime.sh
# Safe to re-run. Never does `docker rm` on the live container before the
# replacement is proven healthy.
# ============================================================================
set -uo pipefail

APP=/opt/mns-cold-caller
IMAGE=mns-cold-caller
LIVE_NAME=mns-cold-caller
NEXT_NAME=mns-cold-caller-next
CADDYFILE=/etc/caddy/Caddyfile
HEALTH_PATH=/api/v1/health
PORT_A=8009          # primary
PORT_B=8029          # spare (8010=emp-api, 8011=pest — do NOT use)
HEALTH_TIMEOUT=420   # cold start is slow (~200s); allow margin
MEM=--memory=12g
MEMSWAP=--memory-swap=16g

log(){ printf '\n\033[1m== %s ==\033[0m\n' "$*"; }
die(){ printf '\n\033[31mABORT: %s\033[0m\n' "$*" >&2; exit 1; }

# --- 1. figure out which port is LIVE (what Caddy currently points at) ------
CUR_PORT=$(grep -oE 'reverse_proxy 127\.0\.0\.1:(8009|8029)' "$CADDYFILE" | grep -oE '(8009|8029)' | tail -1)
[ -n "$CUR_PORT" ] || die "could not read current cold-caller upstream port from $CADDYFILE"
if [ "$CUR_PORT" = "$PORT_A" ]; then NEW_PORT=$PORT_B; else NEW_PORT=$PORT_A; fi
log "live upstream = :$CUR_PORT   ->   deploying candidate on :$NEW_PORT"

# --- 2. build new image (does NOT affect the running container) -------------
log "building image"
( cd "$APP" && docker build -t "$IMAGE:candidate" . ) || die "build failed (live container untouched)"

# --- 3. start candidate on the spare port -----------------------------------
log "starting candidate on :$NEW_PORT"
docker rm -f "$NEXT_NAME" >/dev/null 2>&1 || true
docker run -d --name "$NEXT_NAME" $MEM $MEMSWAP --network host --restart unless-stopped \
  --health-cmd="python3 -c \"import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://localhost:$NEW_PORT$HEALTH_PATH',timeout=5).getcode()==200 else 1)\"" \
  --health-interval=10s --health-timeout=5s --health-retries=3 --health-start-period=240s \
  --env-file "$APP/.env" -v "$APP/data:/app/data" -w /app \
  "$IMAGE:candidate" \
  uvicorn src.api.routes:app --host 0.0.0.0 --port "$NEW_PORT" --workers 1 --loop asyncio \
  || die "could not start candidate (live container untouched)"

# --- 4. HEALTH GATE — wait until candidate truly serves 200 -----------------
log "health-gating candidate (up to ${HEALTH_TIMEOUT}s — cold start is slow)"
ok=0
for i in $(seq 1 $((HEALTH_TIMEOUT/5))); do
  code=$(curl -s -m5 -o /dev/null -w '%{http_code}' "http://localhost:$NEW_PORT$HEALTH_PATH" || echo 000)
  printf '\r  t=%ss health=%s   ' "$((i*5))" "$code"
  if [ "$code" = "200" ]; then ok=1; echo; break; fi
  sleep 5
done
if [ "$ok" != "1" ]; then
  echo
  docker logs --tail 30 "$NEXT_NAME" 2>&1 || true
  docker rm -f "$NEXT_NAME" >/dev/null 2>&1 || true
  die "candidate never became healthy — LIVE (:$CUR_PORT) untouched, still serving. No downtime."
fi
log "candidate healthy on :$NEW_PORT"

# --- 5. flip Caddy upstream (graceful reload = zero dropped connections) ----
TS=$(date +%Y%m%d-%H%M%S)
cp "$CADDYFILE" "$CADDYFILE.bak-$TS"
sed -i "s|reverse_proxy 127\.0\.0\.1:$CUR_PORT|reverse_proxy 127.0.0.1:$NEW_PORT|" "$CADDYFILE"
if ! caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1; then
  cp "$CADDYFILE.bak-$TS" "$CADDYFILE"
  docker rm -f "$NEXT_NAME" >/dev/null 2>&1 || true
  die "Caddyfile validation failed — reverted, LIVE untouched."
fi
systemctl reload caddy || { cp "$CADDYFILE.bak-$TS" "$CADDYFILE"; systemctl reload caddy; die "caddy reload failed — reverted."; }
log "traffic now flows to :$NEW_PORT"

# --- 6. verify public, THEN retire the old container ------------------------
sleep 3
pub=$(curl -s -m10 -o /dev/null -w '%{http_code}' "https://cold-caller.mynewstaff.ai$HEALTH_PATH" || echo 000)
[ "$pub" = "200" ] || log "WARNING: public health=$pub (old container still up as fallback — investigate before removing)"

log "retiring old container (was :$CUR_PORT)"
docker rm -f "$LIVE_NAME" >/dev/null 2>&1 || true
docker rename "$NEXT_NAME" "$LIVE_NAME"
docker tag "$IMAGE:candidate" "$IMAGE:rollback-$TS"   # keep a rollback image (don't let BuildKit prune it)
docker tag "$IMAGE:candidate" "$IMAGE:latest"

log "DONE — zero-downtime deploy complete. Live on :$NEW_PORT. Rollback image: $IMAGE:rollback-$TS"
echo "  public health: $(curl -s -m10 -o /dev/null -w '%{http_code}' https://cold-caller.mynewstaff.ai$HEALTH_PATH)"
