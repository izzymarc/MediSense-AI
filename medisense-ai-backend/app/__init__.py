from flask import Flask
from .config import Config
from .extensions import mongo, login_manager, cors
from .routes import auth, dashboard, symptoms

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    mongo.init_app(app)
    login_manager.init_app(app)
    cors.init_app(app)
    
    # Register blueprints
    app.register_blueprint(auth.bp)
    app.register_blueprint(dashboard.bp)
    app.register_blueprint(symptoms.bp)
    
    return app