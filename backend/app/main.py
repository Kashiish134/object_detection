from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import login, dashboard, detection, alerts

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}):3000",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(detection.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")