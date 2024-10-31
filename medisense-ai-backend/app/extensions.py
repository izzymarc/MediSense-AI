from flask_pymongo import PyMongo
from flask_login import LoginManager
from flask_cors import CORS

# Initialize extensions
mongo = PyMongo()  # Manages MongoDB connection
login_manager = LoginManager()  # Manages user session and login
cors = CORS()  # Manages Cross-Origin Resource Sharing (CORS) settings

# Configuration for LoginManager (if needed)
login_manager.login_view = 'auth.login'  # Redirects to login route if user is not logged in
login_manager.login_message = "Please log in to access this page."
login_manager.session_protection = "strong"  # Enhances session protection
