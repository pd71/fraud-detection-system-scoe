import joblib
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

model = joblib.load(BASE_DIR / "ml/email/email_model.pkl")
vectorizer = joblib.load(BASE_DIR / "ml/email/email_vectorizer.pkl")

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"^(from|return-path|received|delivered-to|message-id|date|subject|mime-version|content-type|x-[\w-]+):.*$",
                  "", text, flags=re.MULTILINE)
    text = text.replace("\r", " ").replace("\n", " ")
    text = text.replace("£", " pounds ").replace("$", " dollars ").replace("€", " euros ")
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def detect_email(message: str):
    cleaned = clean_text(message)
    vec = vectorizer.transform([cleaned])
    pred = model.predict(vec)[0]
    prob = model.predict_proba(vec)[0]

    confidence = float(max(prob))

    # If model says ham but isn't confident, treat as spam
    if int(pred) == 0 and confidence < 0.60:
        pred = 1

    return {
        "type": "email",
        "prediction": int(pred),
        "confidence": confidence
    }