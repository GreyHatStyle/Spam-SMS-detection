# Fast API Backend
This is the backend part of our application, where the RestAPI recites.
- Uses [UV](https://pypi.org/project/uv/) python virtual environment.
- Uses Uvicorn to run the FastAPI app.

\
Visit here to see how to run these RestAPI: 
- [Scalar Doc](manasbisht.tech)
- [Swagger UI Doc](https://manasbisht.tech/docs)

## Setup Locally
1. Install uv using pip
   ```bash
   pip install uv
   ```
2. Now move to `backend/` directory
   ```bash
   cd backend
   ```
3. Sync the packages, (this will automatically install all required python libraries).
   ```bash
   uv sync
   ```
   - This step will mostly activate the virtual enviornment in terminal, if it worked in your case then skip 4th step, otherwise please follow it to activate it.
   - If terminal shows something like this `(backend) C:\Users\...`, where the **(backend)** is prefix, then its **Activated**, otherwise follow 4th step to do so.
4. Activate virtual enviornment

   - **Linux/Ubuntu** users.
       ```bash
       source ./.venv/bin/activate
       ```
   - **Windows** users
        ```bash
         .venv\Scripts\activate
        ```
5. Now to start the Local server
   ```bash
   cd app
   uvicorn main:app --reload 
   ```

This process will start the server in your local system.