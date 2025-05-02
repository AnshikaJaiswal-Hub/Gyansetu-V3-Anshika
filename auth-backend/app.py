from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
from dotenv import load_dotenv
import uuid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from functools import wraps

# Load environment variables
load_dotenv()

# Validate critical environment variables
required_env_vars = ['DATABASE_URL', 'JWT_SECRET_KEY']
for var in required_env_vars:
    if not os.getenv(var):
        raise EnvironmentError(f"Missing required environment variable: {var}")

app = Flask(__name__)
CORS(app)

# Database configuration with Neon
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'connect_args': {'sslmode': 'require'}  # Ensure SSL for Neon
}
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=True)  # Nullable for OAuth users
    role = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    reset_token = db.Column(db.String(200), nullable=True)
    reset_token_expires = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

# Create tables
with app.app_context():
    try:
        db.create_all()
    except Exception as e:
        print(f"Error creating database tables: {str(e)}")
        raise

# Helper function to generate JWT token
def generate_token(user_id, role):
    """Generate a JWT token with user ID and role embedded."""
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id,
        'role': role
    }
    return jwt.encode(
        payload,
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

# Middleware to verify token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization', '')
        
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['sub']).first()
            
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

# Routes
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not data or not all(k in data for k in ['email', 'password', 'role']):
        return jsonify({'message': 'Missing required fields!'}), 400
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists!'}), 409
    
    # Hash the password
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    # Create new user
    new_user = User(
        id=str(uuid.uuid4()),
        email=data['email'],
        password=hashed_password,
        role=data['role'],
        phone=data.get('phone')
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        token = generate_token(new_user.id, new_user.role)
        
        return jsonify({
            'message': 'User created successfully!',
            'token': token,
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'role': new_user.role,
                'phone': new_user.phone
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error creating user: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not all(k in data for k in ['email', 'password', 'role']):
        return jsonify({'message': 'Email, password, and role are required!'}), 400
    
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.password or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password!'}), 401
    
    # Check role
    if user.role != data['role']:
        return jsonify({
            'message': 'The selected role does not match your account!',
            'actualRole': user.role
        }), 403
        
    # Generate token
    token = generate_token(user.id, user.role)
    
    return jsonify({
        'message': 'Login successful!',
        'token': token,
        'user': {
            'id': user.id,
            'email': user.email,
            'role': user.role,
            'phone': user.phone
        }
    }), 200

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    if not data or not data.get('email'):
        return jsonify({'message': 'Email is required!'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'message': 'If a user with that email exists, a reset link has been sent.'}), 200
    
    # Generate reset token
    reset_token = str(uuid.uuid4())
    token_expires = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    
    user.reset_token = reset_token
    user.reset_token_expires = token_expires
    
    try:
        db.session.commit()
        
        # Send email with reset link
        reset_link = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token={reset_token}"
        if os.getenv('SENDGRID_API_KEY'):
            try:
                message = Mail(
                    from_email=os.getenv('FROM_EMAIL', 'noreply@yourapp.com'),
                    to_emails=user.email,
                    subject='Password Reset Request',
                    html_content=(
                        f'<p>You requested a password reset. Click the link below to reset your password:</p>'
                        f'<p><a href="{reset_link}">Reset Password</a></p>'
                        f'<p>This link will expire in 1 hour.</p>'
                        f'<p>If you did not request this reset, you can ignore this email.</p>'
                    )
                )
                sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
                sg.send(message)
            except Exception as e:
                print(f"Email sending error: {str(e)}")
        
        print(f"Password reset link for {user.email}: {reset_link}")
        return jsonify({'message': 'If a user with that email exists, a reset link has been sent.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error processing request: {str(e)}'}), 500

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if not data or not all(k in data for k in ['token', 'password']):
        return jsonify({'message': 'Token and password are required!'}), 400
    
    user = User.query.filter_by(reset_token=data['token']).first()
    
    if not user or not user.reset_token_expires or user.reset_token_expires < datetime.datetime.utcnow():
        return jsonify({'message': 'Invalid or expired token!'}), 401
    
    # Update password
    user.password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    user.reset_token = None
    user.reset_token_expires = None
    
    try:
        db.session.commit()
        return jsonify({'message': 'Password reset successful!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error resetting password: {str(e)}'}), 500

@app.route('/api/verifyToken', methods=['POST'])
def verify_social_token():
    data = request.get_json()
    
    if not data or not data.get('token') or not data.get('role'):
        return jsonify({'message': 'Token and role are required!'}), 400
    
    try:
        # Placeholder for Firebase token verification
        # In production, use: from firebase_admin import auth; decoded_token = auth.verify_id_token(data['token'])
        email = "user@example.com"  # Replace with decoded_token['email'] in production
        selected_role = data['role']
        
        user = User.query.filter_by(email=email).first()
        
        if user:
            if user.role != selected_role:
                return jsonify({
                    'message': 'The selected role does not match your account!',
                    'actualRole': user.role
                }), 403
            token = generate_token(user.id, user.role)
            return jsonify({
                'message': 'Login successful!',
                'token': token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'role': user.role,
                    'phone': user.phone
                }
            }), 200
        else:
            new_user = User(
                id=str(uuid.uuid4()),
                email=email,
                password=None,
                role=selected_role
            )
            try:
                db.session.add(new_user)
                db.session.commit()
                token = generate_token(new_user.id, new_user.role)
                return jsonify({
                    'message': 'Account created successfully!',
                    'token': token,
                    'user': {
                        'id': new_user.id,
                        'email': new_user.email,
                        'role': new_user.role,
                        'phone': new_user.phone
                    }
                }), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({'message': f'Error creating user: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'message': f'Error verifying token: {str(e)}'}), 401

@app.route('/api/verify-token', methods=['POST'])
def verify_token():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'No token provided!'}), 401
    
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user = User.query.filter_by(id=payload['sub']).first()
        if not user:
            return jsonify({'message': 'User not found!'}), 401
        
        new_token = generate_token(user.id, user.role)
        return jsonify({
            'message': 'Token verified successfully!',
            'token': new_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': user.role,
                'phone': user.phone
            }
        }), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired!'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token!'}), 401

@app.route('/api/me', methods=['GET'])
@token_required
def get_me(current_user):
    return jsonify({
        'user': {
            'id': current_user.id,
            'email': current_user.email,
            'role': current_user.role,
            'phone': current_user.phone
        }
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)