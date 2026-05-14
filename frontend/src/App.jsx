import { useEffect, useState } from 'react'
import { getTasks,deleteTask } from './api/task.api' 
import TaskList from './components/tasklist' 
import TaskForm from './components/taskform' 

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const handleDelete = async (id) => {
  if (window.confirm("¿Estás seguro de borrar esta tarea?")) {
    await deleteTask(id)
    fetchTasks() // Recargamos la lista
  }
}

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks() 
      setTasks(data)
    } catch (err) {
      setError("Error al cargar tareas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="container">
      <h1>📋 Gestor de Tareas</h1>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  )
}
