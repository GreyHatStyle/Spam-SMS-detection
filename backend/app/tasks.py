from celery import Celery
from utils import predict_spam_ham

celery_app = Celery(
    "spam-ham",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery_app.task
def predict_spam_ham_task(text: str):
    """
    This will queue the request in celery, before processing the result,
    to avoid crash of course... 
    the tensorflow model is taking 1-2 seconds to predict 
    """
    
    return predict_spam_ham(text)