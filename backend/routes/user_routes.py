from flask import Blueprint
from controllers.user_controller import get_all_users, create_new_user

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/api/users', methods=['GET'])
def get_users():
    return get_all_users()

@user_bp.route('/api/users', methods=['POST'])
def create_user():
    return create_new_user()
