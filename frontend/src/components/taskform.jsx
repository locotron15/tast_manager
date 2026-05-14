import React, { useState, useEffect } from 'react';
import { getUsers, createTask } from '../api/task.api';

const TaskForm = ({ onTaskCreated }) => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');

  // Cargamos los usuarios para el menú desplegable
  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !userId) return alert("El título y el usuario son obligatorios");

    const newTask = { title, description, user_id: parseInt(userId) };
    await createTask(newTask);
    
    // Limpiamos el formulario
    setTitle('');
    setDescription('');
    setUserId('');
    
    // Le avisamos a App.jsx que refresque la lista de tareas
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Nueva Tarea</h3>
      <input 
        type="text" 
        placeholder="Título de la tarea" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Descripción (opcional)" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Selecciona un usuario</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button type="submit">Guardar Tarea</button>
    </form>
  );
};

export default TaskForm;
