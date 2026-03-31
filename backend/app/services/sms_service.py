import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

model = joblib.load(BASE_DIR / "ml/sms/sms_model.pkl")
vectorizer = joblib.load(BASE_DIR / "ml/sms/sms_vectorizer.pkl")

def detect_sms(message: str):
    vec = vectorizer.transform([message])
    pred = model.predict(vec)[0]
    prob = model.predict_proba(vec)[0]

    confidence = float(max(prob))

    # If model says ham but isn't confident enough, treat as spam
    if int(pred) == 0 and confidence < 0.65:
        pred = 1
        confidence = confidence + 0.1

    return {
        "type": "sms",
        "prediction": int(pred),
        "confidence": confidence
    }