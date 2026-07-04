# AURA

AI 토탈 뷰티 큐레이션 온보딩 퀴즈 프로토타입. Django는 정적 페이지 하나(`index.html`)를 서빙하는 용도로만 쓰이고, 실제 퀴즈/리포트 로직은 전부 프론트엔드(`static/aura/app.js`, `static/aura/data.js`)에서 동작합니다.

세 가지 포트폴리오 콘셉트(뷰티 큐레이션 / 패션 에디토리얼 / 리빙 웰니스)를 한 화면에서 전환하며 미리볼 수 있는 데모이며, 한국어/영어 전환을 지원합니다.

## 요구 사항

- Python 3.13
- Django 6.0.6 (`requirements.txt` 참고)

## 실행 방법

```bash
python -m venv .venv
.venv\Scripts\activate.bat     # Windows
pip install -r requirements.txt
python manage.py runserver 127.0.0.1:4174
```

또는 `.venv`가 이미 준비되어 있다면 `ca.bat` / `start_django.bat`을 실행합니다. 브라우저에서 `http://127.0.0.1:4174`로 접속합니다.

## 환경 변수

프로덕션에 가깝게 띄우거나 ngrok 등으로 외부에 노출할 경우 아래 값을 환경 변수로 설정하세요. `.env.example`을 참고해 `.env`를 만들고, 실행 전 셸에 값을 export 하면 됩니다(현재 `.env` 자동 로드는 구현되어 있지 않습니다).

| 변수 | 설명 | 기본값 |
| --- | --- | --- |
| `DJANGO_SECRET_KEY` | Django 시크릿 키 | 로컬 개발용 더미 값 |
| `DJANGO_DEBUG` | 디버그 모드 (`True`/`False`) | `True` |
| `DJANGO_ALLOWED_HOSTS` | 허용 호스트(콤마 구분) | `127.0.0.1,localhost,.ngrok-free.dev` |

## 프로젝트 구조

```
config/            Django 설정 (settings, urls, wsgi/asgi)
index.html         Django 템플릿(퀴즈/리포트 UI)
static/aura/
  data.js           콘셉트별 문구·질문·팔레트 등 콘텐츠 데이터
  app.js            렌더링/상호작용 로직
  styles.css        스타일
  assets/           이미지
docs/               기획 문서(PDF)
```

## 새 포트폴리오 콘셉트 추가하기

1. `static/aura/data.js`의 `portfolioData.ko.concepts`에 새 콘셉트 객체를 추가합니다(질문, 팔레트, 무드 태그, 상담 문구 등).
2. `portfolioData.en.concepts`에 동일한 key로 영문 버전을 추가합니다.
3. `index.html`의 `concept-options`에 버튼을 하나 추가하고 `data-concept` 값을 맞춥니다.

로직(`app.js`)은 수정할 필요가 없습니다 — 모든 화면은 `data.js`의 데이터를 기준으로 렌더링됩니다.

## 테스트

```bash
python manage.py test
```
