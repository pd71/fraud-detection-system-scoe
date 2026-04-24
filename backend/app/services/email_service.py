import re
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

MODEL_PATH = BASE_DIR / "ml/email/email_model.pkl"
VECTORIZER_PATH = BASE_DIR / "ml/email/email_vectorizer.pkl"

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

def clean_text(text):
    text = str(text).lower()
    text = re.sub(
        r"^(from|return-path|received|delivered-to|message-id|date|subject|mime-version|content-type|x-[\w-]+):.*$",
        "",
        text,
        flags=re.MULTILINE,
    )
    text = text.replace("\r", " ").replace("\n", " ")
    text = text.replace("£", " pounds ").replace("$", " dollars ").replace("€", " euros ")
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def detect_email(content: str, sender: str) -> dict:
    cleaned = clean_text(content)
    vec = vectorizer.transform([cleaned])
    
    prediction = model.predict(vec)[0]
    probability = model.predict_proba(vec)[0][1]

    return {
        "prediction": int(prediction),
        "confidence": round(float(probability), 4),
        "type": "email"
    }