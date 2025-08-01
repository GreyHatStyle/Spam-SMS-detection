from fastapi import APIRouter
from middleware import RateLimiter

health_route = APIRouter()

@health_route.get("/health")
@RateLimiter.rate_limit_anon(max_calls=60, period=60)
@RateLimiter.rate_limit_anon(max_calls=2, period=1)
async def health_check():
    """
    Used to check if FastAPI is functional in server.
    """
    return {
        "status": "Success",
        "message": "Successfully connected with FastAPI backend sir!!!",
    }