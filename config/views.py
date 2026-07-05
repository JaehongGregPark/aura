import json
from json import JSONDecodeError

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST


CONTENT_PATH = settings.BASE_DIR / "static" / "aura" / "content.json"
ADMIN_SETTINGS_PATH = settings.BASE_DIR / "config" / "aura_admin_settings.json"


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
    return render(
        request,
        "content_admin.html",
        {
            "content_json": json.dumps(_read_content(), ensure_ascii=False, indent=2),
            "settings_json": json.dumps(admin_settings, ensure_ascii=False, indent=2),
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
