import time
from collections import defaultdict
from typing import Callable, Dict

from enums.status_codes import HTTP_STATUS
from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from utils.logger import logger


class RateLimitContinuous(BaseHTTPMiddleware):
    def __init__(self, app, dispatch = None):
        super().__init__(app, dispatch)
        self.request_time_store: Dict[str, float] = defaultdict(lambda: (0.0)) # last_request_time
        
    
    async def dispatch(self, request: Request, call_next: Callable[[], None]):
        
        current_time = time.time()
        
        # x-forwarded-for: client1, proxy1, proxy2
        # where client1 will nbe the original ip of client, 
        # example x-forwarded-for: 203.0.113.195
        x_forwarded_for = request.headers.get("x-forwarded-for")
        
        if x_forwarded_for:
            request_ip = x_forwarded_for.split(",")[0].strip()
            logger.info(f"X-forwarded-for: {x_forwarded_for}")
        
        else:
            
            request_ip = request.client.host
            logger.info(f"Address: {request_ip}")
        
        # Continuous requests are being made under 1 second
        if  current_time - self.request_time_store[request_ip] <= 2:
            return JSONResponse(
                content={
                    "status":"error",
                    "message": "Too much request are being made!!",
                    "time_took": str(current_time - self.request_time_store[request_ip])
                },
                status_code=HTTP_STATUS.HTTP_429_TOO_MANY_REQUESTS,
            )
        
        
        self.request_time_store[request_ip] = current_time
        
        # Execution header
        start_time = time.time()
        response = await call_next(request)
        end_time = time.time()
        
        response.headers["X-Execution-Time"] = str(end_time - start_time)
        
        return response
        
        