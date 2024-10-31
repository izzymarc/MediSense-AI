from flask import Blueprint, request, jsonify
from app.models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'])
    # Insert user data to MongoDB
    return jsonify({"message": "Registration successful"})

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user_data = User.get_by_email(data['email'])
    # Implement login logic here
    return jsonify({"message": "Login successful"})