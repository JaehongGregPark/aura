# LLM 키관리 프로세스

AURA 관리자 화면(`/aura-admin/`)에서 설정하는 LLM provider(ChatGPT/Gemini/Claude) API 키 관리 절차입니다. (LinguaUp `docs/llm_키관리_프로세스.md`와 동일한 포맷)

## 1. 현재 구조 — 다른 두 프로젝트와의 핵심 차이

**AURA는 아직 실제 AI API 호출 코드가 없습니다.** `config/views.py`에 `llmProviders` 설정(키/모델/활성화 여부)을 저장·조회하는 기능만 있고, `requirements.txt`에도 `anthropic`/`openai`/`google-genai` 같은 SDK가 설치되어 있지 않습니다. 즉 관리자 화면에서 키를 저장해도 "AI 상담" 기능이 그 키로 실제 응답을 만들어내지는 않는, UI/저장 계층만 먼저 만들어진 상태입니다.

- 저장소: DB도 `.env`도 아닌 **JSON 파일** — `config/aura_admin_settings.json` (`llmProviders.{chatgpt,gemini,claude}.apiKey`)
- `.gitignore`에 이미 포함되어 있어 git에는 올라가지 않음 (`config/aura_admin_settings.json`, `config/aura_members.json`, `db.sqlite3`, `.env` 모두 제외됨) — 이 부분은 처음부터 잘 되어 있었습니다.

## 2. 키 등록 절차 (현재 가능한 범위)

1. `/aura-admin/` 접속 → LLM 설정 섹션에서 provider별 API Key / 모델 / 활성화 여부 입력
2. 저장 → `POST /aura-admin/settings/save/` → `config/aura_admin_settings.json`에 기록
3. 화면에는 저장된 키가 `_mask_key()`로 마스킹되어 표시됨 (앞 4자리...뒤 4자리만 노출)
4. **"테스트" 버튼이나 실제 호출 검증 기능은 아직 없습니다.** LinguaUp/AIStockQuote처럼 저장한 키가 실제로 유효한지 서버가 확인해주지 않으므로, 지금은 키를 저장해도 눈으로 오탈자 없는지 확인하는 것 외에는 검증할 방법이 없습니다.

## 3. 오늘 발견 및 수정한 문제 — 관리자 화면 인증 누락 (심각)

점검 중 `config/views.py`의 `/aura-admin/` 관련 엔드포인트 전체(`content_admin`, `content_admin_save`, `admin_settings_api`, `admin_settings_save`, `members_api`, `members_save`, `member_message_send`)에 **로그인 검사가 전혀 없다는 것을 확인했습니다.** `content_admin.html` 안에 이미 "실제 배포 전 필수 전환: JSON 저장소를 DB와 Django Auth로 이전한다"는 메모가 남아있던, 알려진 미완성 상태였습니다.

이 상태로는 URL(`/aura-admin/`)만 알면 로그인 없이 누구나 다음이 가능했습니다:

- 회원 이름/이메일/전화번호/주소 등 PII 조회 (`/api/members/`)
- 사이트 콘텐츠 임의 변경 (`/aura-admin/save/`)
- LLM provider 키/모델 설정 임의 변경 (`/aura-admin/settings/save/`)
- 회원 앞으로 임의 이메일 발송 (`/aura-admin/members/send/`)

테스트서버가 이미 운영 중이라는 점을 고려해 즉시 조치했습니다: `config/views.py`에 `staff_required_json` 데코레이터를 추가해 위 엔드포인트 전체를 Django staff 계정 로그인이 있어야만 접근 가능하도록 막았습니다 (공개 사이트용 `/api/content/`, `/api/auth/*`는 그대로 둠 — 일반 방문자/회원 기능이라 인증이 필요 없는 게 맞습니다).

**배포 시 반드시 필요한 후속 조치:** 이 db.sqlite3는 현재 비어 있어 (0바이트, 마이그레이션 안 됨) staff 계정이 없습니다. 서버에서 아래를 실행하지 않으면 `/aura-admin/`에 아무도 못 들어갑니다.

```bash
python manage.py migrate
python manage.py createsuperuser
```

`deploy/DEPLOY.md`의 "2. DB / 정적 파일" 섹션에 이 안내를 추가해 두었습니다.

## 4. 향후 실제 AI 호출 기능을 추가한다면

LinguaUp/AIStockQuote와 동일한 패턴을 그대로 재사용할 수 있습니다.

1. `requirements.txt`에 `anthropic`, `openai`, `google-genai`(신규 SDK — `google-generativeai`는 구버전이니 피할 것) 추가
2. 배포 대상 Python 버전을 먼저 확정하고, 그에 맞는 SDK 버전을 고정 (LinguaUp 사례처럼 Python 3.9 환경이라면 `google-genai<=0.4.x`, `anthropic`+`httpx` 조합도 확인 필요 — `docs/llm_키관리_프로세스.md`(LinguaUp) 4장 참고)
3. `check_provider()` 같은 실제 API 호출 기반 검증 함수를 추가해 "테스트" 버튼이 실제로 동작하게 만들 것 (지금은 저장만 되고 검증이 안 됨)
4. 키를 JSON 파일 대신 DB로 옮길 계획이 있다면(`content_admin.html`의 기존 메모대로), LinguaUp의 `AppSetting` 모델 구조를 참고 가능

## 5. 로컬 ↔ 운영 참고

`.env`는 `manage.py`가 자동으로 읽지 않고 `deploy/start_gunicorn.sh`가 gunicorn 실행 직전에 직접 `source` 합니다 (`config/settings.py` 상단 주석 참고). LLM 키는 `.env`가 아니라 `aura_admin_settings.json`에 저장되므로, 로컬과 운영 서버는 **완전히 별도로 관리자 화면에서 입력해야** 합니다 (파일 자체가 git에 올라가지 않으므로 서버 간 자동 동기화 없음).
