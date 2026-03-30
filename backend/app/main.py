from fastapi import FastAPI
from app.routes import sms

app = FastAPI()

app.include_router(sms.router, prefix="/sms")

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}

