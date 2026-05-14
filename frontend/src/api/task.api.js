const API_URL = "http://127.0.0.1:5000/api";

// TAREAS
export const getTasks = async (filters = {}) => {
    // Construimos la URL con filtros si los hay (ej: ?status=pendiente)
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/tasks?${query}`);
    return await response.json();
};

export const createTask = async (taskData) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
    });
    return await response.json();
};

export const updateTask = async (taskId, data) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const deleteTask = async (taskId) => {
    await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
};

// USUARIOS
export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
};

export const createNewUser = async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error("Error en petición");
    return await response.json();
};

export const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error("Error en petición");
    return await response.json();
};
