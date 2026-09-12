import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

print(
    "BEYOND_PRESENCE_API_KEY loaded:",
    bool(os.getenv("BEYOND_PRESENCE_API_KEY"))
)

print(
    "BEYOND_PRESENCE_AVATAR_ID loaded:",
    bool(os.getenv("BEYOND_PRESENCE_AVATAR_ID"))
)