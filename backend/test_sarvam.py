import os
import requests
from dotenv import load_dotenv

load_dotenv()
sarvam_key = os.getenv("SARVAM_API_KEY")

endpoints = [
    "https://api.sarvam.ai/speech-to-text",
    "https://api.sarvam.ai/v1/speech-to-text",
    "https://api.sarvam.ai/recognize",
    "https://api.sarvam.ai/speech-to-text-translate"
]
for url in endpoints:
    try:
        r = requests.post(url, headers={"api-subscription-key": sarvam_key})
        print(f"SARVAM ({url}): {r.status_code}")
    except Exception as e:
        print(f"Error: {e}")
