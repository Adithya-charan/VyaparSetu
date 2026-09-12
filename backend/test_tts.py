import os
import requests
from dotenv import load_dotenv

load_dotenv()
sarvam_key = os.getenv("SARVAM_API_KEY")

headers = {"api-subscription-key": sarvam_key, "Content-Type": "application/json"}
payload = {
    "inputs": ["Hello world, this is a test from the Vyapara Setu mentor."],
    "target_language_code": "en-IN",
    "speaker": "anushka",
    "pitch": 0,
    "pace": 1.0,
    "loudness": 1.5,
    "speech_sample_rate": 8000,
    "enable_preprocessing": True,
    "model": "bulbul:v3"
}
r = requests.post("https://api.sarvam.ai/text-to-speech", json=payload, headers=headers)
print("SARVAM TTS:", r.status_code)
if r.status_code == 200:
    print("KEYS EXIST:", "audios" in r.json())
else:
    print("ERROR:", r.text)
