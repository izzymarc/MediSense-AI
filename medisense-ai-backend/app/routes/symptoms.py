from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.extensions import mongo

bp = Blueprint('symptoms', __name__, url_prefix='/api')

@bp.route('/check-symptoms', methods=['POST'])
@login_required
def check_symptoms():
    data = request.json
    symptoms = data.get('symptoms')
    # Interact with OpenAI or save to MongoDB
    return jsonify({"advice": "Sample advice based on symptoms"})