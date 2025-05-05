# app/main.py
from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
import uuid
import os
from dotenv import load_dotenv

from . import models, schemas, crud, auth
from .database import engine, get_db

# Load environment variables
load_dotenv()

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gyansetu API",
    description="User authentication and management for Gyansetu",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok", "service": "gyansetu-user-service"}

# Authentication routes
@app.post("/api/auth/signup", response_model=schemas.AuthResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    new_user = crud.create_user(db=db, user=user)
    
    # Generate token
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={
            "sub": new_user.email,
            "id": str(new_user.id),
            "role": new_user.role
        }, 
        expires_delta=access_token_expires
    )
    
    # Map to the format expected by frontend
    user_response = {
        "id": str(new_user.id),
        "email": new_user.email,
        "role": new_user.role,
        "firstName": new_user.first_name,
        "lastName": new_user.last_name
    }
    
    return {
        "token": access_token,
        "user": user_response
    }

@app.post("/api/auth/login", response_model=schemas.AuthResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, credentials.email, credentials.password, credentials.role)
    
    # Check if user exists but has a different role
    if not user:
        user_with_email = crud.get_user_by_email(db, email=credentials.email)
        if user_with_email and user_with_email.role != credentials.role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Role mismatch",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Your account has been deactivated"
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={
            "sub": user.email,
            "id": str(user.id),
            "role": user.role
        }, 
        expires_delta=access_token_expires
    )
    
    # Map to the format expected by frontend
    user_response = {
        "id": str(user.id),
        "email": user.email,
        "role": user.role,
        "firstName": user.first_name,
        "lastName": user.last_name
    }
    
    return {
        "token": access_token,
        "user": user_response
    }

# Google Auth handling
@app.post("/api/auth/google-login", response_model=schemas.AuthResponse)
def google_login(google_auth: schemas.GoogleAuth, db: Session = Depends(get_db)):
    # Here we would normally verify the Google token with Google's API
    # For now, we'll assume the token is valid and use the provided info
    
    # Check if user exists
    db_user = crud.get_user_by_email(db, email=google_auth.email)
    
    if db_user:
        # Check if role matches
        if db_user.role != google_auth.role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Role mismatch",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        # Create new user
        user_data = schemas.UserCreate(
            email=google_auth.email,
            password=str(uuid.uuid4()),  # Generate random password
            phone=google_auth.phone if hasattr(google_auth, 'phone') and google_auth.phone else "",
            role=google_auth.role,
            first_name=google_auth.first_name if hasattr(google_auth, 'first_name') else "",
            last_name=google_auth.last_name if hasattr(google_auth, 'last_name') else ""
        )
        db_user = crud.create_user(db=db, user=user_data)
    
    # Generate token
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={
            "sub": db_user.email,
            "id": str(db_user.id),
            "role": db_user.role
        }, 
        expires_delta=access_token_expires
    )
    
    # Map to the format expected by frontend
    user_response = {
        "id": str(db_user.id),
        "email": db_user.email,
        "role": db_user.role,
        "firstName": db_user.first_name,
        "lastName": db_user.last_name
    }
    
    return {
        "token": access_token,
        "user": user_response
    }

# Token verification endpoint
@app.get("/api/auth/verify")
def verify_token(current_user: models.User = Depends(auth.get_current_user)):
    # Return user data if token is valid
    return {
        "valid": True,
        "user": {
            "id": str(current_user.id),
            "email": current_user.email,
            "role": current_user.role,
            "firstName": current_user.first_name,
            "lastName": current_user.last_name
        }
    }

# User routes
@app.get("/api/users/me", response_model=schemas.UserResponse)
def get_current_user_info(current_user: models.User = Depends(auth.get_current_user)):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "role": current_user.role,
        "firstName": current_user.first_name,
        "lastName": current_user.last_name
    }

# Start the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)