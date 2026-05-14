import React, { useState } from 'react';
import { Trash2, CheckCircle, Clock, Search, Pencil, X, Check } from 'lucide-react';

const priorityBadge = {
  alta:  { label: 'Alta',  cls: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  media: { label: 'Media', cls: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  baja:  { label: 'Baja',  cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

// ── Componente de edición inline ──
const TaskEditRow = ({ task, onSave, onCancel }) => {
  const [title, setTitle]       = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'media');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), description, priority });
  };

  return (
    <div className="card px-5 py-4 border-indigo-300 dark:border-indigo-700 animate-in">
      <div className="flex flex-col gap-3">
        {/* Título editable */}
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') onCancel(); }}
          className="w-full px-3 py-2 text-sm font-semibold"
          placeholder="Título de la tarea"
        />

        {/* Descripción editable */}
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-sm resize-none h-16"
          placeholder="Descripción (opcional)..."
        />

        {/* Prioridad + acciones */}
        <div className="flex items-center gap-3 justify-between">
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold"
          >
            <option value="baja">🟢 Baja</option>
            <option value="media">🟡 Media</option>
            <option value="alta">🔴 Alta</option>
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="btn-push flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={13} /> Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="btn-push flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed text-white transition-colors"
            >
              <Check size={13} /> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Lista de tareas ──
const TaskList = ({ tasks, onDelete, onToggleStatus, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  if (tasks.length === 0) {
    return (
      <div className="empty-state text-center py-20 animate-in">
        <div className="w-14 h-14 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} className="text-gray-400 dark:text-zinc-500" />
        </div>
        <p className="font-semibold text-gray-600 dark:text-zinc-300">No hay tareas</p>
        <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">Crea una nueva tarea o cambia el filtro.</p>
      </div>
    );
  }

  const handleSave = async (task, updates) => {
    await onEdit(task.id, updates);
    setEditingId(null);
  };

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => {
        const badge = priorityBadge[task.priority] ?? priorityBadge.baja;
        const done  = task.status === 'completada';

        // Modo edición
        if (editingId === task.id) {
          return (
            <TaskEditRow
              key={task.id}
              task={task}
              onSave={(updates) => handleSave(task, updates)}
              onCancel={() => setEditingId(null)}
            />
          );
        }

        // Modo visualización normal
        return (
          <div
            key={task.id}
            style={{ animationDelay: `${index * 0.04}s` }}
            className="card px-5 py-4 flex items-start gap-4 group hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors animate-in"
          >
            {/* Contenido */}
            <div className="flex-1 min-w-0 pl-1">
              <p className={`task-title ${done ? 'done' : ''}`}>{task.title}</p>

              {task.description && (
                <p className="task-meta mt-0.5 line-clamp-2">{task.description}</p>
              )}

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="task-meta flex items-center gap-1">
                  <Clock size={10} /> {task.user} • {new Date(task.created_at).toLocaleDateString()}
                </span>
                
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.cls}`}>
                  {badge.label}
                </span>

                <select
                  value={task.status}
                  onChange={(e) => onEdit(task.id, { status: e.target.value })}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full outline-none cursor-pointer border ${
                    task.status === 'completada' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                    : task.status === 'en_progreso' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                  }`}
                >
                  <option value="pendiente">⏳ Pendiente</option>
                  <option value="en_progreso">🚀 En Progreso</option>
                  <option value="completada">✅ Completada</option>
                </select>
              </div>
            </div>

            {/* Acciones (visibles al hover) */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditingId(task.id)}
                title="Editar tarea"
                className="btn-push p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => confirmDeleteId === task.id ? onDelete(task.id) : setConfirmDeleteId(task.id)}
                onMouseLeave={() => setConfirmDeleteId(null)}
                title="Eliminar tarea"
                className={`btn-push p-1.5 rounded-lg transition-all text-[10px] font-bold tracking-wide ${
                  confirmDeleteId === task.id ? 'bg-red-500 text-white hover:bg-red-600' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                {confirmDeleteId === task.id ? '¿Seguro?' : <Trash2 size={14} />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
