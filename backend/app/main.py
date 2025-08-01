from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import doc_router, health_route, spam_ham_route

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_route)
app.include_router(spam_ham_route)
app.include_router(doc_router)