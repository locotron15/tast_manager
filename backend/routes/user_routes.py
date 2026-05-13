from flask import Blueprint, jsonify, request
from model.models import db, User

# Definimos el Blueprint
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({"message": "Aquí verás la lista de usuarios próximamente"})
