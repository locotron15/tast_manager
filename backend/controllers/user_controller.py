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
