import React from 'react';

// Recibimos "tasks" como un prop desde el padre (App.jsx)
const TaskList = ({ tasks, onDelete }) => {
  return (
    <div className="task-list">
      <h2>Lista de Tareas</h2>
      
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes. ¡Buen trabajo!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.user}</td>
                <td>
                   {/* Le ponemos un colorcito según el estado */}
                  <span className={`badge status-${task.status}`}>
                    {task.status}
                  </span>
                </td>
                <td>{task.priority}</td>
                <td>
                  <button onClick={() => console.log("Editar", task.id)}>✏️</button>
                  <button onClick={() => onDelete(task.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
