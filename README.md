# SPAM HAM SMS Detection
The website simulates a two-way SMS conversation between two users *Alice* and *Bob*, to demonstrate real-time **SPAM** messages detection using Deep learning.

- Technology Stack - React JS + Typescript and FastAPI.
- Link - https://spam-sms-detection-virid.vercel.app/

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/4637a77b-9038-4dcb-a1ed-5581119a04de" />


## Table of Contents
1. [How It Works](#how-it-works)
2. [Public API Access](#public-api-access)
3. [Project Structure](#project-structure)
4. [Setup Locally](#setup-locally)
5. [Feedback](#feedback)
6. [Author](#author)


## How It Works
- Two mobile devices are rendered in the frontend, built using **React + TypeScript**, implemented in `frontend/`.
    - One for ***Alice***.
    - One for ***Bob***.
- Then, using both devices, messages can be shared between each other, just like regular SMS chat.
- In the backend, every outgoing message is first passed through a **spam detection API**, built using **FastAPI**, implemented in the `backend/` repo.
- The REST API uses a deep learning Bi-directional LSTM model (trained in the `ml/` repo), to classify messages as:
    - 🟢 **Ham**: Delivered to main inbox, with a notification sound.
    - 🔴 **Spam**: Redirected to a separate **Spam box** of device, with no notification sound.
- This effectively simulates real-time **Spam SMS** filtering between mobile devices.

## Public API Access
You can directly use the hosted **Spam Detection API** to classify your own sms or messages also, without running the project locally.

> **Usage Limit:** To conserve limited server resources, only ***50 requests per day*** are allowed per user, hence please use the API responsibly.

### Endpoint
```bash
POST https://manasbisht.tech/ml/spam
```
**Request Body (JSON)**:
```json
{
  "text": "Any SMS or text, which needs to be checked whether spam or ham"
}
```
**Sample Response**:
```json
{
  "status": "success",
  "message": "Ham"
}
```


### Example
**1. Javascript**:
```js
fetch('https://manasbisht.tech/ml/spam',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'You’ve been selected for a free vacation!',
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Prediction:', data.message); // "Spam" or "Ham"
  })
  .catch(error => {
    console.error('Error:', error);
  }
);

```

**2. Axios in React**
```jsx
import axios from 'axios';

const checkSpam = async (text) => {
  try{
    const response = await axios.post('https://manasbisht.tech/ml/spam', {
      text: text,
    });

    console.log('Prediction:', response.data.message); // "Spam" or "Ham"
  }
  catch(error){
    console.error('API Error:', error);
  }
};

// Example usage
checkSpam("You’ve won a free prize! Click here to claim.");
```
**3. Curl**
```bash
curl -X POST https://manasbisht.tech/ml/spam \
  -H "Content-Type: application/json" \
  -d '{"text": "Congratulations Customer!! you have been debited 2 lakh rupees!!"}'
```



## Project Structure
- `frontend/`: ***React + TypeScript** website simulating two mobile devices for SMS communication between them, [click here to know more...](https://github.com/GreyHatStyle/Spam-SMS-detection/tree/main/frontend#readme).
- `backend/`: **FastAPI** application, for exposing the prediction model Rest API endpoint, [click here to know more...](https://github.com/GreyHatStyle/Spam-SMS-detection/tree/main/backend#readme).
- `ml/`: **Jupyter notebooks** containing data preprocessing and Bi-directional LSTM model *training* and *testing* process, [click here to know more...](https://github.com/GreyHatStyle/Spam-SMS-detection/tree/main/ml#readme).

## Setup Locally
1. Clone the Project
```bash
git clone https://github.com/GreyHatStyle/Spam-SMS-detection.git
```
2. Setup **Frontend**
    - Visit here to do so, [frontend setup](https://github.com/GreyHatStyle/Spam-SMS-detection/tree/main/frontend#readme).
      
3. Setup **Backend**
    - Visit here to do so, [backend setup](https://github.com/GreyHatStyle/Spam-SMS-detection/tree/main/backend#readme).
  
## Feedback
If you have any feedback, please reach me it manasbisht1142004@gmail.com.


## Author

- [@GreyHatStyle(Manas Bisht)](https://github.com/GreyHatStyle)