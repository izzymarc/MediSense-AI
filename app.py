from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_cors import CORS
import os
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# MongoDB connection
client = MongoClient(os.getenv('MONGO_URI'))
db = client['medisense']

# Set up Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# MongoDB User Model using Flask-Login
class User(UserMixin):
    def __init__(self, id, first_name, last_name, email, password, date_of_birth, gender, contact_number=None, medical_history=None, allergies=None):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.date_of_birth = date_of_birth
        self.gender = gender
        self.contact_number = contact_number
        self.medical_history = medical_history
        self.allergies = allergies

    @staticmethod
    def get_by_email(email):
        return db.users.find_one({'email': email})

    @staticmethod
    def get_by_id(user_id):
        return db.users.find_one({'_id': user_id})

@login_manager.user_loader
def load_user(user_id):
    user_data = User.get_by_id(user_id)
    if user_data:
        return User(
            str(user_data['_id']),
            user_data['first_name'],
            user_data['last_name'],
            user_data['email'],
            user_data['password'],
            user_data['date_of_birth'],
            user_data['gender'],
            user_data['contact_number'],
            user_data['medical_history'],
            user_data['allergies']
        )
    return None

# Registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    date_of_birth = data.get('dateOfBirth')
    gender = data.get('gender')
    contact_number = data.get('contactNumber', None)
    medical_history = data.get('medicalHistory', None)
    allergies = data.get('allergies', None)

    hashed_password = generate_password_hash(password, method='sha256')

    # Check if user exists
    if User.get_by_email(email):
        return jsonify({"error": "Email already registered."}), 400

    # Insert user into MongoDB
    db.users.insert_one({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': hashed_password,
        'date_of_birth': date_of_birth,
        'gender': gender,
        'contact_number': contact_number,
        'medical_history': medical_history,
        'allergies': allergies
    })
    return jsonify({"message": "Registration successful!"}), 200

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user_data = User.get_by_email(email)
    if not user_data or not check_password_hash(user_data['password'], password):
        return jsonify({"error": "Invalid credentials."}), 400

    user = User(
        str(user_data['_id']),
        user_data['first_name'],
        user_data['last_name'],
        user_data['email'],
        user_data['password'],
        user_data['date_of_birth'],
        user_data['gender'],
        user_data['contact_number'],
        user_data['medical_history'],
        user_data['allergies']
    )
    login_user(user)
    return jsonify({"message": "Login successful!"}), 200

# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return 'Logged out successfully!'

# Symptom Checker API using ChatCompletion
@app.route('/check-symptoms', methods=['POST'])
@login_required
def check_symptoms():
    data = request.form
    symptoms = data.get('symptoms')

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a medical assistant."},
                {"role": "user", "content": f"The user reports the following symptoms: {symptoms}. Provide possible causes and advice."}
            ],
            max_tokens=300
        )
        advice = response.choices[0].message['content']

        # Save the symptom log to MongoDB, associated with the current user
        log = {
            'user_id': current_user.id,
            'symptoms': symptoms,
            'advice': advice,
            'date_logged': datetime.utcnow()
        }
        db.symptom_logs.insert_one(log)

        return jsonify({"advice": advice})
    except Exception as e:
        return jsonify({"error": str(e)})

# View logs route
@app.route('/view-logs', methods=['GET'])
@login_required
def view_logs():
    logs = db.symptom_logs.find({'user_id': current_user.id})
    return jsonify([{"symptoms": log['symptoms'], "advice": log['advice'], "date": log['date_logged']} for log in logs])

if __name__ == "__main__":
    app.run(debug=True)
