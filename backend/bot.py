import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.responses import JSONResponse

# Hugging Face Transformers imports
try:
    from transformers import pipeline
except ImportError as e:
    raise ImportError(
        "Your 'transformers' package is too old or not installed. "
        "Please run: pip install --upgrade transformers"
    ) from e

# Load .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize Hugging Face chatbot pipeline (loads model at startup)
chatbot = pipeline("text-generation", model="microsoft/DialoGPT-medium")

app = FastAPI()

# CORS middleware for local dev — adjust for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ChatRequest(BaseModel):
    message: str
    model: str = "openai"  # "openai" or "huggingface"

@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    try:
        user_message = chat_request.message
        model_choice = chat_request.model.lower()

        if model_choice == "huggingface":
            # Use Hugging Face DialoGPT with text-generation
            response = chatbot(user_message, max_length=100, pad_token_id=50256)
            answer = response[0]['generated_text'] if response and 'generated_text' in response[0] else "Sorry, I didn't get that."
            return {"response": answer}
        else:
            # Default: Use OpenAI GPT-4o
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a sarcastic civil engineering tutor. "
                            "Always give clear civil engineering explanations but add a snarky or humorous remark."
                        ),
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ]
            )
            answer = response.choices[0].message.content
            return {"response": answer}
    except Exception as e:
        # Always return JSON on error
        return JSONResponse(status_code=500, content={"error": "Internal server error", "details": str(e)})
