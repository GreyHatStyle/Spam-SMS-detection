from fastapi import APIRouter, Request
from scalar_fastapi import get_scalar_api_reference

doc_router = APIRouter()

@doc_router.get("/", include_in_schema=False)
async def scalar_html(request: Request):
    app = request.app
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title="Spam Ham API doc",
    )