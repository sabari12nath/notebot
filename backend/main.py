from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

# FastAPI instance
app = FastAPI()

# CORS for frontend connection (e.g., localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class Query(BaseModel):
    message: str

@app.post("/ask")
async def ask_question(query: Query):
    user_msg = query.message.strip()
    if not user_msg:
        return {"response": "Say something, genius."}

    roast = roast_line(user_msg)
    civil_answer = get_civil_answer(user_msg)
    final = f"{roast} 🤨\n\n📘 {civil_answer}"
    return {"response": final}
