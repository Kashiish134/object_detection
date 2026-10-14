from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
def get_dashboard():

    return {
        "people": 45,
        "helmet": 20,
        "fire": 2,
        "vehicle": 11,
        "alerts": 5
    }