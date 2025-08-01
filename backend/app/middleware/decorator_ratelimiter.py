import hashlib
import time
from functools import wraps
from typing import Any, Callable

from fastapi import HTTPException, Request


class RateLimiter:
    """
    This is for applying decorator type ratelimiter\n
    
    """
    def __init__(self):
        ...

    # TODO: Make this using REDIS cache.
    @staticmethod
    def rate_limit_anon(max_calls: int, period: int):
        
        def decorator(func: Callable) -> Callable:
            
            usage: dict[str, list[float]] = {}
            
            @wraps(func)
            async def wrapper(*args, **kwargs) -> Any:
                
                request: Request = None
                for arg in args:
                    if isinstance(arg, Request):
                        request = arg
                        break
                    
                if request is None:
                    request = kwargs.get('request')
                    
                if not request or not isinstance(request, Request):
                    raise ValueError("Request Not found in parameters!!")
                
                if not request.client:
                    raise ValueError("Request has no client information")
                
                ip_address: str = request.client.host
                
                # Creating unique identifier for the client
                # can be used to store more data in that hash in future
                unique_id: str = hashlib.sha256((ip_address).encode()).hexdigest()
                print(unique_id)
                
                # update the timestamps
                now = time.time()
                if unique_id not in usage:
                    usage[unique_id] = []
                    
                timestamps: list[float] = usage[unique_id]
                timestamps[:] = [t for t in timestamps if now-t < period]
                print("Times stamps: ", timestamps)
                
                if len(timestamps) < max_calls:
                    timestamps.append(now)
                    return await func(*args, **kwargs)
                
                # calculate the time to wait before the next request
                wait = period - (now - timestamps[0])
                print("Wait time: ", wait)
                
                raise HTTPException(
                    status_code=429,
                    detail=f"Rate limit exceeded. Retry after {wait:.2f} seconds.",
                )
                
            return wrapper
        
        return decorator
