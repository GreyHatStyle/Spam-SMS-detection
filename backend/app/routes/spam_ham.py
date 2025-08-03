from app_enums import HTTP_STATUS
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from middleware import RateLimiter
from pydantic import BaseModel
from typing import Literal
from app_enums import MY_RESPONSES
from utils import predict_spam_ham

spam_ham_route = APIRouter()

class SMS_message(BaseModel):
    text: str
    
class SpamHamSuccessResponse(BaseModel):
    status: Literal[MY_RESPONSES.SUCCESS, "_"]
    message: Literal["Spam", "Ham"]
class SpamHamErrorResponse(BaseModel):
    status: Literal[MY_RESPONSES.EXCEPTION, "_"]
    message: str


@spam_ham_route.post(
    "/ml/spam", 
    response_model=SpamHamSuccessResponse,
    responses={
        HTTP_STATUS.HTTP_200_OK: {
            "description": "Successful message",
            "model": SpamHamSuccessResponse,
        },
        HTTP_STATUS.HTTP_500_INTERNAL_SERVER_ERROR: {
            "description": "Internal server error",
            "model": SpamHamErrorResponse,
        }
    }    
)
@RateLimiter.rate_limit_anon(max_calls=50, period=24*60*60) # Allowing only 50 api request every day
@RateLimiter.rate_limit_anon(max_calls=2, period=1) # Protecting burst requests
async def is_spam(sms: SMS_message, request: Request):
    try: 
        ans = predict_spam_ham(sms.text)
        
        return JSONResponse(
            content={
            "status":MY_RESPONSES.SUCCESS.value,
            "message": ans,
            },
            status_code=HTTP_STATUS.HTTP_200_OK,
        )
    
    except Exception as e:
        return JSONResponse(
            content = {
                "status":MY_RESPONSES.EXCEPTION.value,
                "message":str(e),
            },
            status_code=HTTP_STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        )
