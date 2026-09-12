import os
import requests
from dotenv import load_dotenv

load_dotenv()

sarvam_key = os.getenv("SARVAM_API_KEY")
groq_key = os.getenv("GROQ_API_KEY")
bey_key = os.getenv("BEYOND_PRESENCE_API_KEY")

print("SARVAM KEY:", bool(sarvam_key))
print("GROQ KEY:", bool(groq_key))
print("BEYOND KEY:", bool(bey_key))

# Test Groq (we know this works via the groq sdk, but let's just confirm)
try:
    import groq
    client = groq.Groq(api_key=groq_key)
    res = client.chat.completions.create(
        messages=[{"role": "user", "content": "hello"}],
        model="llama3-8b-8192"
    )
    print("GROQ: SUCCESS")
except Exception as e:
    print("GROQ ERROR:", str(e))

# Test Sarvam TTS
try:
    headers = {"api-subscription-key": sarvam_key, "Content-Type": "application/json"}
    payload = {
        "inputs": ["Hello world"],
        "target_language_code": "hi-IN",
        "speaker": "meera",
        "pitch": 0,
        "pace": 1.0,
        "loudness": 1.5,
        "speech_sample_rate": 8000,
        "enable_preprocessing": True,
        "model": "bulbul:v1"
    }
    r = requests.post("https://api.sarvam.ai/text-to-speech", json=payload, headers=headers)
    print("SARVAM TTS:", r.status_code, r.text[:200])
except Exception as e:
    print("SARVAM ERROR:", str(e))

# Test Beyond Presence Connection URL
urls_to_try = [
    "https://api.beyondpresence.com/v1/sessions",
    "https://api.bpres.ai/session",
    "https://api.beyondpresence.ai/v1/sessions"
]
for url in urls_to_try:
    try:
        r = requests.post(url, headers={"Authorization": f"Bearer {bey_key}"}, json={})
        print(f"BEYOND ({url}):", r.status_code)
    except:
        pass
