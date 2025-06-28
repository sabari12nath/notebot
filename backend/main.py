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

# Mock Civil Engg data (KTU S1–S4)
civil_db = {
    "chezy": "Chezy’s equation: V = C√(mi)",
    "bernoulli": "Bernoulli’s equation: P + ½ρv² + ρgh = constant",
    "som": "SOM: Bending Moment, Shear Force, and Stress-Strain relationships",
    "fluid": "Fluid Mechanics: Concepts of viscosity, flow types, and continuity.",
    "ft": "Fourier Transform is not in civil 😑 but okay… ask something real."
}

# Roast templates
def roast_line(user_msg: str) -> str:
    roasts = [
        "Did you sleep through class again?",
        "That question screams 'I didn’t open the textbook'.",
        "You googled this, didn’t you?",
        "Bold of you to ask, considering your GPA.",
        "Your brain called… it wants a vacation."
    ]
    return random.choice(roasts)

# Answer logic
def get_civil_answer(msg: str) -> str:
    msg = msg.lower()
    for keyword, answer in civil_db.items():
        if keyword in msg:
            return answer
    return "Hmm… I don’t know that. Maybe try asking better, or check your syllabus?"

# Route
@app.post("/ask")
async def ask_question(query: Query):
    user_msg = query.message.strip()
    if not user_msg:
        return {"response": "Say something, genius."}

    roast = roast_line(user_msg)
    civil_answer = get_civil_answer(user_msg)
    final = f"{roast} 🤨\n\n📘 {civil_answer}"
    return {"response": final}
