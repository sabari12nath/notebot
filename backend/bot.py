import re
import requests
from bs4 import BeautifulSoup
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load TinyLlama or any Hugging Face-compatible LLM
tokenizer = AutoTokenizer.from_pretrained("TinyLlama/TinyLlama-1.1B-Chat-v1.0")
model = AutoModelForCausalLM.from_pretrained("TinyLlama/TinyLlama-1.1B-Chat-v1.0")

# Map of semesters to KTU notes pages
ktu_notes_pages = {
    f"S{i}": f"https://www.ktunotes.in/ktu-s{i}-notes-2019-scheme/" for i in range(1, 9)
}

# --- Extract semester, branch, and subject ---
def parse_input(user_input: str):
    sem_match = re.search(r"S[1-8]", user_input.upper())
    sem = sem_match.group() if sem_match else None

    branches = ["CSE", "ECE", "MECH", "CIVIL", "EEE", "IT"]
    branch = next((b for b in branches if b in user_input.upper()), None)

    # Extract subject as remaining words after removing sem and branch
    clean_input = re.sub(rf"{sem}|{branch}", "", user_input, flags=re.IGNORECASE)
    subject = clean_input.strip().replace("notes", "").replace("explain", "").strip()

    return sem, branch, subject

# --- Search the KTU page for subject and return PDF or fallback link ---
def fetch_subject_url(semester, subject_keyword):
    url = ktu_notes_pages.get(semester)
    if not url:
        return None

    try:
        soup = BeautifulSoup(requests.get(url).text, "html.parser")
        links = soup.find_all("a", href=True)
        for a in links:
            if subject_keyword.lower() in a.text.lower():
                return a["href"] if a["href"].startswith("http") else "https://www.ktunotes.in" + a["href"]
    except Exception as e:
        return None
    return url  # fallback to sem page

# --- LLM prompt formatting ---
def get_llm_response(user_name, subject, subject_url):
    roast_prompt = (
        f"You are RoastBot. Roast {user_name} brutally, then explain the topic "
        f"'{subject}' in 3 key bullet points for a KTU exam. Add a link if available.\n\n"
        f"[KTU Notes Link]: {subject_url}\n\n"
        f"Respond like a sarcastic college senior."
    )
    inputs = tokenizer(roast_prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=200)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# --- Full chatbot handler function ---
def handle_user_question(user_input, user_name="bro"):
    sem, branch, subject = parse_input(user_input)

    if not sem or not branch or not subject:
        return f"Yo {user_name}, are you even trying? I need a semester, branch, and subject. 🧠"

    subject_url = fetch_subject_url(sem, subject)
    return get_llm_response(user_name, subject, subject_url or "https://www.ktunotes.in")

