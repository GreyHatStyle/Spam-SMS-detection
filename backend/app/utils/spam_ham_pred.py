import numpy as np
import os
from tensorflow.keras.models import load_model



vectorizer_model = None
lstm_model = None

def get_and_load_models():
    global vectorizer_model, lstm_model
    
    if vectorizer_model is None and lstm_model is None:
        vectorizer_path = os.path.join(
            os.path.dirname(__file__),
            "../ml_models/vectorizer-models/spam_ham_text_vectorizer_2.keras"
        )
        
        lstm_path = os.path.join(
            os.path.dirname(__file__),
            "../ml_models/predictive-models/spam_ham_BiLstm_2.keras"
        )
        
        vectorizer_model = load_model(vectorizer_path)
        lstm_model = load_model(lstm_path)
        print("Model loaded for work process")
        
    return vectorizer_model, lstm_model
    



def predict_spam_ham(sms_message: str) -> str:
    """
    Takes Normal SMS text from user, and predict whether `Spam` or `Ham`

    Args:
        sms_message : String text sms.

    Returns:
        str: Result `spam` or `ham`.
    """
    vectorizer_model, lstm_model = get_and_load_models();
    
    vec_text = vectorizer_model(sms_message)
    
    pred_arr = lstm_model.predict(np.expand_dims(vec_text, 0))
    pred = np.argmax(pred_arr)
    
    pred_data = {
        0: "Ham",
        1: "Spam",
    }
    
    return pred_data[pred]