from flask import Blueprint
from controllers.task_controller import get_tasks, create_task, update_task, delete_task

task_bp = Blueprint('task_bp', __name__)

# Rutas para la colección (todas las tareas)
@task_bp.route('/api/tasks', methods=['GET'])
def list_tasks():
    return get_tasks()

@task_bp.route('/api/tasks', methods=['POST'])
def add_task():
    return create_task()

# Rutas para una tarea específica
@task_bp.route('/api/tasks/<int:task_id>', methods=['PATCH'])
def patch_task(task_id):
    return update_task(task_id)

@task_bp.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def remove_task(task_id):
    return delete_task(task_id)
