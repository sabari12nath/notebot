# backend/gpt_logic.py

import openai
from search import search_web

openai.api_key = "your-openai-api-key"  # Replace this

def roast_and_help(user_input):
    messages = [
        {"role": "system", "content": "You are RoastBot, a sarcastic assistant who roasts students before helping them with KTU Civil Engineering (2019 scheme) topics from Sem 1 to 4."},
        {"role": "user", "content": user_input}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.9,
            max_tokens=500
        )
        content = response["choices"][0]["message"]["content"]

        if "let me check the web" in content.lower():
            web_data = search_web(user_input)
            content += f"\n\n🔎 Here's something from the web: {web_data}"
        return content

    except Exception as e:
        return f"Error: {str(e)}"
