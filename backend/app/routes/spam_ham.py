import os

from enums.status_codes import HTTP_STATUS
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from middleware import RateLimiter
from pydantic import BaseModel
from tensorflow.keras.models import load_model
from utils import predict_spam_ham

spam_ham_route = APIRouter()


vectorizer_path = os.path.join(
    os.path.dirname(__file__),
    "../ml_models/vectorizer-models/spam_ham_text_vectorizer.keras"
)

lstm_path = os.path.join(
    os.path.dirname(__file__),
    "../ml_models/predictive-models/spam_ham_BiLstm.keras"
)

vectorizer_model = load_model(vectorizer_path)
lstm_model = load_model(lstm_path)

class SMS_message(BaseModel):
    text: str

@spam_ham_route.post("/ml/spam", )
@RateLimiter.rate_limit_anon(max_calls=50, period=24*60*60) # Allowing only 50 api request every day
@RateLimiter.rate_limit_anon(max_calls=2, period=1) # Protecting burst requests
async def is_spam(sms: SMS_message, request: Request):
    try:
        vec_text = vectorizer_model(sms.text)
        
        ans = predict_spam_ham(lstm_model, vec_text)
        
        return JSONResponse(
            content={
            "status":"success",
            "message": ans,
            },
            status_code=HTTP_STATUS.HTTP_200_OK,
        )
    
    except Exception as e:
        return JSONResponse(
            content = {
                "status":"exception",
                "message":str(e),
            },
            status_code=HTTP_STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
        )
