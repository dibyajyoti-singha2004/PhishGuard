from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os


# --- PATH ROUTING FIX ---
# 1. Get the absolute path of the backend directory
current_dir = os.path.dirname(os.path.abspath(__file__))
# 2. Get the parent directory (PhishGuard-main)
parent_dir = os.path.abspath(os.path.join(current_dir, ".."))
# 3. Get the ml_engine directory
ml_engine_dir = os.path.join(parent_dir, "ml_engine")

# Force Python to recognize BOTH the root and the ml_engine folder
sys.path.insert(0, ml_engine_dir)
sys.path.insert(0, parent_dir)

# Now import predict directly from ml_engine/predict.py
try:
    from predict import predict
except Exception as e:
    print(f" CRITICAL IMPORT ERROR: {e}")

# Initialize FastAPI app
app = FastAPI(title="PhishGuard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.post("/api/scan")
async def scan_url(request: URLRequest):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")
    try:
        result = predict(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))