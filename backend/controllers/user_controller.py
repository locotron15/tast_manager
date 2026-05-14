from flask import jsonify, request
from model import db, User

def get_all_users():
    usuarios = User.query.all()
    return jsonify([u.to_dict() for u in usuarios]), 200

def create_new_user():
    datos = request.json
    if not datos or 'name' not in datos or 'email' not in datos:
        return jsonify({"error": "Faltan datos"}), 400
    
    try:
        nuevo_usuario = User(name=datos['name'], email=datos['email'])
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify(nuevo_usuario.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Usuario eliminado correctamente"}), 200

def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.to_dict()), 200

def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    datos = request.json
    if not datos:
        return jsonify({"error": "No hay datos para actualizar"}), 400
    
    # Actualizamos solo si los campos vienen en el JSON
    if 'name' in datos: user.name = datos['name']
    if 'email' in datos: user.email = datos['email']
    
    try:
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

    
