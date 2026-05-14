from flask import jsonify, request
from model import db, Task, User

def get_tasks():
    # Obtenemos parámetros de búsqueda (filtros) si los hay
    # Ej: /api/tasks?status=pendiente&user_id=1
    user_id = request.args.get('user_id')
    status = request.args.get('status')
    priority = request.args.get('priority')

    query = Task.query

    # filtros dinámicos
    if user_id:
        query = query.filter_by(user_id=user_id)
    if status:
        query = query.filter_by(status=status)
    if priority:
        query = query.filter_by(priority=priority)

    tasks = query.all()
    return jsonify([t.to_dict() for t in tasks]), 200

def create_task():
    datos = request.json
    # El título y el user_id son obligatorios
    if not datos or 'title' not in datos or 'user_id' not in datos:
        return jsonify({"error": "Faltan datos obligatorios (title, user_id)"}), 400

    try:
        nueva_tarea = Task(
            title=datos['title'],
            description=datos.get('description'), # .get es seguro si no viene
            user_id=datos['user_id'],
            status=datos.get('status', 'pendiente'),
            priority=datos.get('priority', 'media')
        )
        db.session.add(nueva_tarea)
        db.session.commit()
        return jsonify(nueva_tarea.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

def update_task(task_id):
    tarea = Task.query.get(task_id)
    if not tarea:
        return jsonify({"error": "Tarea no encontrada"}), 404
    
    datos = request.json
    if not datos:
        return jsonify({"error": "No hay datos para actualizar"}), 400
    
    # Actualizamos solo los campos que vengan en el JSON
    if 'title' in datos: tarea.title = datos['title']
    if 'description' in datos: tarea.description = datos['description']
    if 'status' in datos: tarea.status = datos['status']
    if 'priority' in datos: tarea.priority = datos['priority']
    
    db.session.commit()
    return jsonify(tarea.to_dict()), 200

def delete_task(task_id):
    tarea = Task.query.get(task_id)
    if not tarea:
        return jsonify({"error": "Tarea no encontrada"}), 404
    
    db.session.delete(tarea)
    db.session.commit()
    return jsonify({"message": "Tarea eliminada correctamente"}), 200
