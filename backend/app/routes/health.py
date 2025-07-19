from fastapi import APIRouter

health_route = APIRouter()

@health_route.get("/health")
async def health_check():
    """
    Used to check if FastAPI is functional in server.
    """
    return {
        "status": "Success",
        "message": "Successfully connected with FastAPI backend sir!!!",
    }