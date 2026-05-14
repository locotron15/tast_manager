import React, { useState } from 'react';
import { createTask } from '../api/task.api';
import { Send, Tag, User, Sparkles } from 'lucide-react';

const TaskForm = ({ onTaskCreated, users = [] }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [priority, setPriority] = useState('media');
  const [status, setStatus] = useState('pendiente');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !userId) {
      setError("Por favor completa el título y asigna un usuario.");
      return;
    }
    setError('');
    try {
      await createTask({ title, description, user_id: parseInt(userId), priority, status });
      setTitle(''); setDescription(''); setUserId(''); setStatus('pendiente');
      onTaskCreated();
    } catch (err) {
      console.error("Error al crear la tarea:", err);
      setError("Hubo un error al crear la tarea. Revisa tu conexión.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 mb-6 animate-in">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={16} className="text-indigo-500" />
        <h3 className="text-sm font-bold text-gray-700 dark:text-zinc-700 uppercase tracking-widest">Nueva Tarea</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Título */}
        <div className="relative">
          <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="¿Qué hay que hacer?"
            className="w-full pl-9 pr-4 py-2.5 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Asignar */}
        <div className="relative">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="w-full pl-9 pr-4 py-2.5 text-sm appearance-none cursor-pointer"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Asignar a un miembro...</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Descripción */}
        <textarea
          placeholder="Descripción (opcional)..."
          className="flex-1 px-4 py-2.5 text-sm resize-none h-10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Prioridad */}
        <select
          className="px-3 py-2.5 text-xs font-semibold cursor-pointer"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="baja">🟢 Baja</option>
          <option value="media">🟡 Media</option>
          <option value="alta">🔴 Alta</option>
        </select>

        {/* Estado */}
        <select
          className="px-3 py-2.5 text-xs font-semibold cursor-pointer"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pendiente">⏳ Pendiente</option>
          <option value="en_progreso">🚀 En Progreso</option>
          <option value="completada">✅ Completada</option>
        </select>

        {/* Guardar */}
        <button
          type="submit"
          disabled={!title.trim() || !userId}
          className="btn-active flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <span>Guardar</span>
          <Send size={15} />
        </button>
      </div>
      
      {error && <p className="text-red-500 text-xs mt-3 font-medium">{error}</p>}
    </form>
  );
};

export default TaskForm;
