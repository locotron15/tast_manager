from flask import Blueprint
from controllers import (
    get_all_users, 
    create_new_user, 
    delete_user, 
    get_user_by_id, 
    update_user
)


user_bp = Blueprint('user_bp', __name__)

#Endpoint para obtener todos los usuarios
@user_bp.route('/api/users', methods=['GET'])
def get_users():
    return get_all_users()

#Endpoint para crear un usuario
@user_bp.route('/api/users', methods=['POST'])
def create_user():
    return create_new_user()

#Endpoint para eliminar un usuario
@user_bp.route('/api/users/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
    return delete_user(user_id)

#Endpoint para obtener un usuario por id
@user_bp.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return get_user_by_id(user_id)

#Endpoint para actualizar un usuario
@user_bp.route('/api/users/<int:user_id>', methods=['PATCH'])
def patch_user(user_id):
    return update_user(user_id)
