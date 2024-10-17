from flask import Flask, request, jsonify, render_template, redirect, url_for
import openai
from pymongo import MongoClient
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
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
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = password

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
        return User(str(user_data['_id']), user_data['email'], user_data['password'])
    return None

# Registration route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        hashed_password = generate_password_hash(password, method='sha256')

        # Check if user exists
        if User.get_by_email(email):
            return 'Email already registered.'

        # Insert user into MongoDB
        db.users.insert_one({'email': email, 'password': hashed_password})
        return 'Registration successful! Please log in.'

    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user_data = User.get_by_email(email)
        if not user_data or not check_password_hash(user_data['password'], password):
            return 'Invalid credentials. Please try again.'

        user = User(str(user_data['_id']), user_data['email'], user_data['password'])
        login_user(user)
        return redirect(url_for('home'))

    return render_template('login.html')

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
        # Using the new ChatCompletion method
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