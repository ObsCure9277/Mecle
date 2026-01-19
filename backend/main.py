from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import date
import random
import os
from dotenv import load_dotenv
from words import WORD_LIST

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app = FastAPI(
    title="Mechacrypt API",
    servers=[
        {"url": BACKEND_URL, "description": "Production environment"},
        {"url": "http://localhost:8000", "description": "Local environment"}
    ]
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    FRONTEND_URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class ValidateRequest(BaseModel):
    guess: str
    target: str

class ValidateResponse(BaseModel):
    states: List[str]

class DailyWordResponse(BaseModel):
    word: str

def get_daily_word() -> str:
    """Get word based on today's date for consistency across sessions"""
    today = date.today()
    seed = today.year * 10000 + today.month * 100 + today.day
    random.seed(seed)
    return random.choice(WORD_LIST)

def get_random_word() -> str:
    """Get a truly random word (not tied to date)"""
    return random.choice(WORD_LIST)

@app.get("/")
async def root():
    return {"message": "Mechacrypt API v1.0", "status": "active"}

@app.get("/daily-word", response_model=DailyWordResponse)
async def daily_word():
    """Return today's word"""
    word = get_daily_word()
    return DailyWordResponse(word=word)

@app.get("/random-word", response_model=DailyWordResponse)
async def random_word():
    """Return a random word (changes each request)"""
    word = get_random_word()
    return DailyWordResponse(word=word)

@app.post("/validate", response_model=ValidateResponse)
async def validate(request: ValidateRequest):
    """Validate a guess against the target word"""
    guess = request.guess.upper()
    target = request.target.upper()
    
    if len(guess) != 5 or len(target) != 5:
        return ValidateResponse(states=["absent"] * 5)
    
    states = []
    target_chars = list(target)
    guess_chars = list(guess)
    
    # First pass: Mark correct positions
    for i in range(5):
        if guess_chars[i] == target_chars[i]:
            states.append("correct")
            target_chars[i] = None  # Mark as used
            guess_chars[i] = None
        else:
            states.append(None)
    
    # Second pass: Mark present positions
    for i in range(5):
        if guess_chars[i] is not None:
            if guess_chars[i] in target_chars:
                states[i] = "present"
                # Remove first occurrence from target
                target_chars[target_chars.index(guess_chars[i])] = None
            else:
                states[i] = "absent"
    
    return ValidateResponse(states=states)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
