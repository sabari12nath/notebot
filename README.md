🏗️ KTU Civil Engineering Chatbot
A snarky AI chatbot for civil engineering students — asks your silly questions, roasts you for them, and still helps you pass!
Built with Next.js (React) on the frontend, and a choice of:

✅ FastAPI backend with OpenAI GPT-4

✅ Or a local conversational model (DialoGPT)

🚀 Features
✅ Fun roast replies
✅ Civil engineering Q&A (structural analysis, concrete tech, surveying, fluid mechanics, etc.)
✅ Dark/light theme toggle
✅ Chat history download
✅ Sidebar with quick topics

🗂️ Project Structure
graphql
Copy
Edit
my-chatbot/
 ├─ frontend/         # Your Next.js app
 ├─ backend/          # Your FastAPI server OR local Transformers script
 ├─ .env              # For OpenAI API key (if using GPT)
 ├─ README.md
⚙️ Requirements
Python 3.8+

Node.js 18+

pip install fastapi uvicorn openai python-dotenv (for OpenAI FastAPI)

Or pip install transformers (for DialoGPT)

OpenAI account + API key (for GPT backend)

🔑 Setup
Clone the repo:

bash
Copy
Edit
git clone https://github.com/sabari12nath/notebot
cd ktu-civil-chatbot
Install frontend dependencies:

bash
Copy
Edit
cd frontend
npm install
Install backend dependencies:

bash
Copy
Edit
cd backend
# For OpenAI FastAPI
pip install fastapi uvicorn openai python-dotenv
# Or for DialoGPT
pip install transformers
Create .env in backend/:

env
Copy
Edit
OPENAI_API_KEY=your_openai_api_key_here
🧠 Option 1 — Local AI Model (DialoGPT)
✅ Run DialoGPT locally
python
Copy
Edit
# backend/dialo_gpt_chat.py
from transformers import pipeline, Conversational

# Load conversational pipeline
chatbot = pipeline("conversational", model="microsoft/DialoGPT-medium")

# Start conversation
conversation = Conversational("Hi there!")
response = chatbot(conversation)
print(response)

# Continue conversation
conversation.add_user_input("Tell me about concrete technology.")
response = chatbot(conversation)
print(response)
Note: DialoGPT is general chit-chat, not domain-specific.
Use this for local testing only.

🧠 Option 2 — FastAPI + OpenAI GPT
✅ main.py
python
Copy
Edit
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a snarky civil engineering tutor."},
            {"role": "user", "content": chat_request.message}
        ]
    )
    answer = response.choices[0].message.content
    return {"response": answer}
✅ Run FastAPI
bash
Copy
Edit
uvicorn main:app --reload --port 8000
✅ Connect Next.js to FastAPI
Your Next.js /api/chat.ts should proxy to FastAPI:

ts
Copy
Edit
// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: req.body.message }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
✨ Running Everything
Start the backend:

bash
Copy
Edit
cd backend
uvicorn main:app --reload --port 8000
Start the frontend:

bash
Copy
Edit
cd frontend
npm run dev
Open http://localhost:3000 and start asking your silly questions!

🔒 Security Tips
Never expose your OpenAI API key to the frontend.

Restrict CORS in production.

Use HTTPS when deployed.

Monitor usage if you use OpenAI to avoid high costs.

🚀 Deploy
Deploy FastAPI on Render, Railway, or Fly.io.

Deploy Next.js on Vercel or Netlify.

Set OPENAI_API_KEY as an environment variable on your server.

👷 Future improvements
✅ Add embeddings + vector store (RAG) for real course PDFs
✅ Add streaming responses
✅ Save chat history to a database
✅ Add user authentication

📚 Credits
Frontend: Next.js, React, Tailwind CSS

Backend: FastAPI + OpenAI or Hugging Face Transformers

Roast style: You and your seniors 😏
