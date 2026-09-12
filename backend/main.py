from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.livekit_route import router as livekit_router
from .routes.sarvam_route import router as sarvam_router
from .routes.beyond_presence_route import router as beyond_presence_router
from .routes.groq_route import router as groq_router

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(livekit_router, prefix="/api/livekit", tags=["livekit"])
app.include_router(sarvam_router, prefix="/api/sarvam", tags=["sarvam"])
app.include_router(beyond_presence_router, prefix="/api/beyond-presence", tags=["beyond-presence"])
app.include_router(groq_router, prefix="/api/ai", tags=["ai"])

@app.get("/")
def home():
    return {
        "message": "Vyapara Setu Backend Running"
    }