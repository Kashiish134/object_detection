import io
from PIL import Image
from ultralytics import YOLO

# Standard COCO model. Swap this for your helmet model later, e.g. "best.pt"
MODEL_PATH = "yolov8n.pt"

_model = None


def get_model():
    global _model
    if _model is None:
        _model = YOLO(MODEL_PATH)  # loaded once, on first request
    return _model


def detect_image(image_bytes: bytes, conf: float = 0.25):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    result = get_model().predict(image, conf=conf, verbose=False)[0]

    detections = []
    for box in result.boxes:
        x1, y1, x2, y2 = [round(v) for v in box.xyxy[0].tolist()]
        detections.append({
            "label": result.names[int(box.cls[0])],
            "confidence": round(float(box.conf[0]), 3),
            "box": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
        })

    return {"width": image.width, "height": image.height, "detections": detections}