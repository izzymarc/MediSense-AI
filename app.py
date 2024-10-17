
from flask import Flask, request, jsonify, render_template, redirect, url_for
import openai
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# Set your OpenAI API key
openai.api_key = "sk-5xxwqXgKUhZOkTfPXUMw_KrgoecbbPVlDjDaSYzeWyT3BlbkFJogs4WniBbj5kM0eTlxZNuCaxPUXhHoAQFoheL1QEgA"

app = Flask(__name__)
app.config['SECRET_KEY'] = 'yoursecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///symptom_logs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Set up Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Symptom Log Model
class SymptomLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    symptoms = db.Column(db.String(500), nullable=False)
    advice = db.Column(db.String(1000), nullable=False)
    date_logged = db.Column(db.DateTime, default=datetime.utcnow)

# Create the database
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

# Registration route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        hashed_password = generate_password_hash(password, method='sha256')

        # Check if user exists
        user = User.query.filter_by(email=email).first()
        if user:
            return 'Email already registered.'

        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return 'Registration successful! Please log in.'

    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return 'Invalid credentials. Please try again.'

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

        # Save the symptom log to the database, associated with the current user
        log = SymptomLog(user_id=current_user.id, symptoms=symptoms, advice=advice)
        db.session.add(log)
        db.session.commit()

        return jsonify({"advice": advice})
    except Exception as e:
        return jsonify({"error": str(e)})

# View logs route
@app.route('/view-logs', methods=['GET'])
@login_required
def view_logs():
    logs = SymptomLog.query.filter_by(user_id=current_user.id).all()
    return jsonify([{"symptoms": log.symptoms, "advice": log.advice, "date": log.date_logged} for log in logs])

if __name__ == "__main__":
    app.run(debug=True)
