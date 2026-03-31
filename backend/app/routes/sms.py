from fastapi import APIRouter

router = APIRouter()

scam_keywords = [
    "win", "free", "urgent", "lottery", "prize",
    "click now", "verify", "bank", "otp", "offer"
]

@router.post("/detect")
def detect_sms(message: str):
    message_lower = message.lower()
    
    for word in scam_keywords:
        if word in message_lower:
            return {
                "prediction": "SCAM",
                "reason": f"Contains suspicious word: '{word}'"
            }
    
    return {
        "prediction": "SAFE",
        "reason": "No suspicious keywords found"
    }