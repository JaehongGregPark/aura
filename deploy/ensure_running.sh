#!/bin/bash
# gunicorn이 죽어있으면 재시작. crontab에 등록해서 주기적으로 감시하는 용도
# (systemd Restart=on-failure 를 대신함).
#
# crontab -e 에 추가 예시 (5분마다 감시 + 재부팅 시 기동):
#   */5 * * * * /bin/bash /path/to/aura/deploy/ensure_running.sh >> /path/to/aura/logs/watchdog.log 2>&1
#   @reboot     /bin/bash /path/to/aura/deploy/ensure_running.sh >> /path/to/aura/logs/watchdog.log 2>&1

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PIDFILE="$PROJECT_ROOT/gunicorn.pid"

if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
    exit 0  # 정상 동작 중
fi

echo "[$(date)] gunicorn 다운 감지 - 재시작 시도"
bash "$PROJECT_ROOT/deploy/start_gunicorn.sh"
