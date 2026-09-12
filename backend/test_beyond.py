import os
import requests
from dotenv import load_dotenv

load_dotenv()
bey_key = os.getenv("BEYOND_PRESENCE_API_KEY")

urls_to_try = [
    "https://api.beyondpresence.com/v1/sessions",
    "https://api.bpres.ai/session",
    "https://api.beyondpresence.ai/v1/sessions",
    "https://api.beyondpresence.ai/v1/agents/session"
]
for url in urls_to_try:
    try:
        r = requests.post(url, headers={"Authorization": f"Bearer {bey_key}"}, json={})
        print(f"BEYOND ({url}): {r.status_code} {r.text[:100]}")
    except Exception as e:
        print(f"BEYOND ({url}) EXCEPTION: {e}")
