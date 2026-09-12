from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.beyond_presence_service import create_ai_call

router = APIRouter()

class SessionRequest(BaseModel):
    language: str

@router.post("/session")
def start_session(request: SessionRequest):
    result = create_ai_call(request.language, request.conversation_id)
    if "error" in result:
        raise HTTPException(status_code=502, detail=result["error"])
    return result
