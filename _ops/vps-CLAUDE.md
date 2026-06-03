# Claude — MNS VPS (82.25.92.135)

This box runs the live MNS backends. Any Claude session here is operating directly on production.

## HARD RULE — Zero-downtime deploys. The product NEVER drops.
Upgrades to ANY deployed service keep the OLD version serving until the NEW one is built,
health-verified, and swapped in (graceful). **NEVER** `docker rm` / `docker restart` / `pm2 restart`
/ `systemctl restart` / kill a live user-facing service to ship a change.

- **Docker behind Caddy** (mns-cold-caller :8009, content-engine-api :8000, mns-command, heatseak-pest :8011,
  closerbuddy :8008, mns-ad-engine, mirofish :3000/5001, armando-tts, paperclip…) →
  use **`/opt/_ops/zero-downtime-deploy.sh`** (blue-green: build → start on SPARE port → health-gate ≤420s →
  flip Caddy upstream + `systemctl reload caddy` → retire old → keep `:rollback-<ts>` image).
  Brooke wrapper: `/opt/mns-cold-caller/deploy-cold-caller-zero-downtime.sh`.
- **Vercel frontends** → atomic by design, but ALWAYS curl the live URL after and verify real content.
- **systemd single-process** (employee-api, hermes-*, obscura, moltbot, agent-dashboard…) → run new alongside +
  health-gate behind Caddy where possible; always keep the old binary/image for instant rollback.
- **Stateful** (mns-postgres, affine_postgres, redis, affine_redis) → NEVER casually restart. Back up + coordinate.

Pre-flight EVERY deploy: tag a rollback → build alongside (don't touch old) → health-gate real endpoint →
graceful switch → verify live public URL → only then retire old. Broken/slow build = ABORT, leave old serving.
Cold starts can be slow (Brooke ~200s) — slow ≠ crashed; if a start stalls, check `uptime` + top CPU and
kill runaway phantoms before assuming the build is broken.

Full SOP: `/root/.claude/rules/zero-downtime-deploys.md`. Mandate set 2026-06-03 after self-inflicted Brooke outages.
