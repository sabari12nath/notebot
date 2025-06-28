# backend/search.py

import requests

def search_web(query):
    url = f"https://api.duckduckgo.com/?q={query}&format=json&no_redirect=1"
    try:
        response = requests.get(url)
        data = response.json()
        return data.get("Abstract", "No useful info found.")
    except:
        return "Web search failed."
