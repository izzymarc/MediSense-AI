from flask import Blueprint, jsonify
from flask_login import login_required, current_user

bp = Blueprint('dashboard', __name__, url_prefix='/api/user')

@bp.route('/dashboard', methods=['GET'])
@login_required
def get_dashboard_data():
    # Retrieve dashboard data
    response = {
        "firstName": current_user.first_name,
        "lastName": current_user.last_name,
        "popularSymptomsCount": 0,
        "totalDiagnoses": 0,
        "symptomImprovement": 72
    }
    return jsonify(response)