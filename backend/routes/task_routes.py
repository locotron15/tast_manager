from flask import Blueprint
from controllers import (
    get_tasks, 
    create_task, 
    update_task, 
    delete_task, 
    get_task_by_id
)


task_bp = Blueprint('task_bp', __name__)

#Endpoint para obtener todas las tareas
@task_bp.route('/api/tasks', methods=['GET'])
def list_tasks():
    return get_tasks()

#Endpoint para crear una tarea
@task_bp.route('/api/tasks', methods=['POST'])
def add_task():
    return create_task()

#Endpoint para obtener una tarea por id
@task_bp.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    return get_task_by_id(task_id)

#Endpoint para actualizar una tarea
@task_bp.route('/api/tasks/<int:task_id>', methods=['PATCH'])
def patch_task(task_id):
    return update_task(task_id)

#Endpoint para eliminar una tarea
@task_bp.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def remove_task(task_id):
    return delete_task(task_id)
