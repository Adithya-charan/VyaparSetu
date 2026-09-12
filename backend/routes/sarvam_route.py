from fastapi import APIRouter
from pydantic import BaseModel
from ..services.sarvam_service import process_voice_sarvam

router = APIRouter()

class VoiceRequest(BaseModel):
    language: str
    text: str

@router.post("/process-voice")
def process_voice(request: VoiceRequest):
    return process_voice_sarvam(request.language, request.text)
