# app/models.py
from sqlalchemy import Boolean, Column, String, DateTime, Text, Enum, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from datetime import datetime

from .database import Base

class UserType(str, enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    INSTITUTE = "institute"
    PARENT = "parent"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(UserType), nullable=False)  # student, teacher, institute, parent
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class OTP(Base):
    __tablename__ = "otps"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    otp = Column(String)
    otp_type = Column(String)  # 'verification' or 'password_reset'
    expiry = Column(DateTime)
    attempts = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)