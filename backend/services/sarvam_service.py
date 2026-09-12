import os
import requests
import base64
from typing import Dict, Any

def process_voice_sarvam(language: str, text: str) -> Dict[str, Any]:
    api_key = os.getenv("SARVAM_API_KEY")
    if not api_key:
        return {"error": "Sarvam API credentials missing"}

    try:
        # Convert language selection to Sarvam format
        lang_code = "en-IN"
        if language == "hi": lang_code = "hi-IN"
        if language == "te": lang_code = "te-IN"
        if language == "ta": lang_code = "ta-IN"

        # ---------- Chunking logic ----------
        max_len = 500
        chunks = []
        remaining = text.strip()
        # Helper split function
        def split_into_chunks(txt: str):
            # Try paragraph split
            paras = txt.split("\n\n")
            result = []
            for p in paras:
                p = p.strip()
                if not p:
                    continue
                if len(p) <= max_len:
                    result.append(p)
                else:
                    # Split by sentence
                    sentences = p.split('. ')
                    cur = ""
                    for s in sentences:
                        s = s.strip()
                        if not s:
                            continue
                        candidate = (cur + (". " if cur else "") + s) if cur else s
                        if len(candidate) <= max_len:
                            cur = candidate
                        else:
                            if cur:
                                result.append(cur)
                            # If single sentence still too long, split by whitespace
                            if len(s) > max_len:
                                words = s.split()
                                sub = ""
                                for w in words:
                                    if len(sub) + len(w) + 1 <= max_len:
                                        sub = (sub + " " + w).strip()
                                    else:
                                        if sub:
                                            result.append(sub)
                                        sub = w
                                if sub:
                                    result.append(sub)
                            else:
                                result.append(s)
                            cur = ""
                    if cur:
                        result.append(cur)
            return result
        chunks = split_into_chunks(remaining)
        # Ensure all chunks <= max_len (fallback safety)
        chunks = [c if len(c) <= max_len else c[:max_len] for c in chunks]
        # Log diagnostics
        print(f"[TTS] total response characters: {len(text)}")
        print(f"[TTS] chunks: {len(chunks)}")
        for i, ch in enumerate(chunks, 1):
            print(f"[TTS] chunk {i} length: {len(ch)}")
        # ---------- TTS calls ----------
        audio_segments = []
        for i, chunk in enumerate(chunks, 1):
            payload = {
                "inputs": [chunk],
                "target_language_code": lang_code,
                "speaker": "ritu",
                "pitch": 0,
                "pace": 1.0,
                "loudness": 1.5,
                "speech_sample_rate": 8000,
                "enable_preprocessing": True,
                "model": "bulbul:v3"
            }
            headers = {
                "api-subscription-key": api_key,
                "Content-Type": "application/json"
            }
            response = requests.post("https://api.sarvam.ai/text-to-speech", json=payload, headers=headers)
            if not response.ok:
                print(f"[TTS] TTS chunk {i}: failed ({response.status_code})")
                return {"error": f"Sarvam TTS failed on chunk {i}: {response.text}"}
            data = response.json()
            if "audios" in data and len(data["audios"]) > 0:
                audio_segments.append(data["audios"][0])
                print(f"[TTS] TTS chunk {i}: success")
            else:
                print(f"[TTS] TTS chunk {i}: no audio returned")
                return {"error": f"Sarvam TTS returned no audio on chunk {i}"}
        # Return combined result
        if len(audio_segments) == 1:
            return {"audio_base64": audio_segments[0]}
        else:
            return {"audio_segments": audio_segments}
    except Exception as e:
        return {"error": str(e)}

def transcribe_sarvam_audio(audio_bytes: bytes) -> str:
    api_key = os.getenv("SARVAM_API_KEY")
    if not api_key:
        return "Error: Sarvam API credentials missing"
        
    try:
        headers = {"api-subscription-key": api_key}
        files = {"file": ("audio.wav", audio_bytes, "audio/wav")}
        data = {"prompt": ""}
        response = requests.post("https://api.sarvam.ai/speech-to-text-translate", files=files, data=data, headers=headers)
        
        if not response.ok:
            return f"Error: Sarvam STT failed: {response.text}"
            
        json_resp = response.json()
        return json_resp.get("transcript", "Error: No transcript found")
    except Exception as e:
        return f"Error: {e}"
