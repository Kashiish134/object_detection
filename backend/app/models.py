from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100))
    email = Column(String(100))
    password = Column(String(255))
    role = Column(String(50))


class Detection(Base):
    __tablename__ = "detections"
    id = Column(Integer, primary_key=True, index=True)
    object_name = Column(String(100))
    confidence = Column(Float)
    camera = Column(String(100))
    created_at = Column(DateTime)


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    camera_name = Column(String(100))
    alert_type = Column(String(100))
    confidence = Column(Float)
    time = Column(DateTime)