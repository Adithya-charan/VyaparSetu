from fastapi import APIRouter
from pydantic import BaseModel
from ..services.livekit_service import get_livekit_token

router = APIRouter()

class TokenResponse(BaseModel):
    token: str | None = None
    url: str | None = None
    room: str | None = None
    identity: str | None = None
    error: str | None = None

@router.get("/token")
def token_endpoint(room: str = "vyapara-setu-room", identity: str = "user"):
    return get_livekit_token(room, identity)
