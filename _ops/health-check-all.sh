#!/usr/bin/env bash
# ============================================================================
# MNS fleet health check — one command to answer "is everything up?"
# Read-only (curls public domains + checks container/service state). Safe to run
# anytime, but it makes ~20 requests so don't spam it when the box is overloaded.
#
# Run on the VPS:  bash /opt/_ops/health-check-all.sh
# Use after a reboot / plan-upgrade to verify every service recovered.
# ============================================================================
set -uo pipefail
ok(){ printf '  \033[32m✓\033[0m %s\n' "$*"; }
bad(){ printf '  \033[31m✗ %s\033[0m\n' "$*"; }

echo "== HOST =="
echo -n "  load: "; cut -d' ' -f1-3 /proc/loadavg
free -m | awk '/Mem:/{printf "  mem: %sMB used / %sMB ( %sMB free )\n",$3,$2,$7}'
df -h / | awk 'NR==2{printf "  disk: %s used of %s ( %s free )\n",$3,$2,$4}'

echo "== PUBLIC ENDPOINTS (Caddy → service) =="
# domain  ->  optional health path (root if blank)
checks="
cold-caller.mynewstaff.ai|/api/v1/health
cold-caller.mynewstaff.ai|/widget/brooke.js
closerbuddy.mynewstaff.ai|/
studio.mynewstaff.ai|/
nexus.mynewstaff.ai|/
notes.mynewstaff.ai|/
agents.mynewstaff.ai|/
communitymanager.mynewstaff.ai|/
employees.mynewstaff.ai|/
mission.mynewstaff.ai|/
bcc-legal.mynewstaff.ai|/
content.mynewstaff.ai|/
"
while IFS='|' read -r host path; do
  [ -z "$host" ] && continue
  code=$(curl -s -m8 -o /dev/null -w '%{http_code}' "https://$host$path" || echo 000)
  case "$code" in 2*|3*|101) ok "$host$path → $code";; *) bad "$host$path → $code";; esac
done <<< "$checks"

echo "== DOCKER CONTAINERS (should all be Up) =="
for c in mns-cold-caller content-engine-api mns-command heatseak-pest closerbuddy \
         mns-ad-engine mirofish armando-tts paperclip mns-whatsapp lead-scraper \
         rai-orchestrator rai-wppconnect mns-postgres redis affine_postgres affine_redis affine_server; do
  st=$(docker inspect "$c" --format '{{.State.Status}}' 2>/dev/null || echo missing)
  [ "$st" = running ] && ok "$c" || bad "$c → $st"
done

echo "== STATEFUL (data — never blue-green, verify only) =="
docker exec mns-postgres pg_isready 2>/dev/null | sed 's/^/  pg: /' || bad "mns-postgres pg_isready failed"
docker exec redis redis-cli ping 2>/dev/null | sed 's/^/  redis: /' || bad "redis ping failed"

echo "== KEY systemd SERVICES =="
for s in caddy employee-api hermes-gateway obscura; do
  a=$(systemctl is-active "$s" 2>/dev/null)
  [ "$a" = active ] && ok "$s" || bad "$s → $a"
done
echo "Done. Brooke cold start is ~200s — if it's just been restarted, re-run in a few min."
