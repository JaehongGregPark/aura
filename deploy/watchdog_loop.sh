#!/bin/bash
# crontab이 없는 환경용 워치독. 무한 루프를 백그라운드에 하나 띄워두고
# 5분마다 gunicorn이 살아있는지 확인, 죽어있으면 재시작.
#
# 시작:
#   nohup bash deploy/watchdog_loop.sh >> logs/watchdog.log 2>&1 &
#   disown
#
# 확인:
#   ps aux | grep watchdog_loop   # 루프 프로세스 자체가 살아있는지
#   tail -f logs/watchdog.log
#
# 주의: 이 루프 프로세스 자체는 컨테이너가 재부팅되면 같이 죽습니다.
# 재부팅 후에도 자동으로 다시 뜨게 하려면 가비아 콘솔에 "시작 스크립트/시작 명령"
# 같은 설정이 있는지 확인해서 위 nohup 명령을 등록해야 합니다 (셸에서는 불가능한
# 부분이라 콘솔 확인이 필요합니다).

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

while true; do
    bash "$PROJECT_ROOT/deploy/ensure_running.sh"
    sleep 300
done
