import os
from livekit import api

def get_livekit_token(room: str, identity: str) -> dict:
    livekit_api_key = os.getenv("LIVEKIT_API_KEY")
    livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")
    livekit_url = os.getenv("LIVEKIT_URL")

    if not livekit_api_key or not livekit_api_secret:
        return {"error": "LiveKit credentials are missing"}

    token = (
        api.AccessToken(
            livekit_api_key,
            livekit_api_secret,
        )
        .with_identity(identity)
        .with_grants(
            api.VideoGrants(
                room_join=True,
                room=room,
                can_publish=True,
                can_subscribe=True,
                can_publish_data=True,
            )
        )
    )

    return {
        "token": token.to_jwt(),
        "url": livekit_url,
        "room": room,
        "identity": identity
    }
