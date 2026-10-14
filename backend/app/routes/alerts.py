from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Alert

router = APIRouter()


@router.get("/alerts")
def list_alerts(db: Session = Depends(get_db)):
    rows = db.query(Alert).order_by(Alert.id.desc()).limit(50).all()
    return [
        {
            "id": r.id,
            "camera_name": r.camera_name,
            "alert_type": r.alert_type,
            "confidence": r.confidence,
            "time": r.time,
        }
        for r in rows
    ]