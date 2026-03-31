from fastapi import FastAPI
from app.routes import detect, community

app = FastAPI()

app.include_router(detect.router)
app.include_router(community.router, prefix="/community")