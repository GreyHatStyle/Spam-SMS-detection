from fastapi import APIRouter, Request
from middleware import RateLimiter
from pydantic import BaseModel
from typing import Literal
from app_enums import MY_RESPONSES

health_route = APIRouter()

class HealthSuccess(BaseModel):
    status: Literal[MY_RESPONSES.SUCCESS, "_"]
    message: Literal["Backend Server seems to work!!", "_"]

@health_route.get(
    "/health",
    response_model=HealthSuccess,
)
@RateLimiter.rate_limit_anon(max_calls=60, period=60)
@RateLimiter.rate_limit_anon(max_calls=2, period=1)
async def health_check(request: Request):
    """
    Used to check if FastAPI is functional in server.
    """
    return {
        "status": MY_RESPONSES.SUCCESS,
        "message": "Backend Server seems to work!!",
    }