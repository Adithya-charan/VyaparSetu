from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from ..services.groq_service import generate_chat_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str
    conversation_id: str
    context: Optional[Dict[str, Any]] = None

@router.post("/chat")
def chat_with_ai(request: ChatRequest):
    response_text = generate_chat_response(request.message, request.context)
    return {
        "message": response_text
    }

from fastapi import File, UploadFile, Form
from ..services.sarvam_service import transcribe_sarvam_audio, process_voice_sarvam

@router.post("/chat-voice")
async def chat_with_ai_voice(language: str = Form(...), file: UploadFile = File(...)):
    audio_bytes = await file.read()
    # 1. STT via Sarvam
    transcript = transcribe_sarvam_audio(audio_bytes)
    if transcript.startswith("Error"):
        return {"error": transcript}
    
    # 2. LLM via Groq
    response_text = generate_chat_response(transcript)
    if response_text.startswith("Error"):
        return {"error": response_text}
        
    # 3. TTS via Sarvam
    tts_result = process_voice_sarvam(language, response_text)
    if "error" in tts_result:
        return {"error": tts_result["error"]}
        
    if "audio_segments" in tts_result:
        return {
            "transcript": transcript,
            "message": response_text,
            "audio_segments": tts_result["audio_segments"]
        }
    else:
        return {
            "transcript": transcript,
            "message": response_text,
            "audio_base64": tts_result.get("audio_base64")
        }
