import os

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from tensorflow.keras.models import load_model

from enums.status_codes import HTTP_STATUS
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
async def is_spam(sms: SMS_message):
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
