# app/auth_utils.py
import random
import string
from datetime import datetime, timedelta
from typing import Dict, Optional, Any
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from . import models, crud

# Load environment variables
load_dotenv()

# Email configuration
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER", "your-email@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")
EMAIL_FROM = os.getenv("EMAIL_FROM", "Gyansetu <noreply@gyansetu.com>")

def generate_otp(length: int = 6) -> str:
    """Generate a random OTP of specified length."""
    return ''.join(random.choices(string.digits, k=length))

def store_otp(db: Session, email: str, otp_type: str, otp: str, expiry_minutes: int = 10) -> None:
    """Store OTP in database with expiry time."""
    expiry_time = datetime.utcnow() + timedelta(minutes=expiry_minutes)
    
    # Delete any existing OTP for this email and type
    db.query(models.OTP).filter(
        models.OTP.email == email,
        models.OTP.otp_type == otp_type
    ).delete()
    
    # Create new OTP record
    db_otp = models.OTP(
        email=email,
        otp=otp,
        otp_type=otp_type,
        expiry=expiry_time,
        attempts=0
    )
    db.add(db_otp)
    db.commit()

def verify_otp(db: Session, email: str, otp: str, otp_type: str) -> bool:
    """Verify OTP from database for given email and type."""
    db_otp = db.query(models.OTP).filter(
        models.OTP.email == email,
        models.OTP.otp_type == otp_type
    ).first()
    
    if not db_otp:
        return False
    
    # Check expiry
    if datetime.utcnow() > db_otp.expiry:
        db.delete(db_otp)
        db.commit()
        return False
    
    # Increment attempts
    db_otp.attempts += 1
    
    # Check max attempts (3)
    if db_otp.attempts > 3:
        db.delete(db_otp)
        db.commit()
        return False
    
    # Check OTP match
    if db_otp.otp == otp:
        db.delete(db_otp)
        db.commit()
        return True
    
    db.commit()
    return False

def send_otp_email(email: str, otp: str, otp_type: str) -> bool:
    """Send OTP email."""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_FROM
        msg['To'] = email
        
        if otp_type == "verification":
            msg['Subject'] = "Gyansetu - Email Verification OTP"
            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #8A2BE2;">Gyansetu Email Verification</h2>
                    <p>Thank you for registering with Gyansetu. To complete your registration, please use the following OTP:</p>
                    <div style="background-color: #f0e6ff; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4B0082;">
                        {otp}
                    </div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this verification, please ignore this email.</p>
                    <p>Regards,<br>Gyansetu Team</p>
                </div>
            </body>
            </html>
            """
        elif otp_type == "password_reset":
            msg['Subject'] = "Gyansetu - Password Reset OTP"
            body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #8A2BE2;">Gyansetu Password Reset</h2>
                    <p>You recently requested to reset your password. Please use the following OTP to proceed:</p>
                    <div style="background-color: #f0e6ff; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4B0082;">
                        {otp}
                    </div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this password reset, please ignore this email or contact support.</p>
                    <p>Regards,<br>Gyansetu Team</p>
                </div>
            </body>
            </html>
            """
        
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def send_verification_otp(db: Session, email: str) -> dict:
    """Generate, store and send verification OTP."""
    otp = generate_otp()
    store_otp(db, email, "verification", otp)
    success = send_otp_email(email, otp, "verification")
    
    return {
        "success": success,
        "message": "Verification OTP sent successfully" if success else "Failed to send verification OTP"
    }

def send_password_reset_otp(db: Session, email: str) -> dict:
    """Generate, store and send password reset OTP."""
    otp = generate_otp()
    store_otp(db, email, "password_reset", otp)
    success = send_otp_email(email, otp, "password_reset")
    
    return {
        "success": success,
        "message": "Password reset OTP sent successfully" if success else "Failed to send password reset OTP"
    }