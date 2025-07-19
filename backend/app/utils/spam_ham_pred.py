import numpy as np


def predict_spam_ham(dl_model, vec_text) -> str:
    """
    Takes the **Vectorized text** and **Tensorflow based Prediction Model** and predicts whether SMS is `spam` or `ham`

    Args:
        dl_model : Tensorflow based Model
        vec_text : Vectorized Text

    Returns:
        str: Result `spam` or `ham`.
    """
    
    pred_arr = dl_model.predict(np.expand_dims(vec_text, 0))
    pred = np.argmax(pred_arr)
    
    pred_data = {
        0: "Ham",
        1: "Spam",
    }
    
    return pred_data[pred]