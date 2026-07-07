#!/bin/bash
# root/systemd 없는 컨테이너에서 gunicorn을 데몬으로 띄우는 스크립트.
# 사용법: 프로젝트 루트에서 실행 → bash deploy/start_gunicorn.sh
#
# 실행 전에 아래 VENV_ACTIVATE 경로가 실제 가상환경과 맞는지 꼭 확인하세요.
# (프롬프트가 "(aura) [guser@python aura]$" 인 걸 보면 이미 venv가 활성화된
#  상태로 작업 중이신 것 같은데, crontab은 이 활성화 상태를 이어받지 못하므로
#  스크립트 안에서 다시 명시적으로 activate 해줘야 합니다.)

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# 실제 venv 활성화 스크립트 경로로 수정하세요 (예: "$PROJECT_ROOT/.venv/bin/activate"
# 또는 "$PROJECT_ROOT/aura/bin/activate" 등 - `which gunicorn` / `echo $VIRTUAL_ENV`
# 로 지금 활성화된 venv 경로를 확인해서 넣어주세요).
VENV_ACTIVATE="$PROJECT_ROOT/aura/bin/activate"
if [ -f "$VENV_ACTIVATE" ]; then
    source "$VENV_ACTIVATE"
else
    echo "경고: $VENV_ACTIVATE 를 못 찾았습니다. 이 스크립트의 VENV_ACTIVATE 값을 실제 경로로 수정하세요." >&2
fi

# .env 로드 (manage.py는 자동으로 안 읽으므로 여기서 export)
# .env 값은 반드시 작은따옴표로 감싸져 있어야 함 (특수문자가 셸에 의해 해석되는 걸 방지).
if [ -f "$PROJECT_ROOT/.env" ]; then
    set -a
    source "$PROJECT_ROOT/.env"
    set +a
fi

mkdir -p "$PROJECT_ROOT/logs"

BIND_PORT="${PORT:-8080}"

# 이미 떠 있으면 중복 실행 방지
if [ -f "$PROJECT_ROOT/gunicorn.pid" ] && kill -0 "$(cat "$PROJECT_ROOT/gunicorn.pid")" 2>/dev/null; then
    echo "이미 실행 중입니다 (pid $(cat "$PROJECT_ROOT/gunicorn.pid"))."
    exit 0
fi

gunicorn config.wsgi:application \
    --bind "0.0.0.0:${BIND_PORT}" \
    --workers 3 \
    --daemon \
    --pid "$PROJECT_ROOT/gunicorn.pid" \
    --access-logfile "$PROJECT_ROOT/logs/access.log" \
    --error-logfile "$PROJECT_ROOT/logs/error.log"

echo "gunicorn 시작됨 (port ${BIND_PORT})"
