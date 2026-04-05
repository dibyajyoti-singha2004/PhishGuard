from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ✅ Correct import (since ml_engine is inside backend)
from ml_engine.predict import predict

app = FastAPI(title="PhishGuard API")

# Configure CORS so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later you can restrict to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ScanRequest(BaseModel):
    url: str

@app.post("/api/scan")
async def scan_url(request: ScanRequest):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")

    try:
        result = predict(request.url)

        # Format domain age
        raw_age = result["features"].get("domain_age_days", 0)
        if raw_age == 1:
            domain_age_str = "Established"
        elif raw_age == -1:
            domain_age_str = "New"
        else:
            domain_age_str = "Unknown"

        result["domain_age"] = domain_age_str

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing URL: {str(e)}")

@app.get("/")
async def root():
    return {"status": "PhishGuard Backend is running"}