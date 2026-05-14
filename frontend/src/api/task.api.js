//URL base de nuestro servidor Flask
//esto hace que todas las peticiones sean mas limpias

const API_URL = "http://127.0.0.1:5000/api";

//obtiene todas las tareas
export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    return await response.json();
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
};

//crea una nueva tarea
export const createTask = async (taskData) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
    return await response.json();
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
    });
    return await response.json();
};
