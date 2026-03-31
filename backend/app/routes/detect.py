from fastapi import APIRouter
from pydantic import BaseModel

from app.services.sms_service import detect_sms
from app.services.email_service import detect_email
from app.services.url_service import detect_url

router = APIRouter()

class DetectRequest(BaseModel):
    type: str   # sms | email | url
    content: str

@router.post("/detect")
def detect(req: DetectRequest):
    if req.type == "sms":
        return detect_sms(req.content)

    elif req.type == "email":
        return detect_email(req.content)

    elif req.type == "url":
        return detect_url(req.content)

    return {"error": "Invalid type"}