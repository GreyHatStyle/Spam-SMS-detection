import numpy as np
import os
from tensorflow.keras.models import load_model

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


def predict_spam_ham(sms_message: str) -> str:
    """
    Takes Normal SMS text from user, and predict whether `Spam` or `Ham`

    Args:
        sms_message : String text sms.

    Returns:
        str: Result `spam` or `ham`.
    """
    vec_text = vectorizer_model(sms_message)
    
    pred_arr = lstm_model.predict(np.expand_dims(vec_text, 0))
    pred = np.argmax(pred_arr)
    
    pred_data = {
        0: "Ham",
        1: "Spam",
    }
    
    return pred_data[pred]