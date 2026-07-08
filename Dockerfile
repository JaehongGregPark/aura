# 통합 테스트 서버(Docker Compose + Caddy)용 Dockerfile.
# 기존 deploy/start_gunicorn.sh + watchdog_loop.sh(가비아 베이직 컨테이너, root 없음)
# 방식과는 별개 경로입니다 - root 있는 서버로 옮길 때는 이 Dockerfile을 쓰고,
# 기존 gabia 방식을 그대로 쓴다면 deploy/DEPLOY.md를 참고하세요.
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt gunicorn

COPY . /app

RUN mkdir -p /app/staticfiles

EXPOSE 8000

CMD sh -c "python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput && \
    gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 2"
