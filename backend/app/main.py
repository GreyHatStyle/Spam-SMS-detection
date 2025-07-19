from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import health_route, spam_ham_route

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
)

app.include_router(health_route)
app.include_router(spam_ham_route)