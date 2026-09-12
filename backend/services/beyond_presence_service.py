import os
import requests
from typing import Dict, Any


def create_ai_call(language: str, conversation_id: str) -> Dict[str, Any]:
    """Create a Beyond Presence Calls API session.

    Returns a dict containing the LiveKit connection info and the WebSocket URL
    for real‑time audio streaming.
    """
    api_key = os.getenv("BEYOND_PRESENCE_API_KEY")
    avatar_id = os.getenv("BEYOND_PRESENCE_AVATAR_ID")
    if not api_key:
        return {"error": "Beyond Presence API key missing"}
    if not avatar_id:
        return {"error": "Beyond Presence Avatar ID missing"}

    # ------------------------------------------------------------
    # 1️⃣ Obtain a LiveKit token for the avatar (publisher rights)
    # ------------------------------------------------------------
    try:
        lk_resp = requests.get(
            "http://localhost:8001/api/livekit/token",
            params={"room": "vyapara-setu-room", "identity": f"avatar-{conversation_id}"},
            timeout=5,
        )
        if not lk_resp.ok:
            return {"error": f"LiveKit token request failed {lk_resp.status_code}"}
        lk = lk_resp.json()
    except Exception as e:
        return {"error": f"LiveKit token request exception: {e}"}

    # ------------------------------------------------------------
    # 2️⃣ Call the official Beyond Presence Calls API
    # ------------------------------------------------------------
    # Official Calls API expects an agent_id (the avatar/agent managing the call) and user metadata.
    # We use the avatar ID as the agent identifier.
    headers = {"x-api-key": api_key, "Content-Type": "application/json"}
    payload = {
        "agent_id": avatar_id,
        "user_name": "Vyapara Setu User",
        "user_email": "user@vyapara.com",
        "tags": {},
    }
    try:
        resp = requests.post(
            "https://api.bey.dev/v1/calls",
            json=payload,
            headers=headers,
            timeout=10,
        )
        if not resp.ok:
            try:
                error_data = resp.json()
            except Exception:
                error_data = resp.text
            return {"error": error_data}
        data = resp.json()
    except Exception as e:
        return {"error": f"Beyond Presence request failed: {e}"}

    # Expected keys from the official Calls API response
    # The response includes: id, livekit_url, livekit_token
    required = ["id", "livekit_url", "livekit_token"]
    if not all(k in data for k in required):
        return {"error": f"Beyond Presence response missing keys: {data}"}

    return {
        "call_id": data["id"],
        "url": data["livekit_url"],
        "token": data["livekit_token"],
        # ws_url is not part of the Calls API; set to None for compatibility
        "ws_url": None,
        # The room name is derived from the LiveKit token response we obtained earlier
        "room": lk.get("room"),
        "avatar_id": avatar_id,
    }
