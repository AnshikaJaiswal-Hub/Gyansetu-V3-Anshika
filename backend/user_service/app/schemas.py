# app/schemas.py
from pydantic import BaseModel, EmailStr, validator
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID

from .models import UserType

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    id: Optional[str] = None
    role: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    phone: str
    role: UserType
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: str
    googleToken: Optional[str] = None

class GoogleAuth(BaseModel):
    email: EmailStr
    role: str
    googleToken: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    role: str
    firstName: Optional[str] = None
    lastName: Optional[str] = None

    class Config:
        orm_mode = True

class AuthResponse(BaseModel):
    token: str
    user: UserResponse