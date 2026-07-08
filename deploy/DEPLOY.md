# 가비아 베이직 컨테이너 호스팅 배포 체크리스트 (수정판)

**서버 진단 결과 (2026-07-07):** `whoami`=guser, uid=1000, `sudo` 없음, `/etc/nginx` 없음,
`$PORT=8080`이 환경변수로 이미 제공됨, OS는 CentOS 7. 즉 root가 필요한 systemd/nginx/
certbot 방식은 이 환경에서 쓸 수 없습니다. 컨테이너 바깥에서 가비아 플랫폼이 도메인
라우팅(그리고 아마 SSL 종료)을 대신 처리하고, 우리는 `0.0.0.0:$PORT`에 앱만 떠 있게
하면 되는 구조로 보입니다.

## 0. 실제 값으로 채워야 하는 것

- [ ] `.env`의 `<YOUR_DOMAIN>` → 실제 도메인
- [ ] `.env`의 `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` / `DEFAULT_FROM_EMAIL` → Hiworks 실제 계정 (서버에서 직접 입력)
- [ ] `deploy/start_gunicorn.sh`의 `VENV_ACTIVATE` 경로 → 서버에서 `echo $VIRTUAL_ENV` 로 확인한 실제 venv 경로

## 1. 코드/설정 동기화

로컬에서 커밋한 변경사항을 push 한 뒤, 서버에서:

```bash
git pull
pip install --user -r requirements.txt
pip show django   # 4.2.x 인지 확인
```

## 2. DB / 정적 파일

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

`/aura-admin/` 및 관련 저장 API는 Django staff 계정 로그인이 있어야 접근 가능하도록
막아뒀습니다 (`config/views.py`의 `staff_required_json`/`staff_member_required` — 이전엔
URL만 알면 로그인 없이 누구나 회원 정보 조회, 콘텐츠/LLM 키 덮어쓰기, 회원 앞 이메일
발송까지 가능했던 취약점이 있었습니다). **최초 배포 시 반드시 staff 계정을 만들어야
관리자 화면에 들어갈 수 있습니다:**

```bash
python manage.py createsuperuser
```

이후 `/admin/`에서 로그인하면 같은 브라우저 세션으로 `/aura-admin/`도 접근됩니다.

## 3. gunicorn 실행

```bash
chmod +x deploy/start_gunicorn.sh deploy/ensure_running.sh
bash deploy/start_gunicorn.sh
curl -I http://127.0.0.1:8080/    # 200 확인
```

## 4. 재시작 감시 등록 (systemd도 crontab도 없음 → 백그라운드 루프)

이 컨테이너는 `crontab`도 막혀 있어서, 대신 무한 루프 워치독을 백그라운드로 띄워둡니다.

```bash
chmod +x deploy/watchdog_loop.sh
nohup bash deploy/watchdog_loop.sh >> logs/watchdog.log 2>&1 &
disown
ps aux | grep watchdog_loop   # 루프가 떠 있는지 확인
```

테스트: `kill $(cat gunicorn.pid)` 후 5분 안에 자동으로 재기동되는지 `tail -f logs/watchdog.log`로 확인.

**한계:** 이 루프는 컨테이너가 재부팅되면 같이 죽습니다. 재부팅 후 자동 기동은 셸 밖의
영역(가비아 콘솔에 "시작 스크립트" 같은 설정이 있는지)이라 콘솔에서 확인이 필요합니다.

## 5. 도메인 연결 / SSL

**셸에서 할 수 있는 작업이 아닙니다.** My가비아 > 서비스 관리 > 컨테이너 호스팅 관리
콘솔에서 도메인 연결과 SSL 설정 메뉴를 찾아야 합니다. 콘솔 화면 캡처해서 보여주시면
정확히 어디서 설정하는지 같이 봐드릴게요.

## 6. 최종 확인

- [ ] `https://<도메인>` 접속 확인
- [ ] `/api/content/` 응답 확인
- [ ] 프로세스를 강제로 죽여보고(`kill $(cat gunicorn.pid)`) 5분 뒤 crontab이 자동으로
      재기동하는지 확인

## 더 이상 안 쓰는 파일

`deploy/aura-gunicorn.service`, `deploy/nginx.conf` — root 권한이 없는 이 환경에서는
적용 불가. 나중에 VPS 등 root 권한 있는 서버로 옮기면 그때 다시 참고.
