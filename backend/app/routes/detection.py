from datetime import datetime

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from PIL import UnidentifiedImageError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Alert, Detection
from app.utils.yolo import detect_image

router = APIRouter()

# Labels that should raise an alert (used once you have a helmet model)
ALERT_LABELS = {"no_helmet", "no-helmet", "no helmet", "no-hardhat"}


@router.post("/detect")
def detect(
    file: UploadFile = File(...),
    camera: str = "upload",
    db: Session = Depends(get_db),
):
    try:
        result = detect_image(file.file.read())
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Please upload a valid image")

    now = datetime.now()
    for d in result["detections"]:
        db.add(Detection(
            object_name=d["label"],
            confidence=d["confidence"],
            camera=camera,
            created_at=now,
        ))
        if d["label"].lower() in ALERT_LABELS:
            db.add(Alert(
                camera_name=camera,
                alert_type=d["label"],
                confidence=d["confidence"],
                time=now,
            ))
    db.commit()
    return result


@router.get("/detections")
def list_detections(db: Session = Depends(get_db)):
    rows = db.query(Detection).order_by(Detection.id.desc()).limit(50).all()
    return [
        {
            "id": r.id,
            "object_name": r.object_name,
            "confidence": r.confidence,
            "camera": r.camera,
            "created_at": r.created_at,
        }
        for r in rows
    ]