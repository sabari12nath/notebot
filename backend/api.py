from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from bot import handle_user_question

app = FastAPI()

# Allow CORS for frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/roast")
async def roast(request: Request):
    data = await request.json()
    user_input = data.get("input", "")
    user_name = data.get("name", "bro")
    response = handle_user_question(user_input, user_name)
    return {"response": response}
