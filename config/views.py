import json
import uuid
from json import JSONDecodeError

from django.conf import settings
from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST


CONTENT_PATH = settings.BASE_DIR / "static" / "aura" / "content.json"
ADMIN_SETTINGS_PATH = settings.BASE_DIR / "config" / "aura_admin_settings.json"
MEMBERS_PATH = settings.BASE_DIR / "config" / "aura_members.json"


def _read_content():
    with CONTENT_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def _write_content(content):
    CONTENT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CONTENT_PATH.open("w", encoding="utf-8") as file:
        json.dump(content, file, ensure_ascii=False, indent=2)
        file.write("\n")


def _default_admin_settings():
    return {
        "llmProviders": {
            "chatgpt": {
                "label": "CHATGPT",
                "enabled": True,
                "apiKey": "",
                "version": "gpt-4.1-mini",
                "memo": "AI 상담 기본 모델",
            },
            "gemini": {
                "label": "GEMINI",
                "enabled": False,
                "apiKey": "",
                "version": "gemini-1.5-pro",
                "memo": "",
            },
            "claude": {
                "label": "CLAUDE",
                "enabled": False,
                "apiKey": "",
                "version": "claude-3-5-sonnet",
                "memo": "",
            },
        },
        "questionTypes": {
            "ko": [
                {
                    "id": "makeup_consult",
                    "label": "메이크업 상담",
                    "promptType": "consultation",
                    "enabled": True,
                }
            ],
            "en": [
                {
                    "id": "makeup_consult",
                    "label": "Makeup consultation",
                    "promptType": "consultation",
                    "enabled": True,
                }
            ],
        },
        "photos": {
            "heroImage": "static/aura/assets/aura-preview.webp",
            "reportImage": "static/aura/assets/aura-reference.webp",
            "gallery": [],
        },
        "styles": {
            "defaultArea": "makeup",
            "autoCycle": True,
            "themeMemo": "AURA 기본 스타일",
        },
    }


def _migrate_admin_settings(settings_data):
    default = _default_admin_settings()

    providers = settings_data.get("llmProviders") or {}
    for provider_id, default_provider in default["llmProviders"].items():
        providers.setdefault(provider_id, default_provider)

    legacy_keys = settings_data.get("apiKeys", [])
    if legacy_keys and not providers.get("chatgpt", {}).get("apiKey"):
        first_key = legacy_keys[0]
        providers["chatgpt"]["apiKey"] = first_key.get("key", "")
        providers["chatgpt"]["memo"] = first_key.get(
            "memo", providers["chatgpt"].get("memo", "")
        )

    settings_data["llmProviders"] = providers
    settings_data.setdefault("questionTypes", default["questionTypes"])
    settings_data.setdefault("photos", default["photos"])
    settings_data.setdefault("styles", default["styles"])
    settings_data.pop("apiKeys", None)
    return settings_data


def _read_admin_settings():
    if not ADMIN_SETTINGS_PATH.exists():
        _write_admin_settings(_default_admin_settings())
    with ADMIN_SETTINGS_PATH.open("r", encoding="utf-8") as file:
        settings_data = json.load(file)
    return _migrate_admin_settings(settings_data)


def _write_admin_settings(settings_data):
    ADMIN_SETTINGS_PATH.parent.mkdir(parents=True, exist_ok=True)
    with ADMIN_SETTINGS_PATH.open("w", encoding="utf-8") as file:
        json.dump(settings_data, file, ensure_ascii=False, indent=2)
        file.write("\n")


def _default_members():
    return {
        "members": [
            {
                "id": "guest-001",
                "loginId": "guest",
                "nickname": "AURA Guest",
                "email": "guest@example.com",
                "address": {
                    "line1": "100 Main St",
                    "line2": "",
                    "city": "Los Angeles",
                    "state": "CA",
                    "zip": "90001",
                    "country": "USA",
                },
                "phone": "+1 213 555 0100",
                "anniversaries": [
                    {
                        "type": "생일",
                        "date": "1990-01-01",
                        "memo": "샘플 기념일",
                    }
                ],
                "memo": "샘플 회원",
            }
        ],
        "messageLogs": [],
    }


def _read_members():
    if not MEMBERS_PATH.exists():
        _write_members(_default_members())
    with MEMBERS_PATH.open("r", encoding="utf-8") as file:
        data = json.load(file)
    data.setdefault("members", [])
    data.setdefault("messageLogs", [])
    return data


def _public_member(member):
    public = dict(member)
    public.pop("passwordHash", None)
    return public


def _find_member_by_login(data, login_id_or_email):
    target = (login_id_or_email or "").strip().lower()
    if not target:
        return None
    for member in data.get("members", []):
        login_id = (member.get("loginId") or member.get("id") or "").lower()
        email = (member.get("email") or "").lower()
        if target in {login_id, email}:
            return member
    return None


def _session_member(request):
    member_id = request.session.get("aura_member_id")
    if not member_id:
        return None
    data = _read_members()
    return next((item for item in data["members"] if item.get("id") == member_id), None)


def _write_members(data):
    MEMBERS_PATH.parent.mkdir(parents=True, exist_ok=True)
    with MEMBERS_PATH.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)
        file.write("\n")


def _mask_key(value):
    if not value:
        return ""
    if len(value) <= 8:
        return "*" * len(value)
    return f"{value[:4]}{'*' * max(len(value) - 8, 4)}{value[-4:]}"


def _public_admin_settings(settings_data):
    public = json.loads(json.dumps(settings_data))
    for provider in public.get("llmProviders", {}).values():
        provider["maskedKey"] = _mask_key(provider.get("apiKey", ""))
        provider["apiKey"] = ""
    return public


@require_GET
def content_api(request):
    return JsonResponse(_read_content(), json_dumps_params={"ensure_ascii": False})


@require_GET
def content_admin(request):
    admin_settings = _public_admin_settings(_read_admin_settings())
    members = _read_members()
    return render(
        request,
        "content_admin.html",
        {
            "content_json": json.dumps(_read_content(), ensure_ascii=False, indent=2),
            "settings_json": json.dumps(admin_settings, ensure_ascii=False, indent=2),
            "members_json": json.dumps(members, ensure_ascii=False, indent=2),
        },
    )


@require_POST
def content_admin_save(request):
    try:
        content = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, JSONDecodeError) as error:
        return JsonResponse({"ok": False, "error": str(error)}, status=400)

    if not isinstance(content, dict) or "ko" not in content or "en" not in content:
        return JsonResponse(
            {"ok": False, "error": "Content must include ko and en roots."},
            status=400,
        )

    _write_content(content)
    return JsonResponse({"ok": True})


@require_GET
def admin_settings_api(request):
    return JsonResponse(
        _public_admin_settings(_read_admin_settings()),
        json_dumps_params={"ensure_ascii": False},
    )


@require_POST
def admin_settings_save(request):
    try:
        incoming = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, JSONDecodeError) as error:
        return JsonResponse({"ok": False, "error": str(error)}, status=400)

    if not isinstance(incoming, dict):
        return JsonResponse(
            {"ok": False, "error": "Settings must be an object."},
            status=400,
        )

    current = _read_admin_settings()
    current_providers = current.get("llmProviders", {})
    incoming_providers = incoming.get("llmProviders", {})
    next_providers = {}

    for provider_id, provider in incoming_providers.items():
        saved_key = current_providers.get(provider_id, {}).get("apiKey", "")
        next_providers[provider_id] = {
            "label": provider.get("label", provider_id.upper()),
            "enabled": bool(provider.get("enabled")),
            "apiKey": provider.get("apiKey") or saved_key,
            "version": provider.get("version", ""),
            "memo": provider.get("memo", ""),
        }

    settings_data = {
        "llmProviders": next_providers or _default_admin_settings()["llmProviders"],
        "questionTypes": incoming.get(
            "questionTypes", _default_admin_settings()["questionTypes"]
        ),
        "photos": incoming.get("photos", _default_admin_settings()["photos"]),
        "styles": incoming.get("styles", _default_admin_settings()["styles"]),
    }
    _write_admin_settings(settings_data)
    return JsonResponse({"ok": True})


@require_GET
def members_api(request):
    data = _read_members()
    public = {
        "members": [_public_member(member) for member in data.get("members", [])],
        "messageLogs": data.get("messageLogs", []),
    }
    return JsonResponse(public, json_dumps_params={"ensure_ascii": False})


@require_GET
def auth_me(request):
    member = _session_member(request)
    return JsonResponse(
        {
            "authenticated": bool(member),
            "member": _public_member(member) if member else None,
        },
        json_dumps_params={"ensure_ascii": False},
    )


@csrf_exempt
@require_POST
def auth_signup(request):
    try:
        incoming = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, JSONDecodeError) as error:
        return JsonResponse({"ok": False, "error": str(error)}, status=400)

    login_id = incoming.get("loginId", "").strip()
    nickname = incoming.get("nickname", "").strip()
    email = incoming.get("email", "").strip()
    password = incoming.get("password", "")

    if not login_id or not nickname or not email or len(password) < 6:
        return JsonResponse(
            {
                "ok": False,
                "error": "아이디, 닉네임, 이메일, 6자 이상 비밀번호가 필요합니다.",
            },
            status=400,
        )

    data = _read_members()
    if _find_member_by_login(data, login_id) or _find_member_by_login(data, email):
        return JsonResponse(
            {"ok": False, "error": "이미 등록된 아이디 또는 이메일입니다."},
            status=409,
        )

    member = {
        "id": f"member-{uuid.uuid4().hex[:12]}",
        "loginId": login_id,
        "nickname": nickname,
        "email": email,
        "passwordHash": make_password(password),
        "phone": incoming.get("phone", "").strip(),
        "address": incoming.get("address")
        or {
            "line1": "",
            "line2": "",
            "city": "",
            "state": "",
            "zip": "",
            "country": "USA",
        },
        "anniversaries": incoming.get("anniversaries") or [],
        "role": "member",
        "createdAt": timezone.now().isoformat(),
        "memo": "클라이언트 회원가입",
    }
    data["members"].append(member)
    _write_members(data)
    request.session["aura_member_id"] = member["id"]
    return JsonResponse(
        {"ok": True, "member": _public_member(member)},
        json_dumps_params={"ensure_ascii": False},
    )


@csrf_exempt
@require_POST
def auth_login(request):
    try:
        incoming = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, JSONDecodeError) as error:
        return JsonResponse({"ok": False, "error": str(error)}, status=400)

    login_id = incoming.get("loginId", "").strip()
    password = incoming.get("password", "")
    data = _read_members()
    member = _find_member_by_login(data, login_id)

    if not member or not member.get("passwordHash"):
        return JsonResponse(
            {"ok": False, "error": "로그인 정보를 확인해 주세요."},
            status=401,
        )

    if not check_password(password, member["passwordHash"]):
        return JsonResponse(
            {"ok": False, "error": "로그인 정보를 확인해 주세요."},
            status=401,
        )

    request.session["aura_member_id"] = member["id"]
    return JsonResponse(
        {"ok": True, "member": _public_member(member)},
        json_dumps_params={"ensure_ascii": False},
    )


@csrf_exempt
@require_POST
def auth_logout(request):
    request.session.pop("aura_member_id", None)
    return JsonResponse({"ok": True})


@require_POST
def members_save(request):
    try:
        incoming = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, JSONDecodeError) as error:
        return JsonResponse({"ok": False, "error": str(error)}, status=400)

    if not isinstance(incoming, dict) or not isinstance(incoming.get("members"), list):
        return JsonResponse(
            {"ok": False, "error": "Members payload must include members list."},
            status=400,
        )

    current = _read_members()
    next_data = {
        "members": incoming.get("members", []),
        "messageLogs": current.get("messageLogs", []),
    }
    _write_members(next_data)
    return JsonResponse({"ok": True})


@require_POST
def member_message_send(request):
    try:
        incoming = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, JSONDecodeError) as error:
        return JsonResponse({"ok": False, "error": str(error)}, status=400)

    member_id = incoming.get("memberId")
    channel = incoming.get("channel")
    subject = incoming.get("subject", "")
    message = incoming.get("message", "")

    if channel not in {"email", "chat"} or not member_id or not message:
        return JsonResponse(
            {"ok": False, "error": "memberId, channel, and message are required."},
            status=400,
        )

    data = _read_members()
    member = next((item for item in data["members"] if item.get("id") == member_id), None)
    if not member:
        return JsonResponse({"ok": False, "error": "Member not found."}, status=404)

    data["messageLogs"].append(
        {
            "memberId": member_id,
            "channel": channel,
            "subject": subject,
            "message": message,
            "status": "logged",
            "note": "외부 발송 API 미연동 상태이므로 관리자 발송 기록만 저장했습니다.",
        }
    )
    _write_members(data)
    return JsonResponse({"ok": True, "status": "logged"})
