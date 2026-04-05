from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Add ml_engine to the system path so we can import predict
# Adjust this path based on your exact folder structure
base_dir = os.path.dirname(os.path.abspath(__file__))
ml_engine_path = os.path.join(base_dir, "..", "ml_engine")
sys.path.append(ml_engine_path)

try:
    from predict import predict
except ImportError:
    print("Error: Could not import ml_engine. Ensure the folder structure is correct.")

app = FastAPI(title="PhishGuard API")

# Configure CORS so the React frontend (running on a different port) can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this to your frontend URL (e.g., ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected request payload schema
class ScanRequest(BaseModel):
    url: str

@app.post("/api/scan")
async def scan_url(request: ScanRequest):
    if not request.url:
        raise HTTPException(status_code=400, detail="URL is required")

    try:
        # Call the ML engine's predict function
        result = predict(request.url)
        
        # Format domain age for the frontend UI
        # predict.py encodes domain_age_days as: 1 (legit), 0 (unknown), -1 (new/suspicious)
        raw_age = result["features"].get("domain_age_days", 0)
        if raw_age == 1:
            domain_age_str = "Established"
        elif raw_age == -1:
            domain_age_str = "New"
        else:
            domain_age_str = "Unknown"

        # Append the formatted domain_age to the root of the response for Result.jsx
        result["domain_age"] = domain_age_str

        return result

    except Exception as e:
        # Catch any WHOIS timeouts or parsing errors and return a clean 500 error
        raise HTTPException(status_code=500, detail=f"Error analyzing URL: {str(e)}")

# Optional health check endpoint
@app.get("/")
async def root():
    return {"status": "PhishGuard Backend is running"}