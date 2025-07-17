from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
)

@app.get("/health")
async def health_check():
    return {
        "status": "Success",
        "message": "Successfully connected with FastAPI backend sir!!!",
    }