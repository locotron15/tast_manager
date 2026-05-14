import { useEffect, useState } from 'react'
import { getTasks, getUsers, deleteTask, updateTask, createNewUser, deleteUser } from './api/task.api'
import { Plus, Search, UserPlus, Filter, LayoutDashboard, Sun, Moon, Trash2 } from 'lucide-react'
import TaskForm from './components/taskform'
import TaskList from './components/tasklist'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showUserForm, setShowUserForm] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [userFormError, setUserFormError] = useState('')
  const [appError, setAppError] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null)

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  const loadInitialData = async () => {
    setLoading(true)
    setAppError('')
    try {
      const filters = statusFilter ? { status: statusFilter } : {}
      const [tasksData, usersData] = await Promise.all([getTasks(filters), getUsers()])
      setTasks(tasksData)
      setUsers(usersData)
    } catch (err) {
      setAppError("Error al cargar los datos. Revisa la conexión al servidor.")
    }
    setLoading(false)
  }

  useEffect(() => { loadInitialData() }, [statusFilter])

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completada' ? 'pendiente' : 'completada'
      await updateTask(task.id, { status: newStatus })
      loadInitialData()
    } catch (error) {
      console.error("Error al actualizar tarea:", error)
      setAppError("No se pudo actualizar el estado de la tarea.")
    }
  }

  const handleEdit = async (id, updates) => {
    try {
      await updateTask(id, updates)
      loadInitialData()
    } catch (error) {
      console.error("Error al editar tarea:", error)
      setAppError("No se pudo editar la tarea.")
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      loadInitialData()
    } catch (error) {
      console.error("Error al eliminar tarea:", error)
      setAppError("No se pudo eliminar la tarea.")
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    if (!newUserName.trim() || !newUserEmail.trim()) {
      setUserFormError("Por favor completa todos los campos")
      return
    }
    setUserFormError('')
    try {
      await createNewUser({ name: newUserName, email: newUserEmail })
      setNewUserName('')
      setNewUserEmail('')
      setShowUserForm(false)
      loadInitialData()
    } catch (error) {
      console.error("Error al crear usuario:", error)
      setUserFormError("No se pudo crear. Verifica que el email no esté en uso.")
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id)
      setConfirmDeleteUserId(null)
      loadInitialData()
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
      setUserFormError("No se pudo eliminar el usuario. Intenta nuevamente.")
    }
  }

  return (
    <div className="app-shell">

      {/* ══ SIDEBAR ══ */}
      <aside className="sidebar-light hidden md:flex flex-col overflow-y-auto shrink-0">

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <LayoutDashboard size={16} />
          </div>
          <span className="sidebar-logo-name">Tasks.io</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Cambiar modo"
            className="sidebar-logo-toggle"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex-1 px-3 py-5 space-y-6">

          {/* Filtro */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-2 px-2 flex items-center gap-1.5">
              <Filter size={10} /> Gestión
            </p>
            <select
              className="w-full px-3 py-2 text-sm rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">⏳ Pendientes</option>
              <option value="en_progreso">🚀 En Progreso</option>
              <option value="completada">✅ Completadas</option>
            </select>
          </div>

          {/* Team */}
          <div>
            <div className="flex items-center justify-between mb-2 px-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <UserPlus size={10} /> Team
              </p>
              <button
                onClick={() => setShowUserForm(!showUserForm)}
                className="btn-push w-5 h-5 flex items-center justify-center rounded bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>

            {showUserForm && (
              <form onSubmit={handleCreateUser} className="mb-3 p-3 card space-y-2 animate-in">
                <input
                  required
                  placeholder="Nombre"
                  className="w-full px-3 py-2 text-xs"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 text-xs"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!newUserName.trim() || !newUserEmail.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  Crear
                </button>
              </form>
            )}
            
            {userFormError && <p className="text-red-500 text-xs px-2 mb-3">{userFormError}</p>}

            <ul className="space-y-0.5">
              {users.map(u => (
                <li
                  key={u.id}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-default group"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="user-name">{u.name}</p>
                    <p className="user-email">{u.email}</p>
                  </div>
                  <button
                    onClick={() => confirmDeleteUserId === u.id ? handleDeleteUser(u.id) : setConfirmDeleteUserId(u.id)}
                    onMouseLeave={() => setConfirmDeleteUserId(null)}
                    title="Eliminar usuario"
                    className={`p-1.5 rounded-lg transition-all text-[10px] font-bold tracking-wide ${
                      confirmDeleteUserId === u.id 
                        ? 'bg-red-500 text-white opacity-100 hover:bg-red-600' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {confirmDeleteUserId === u.id ? '¿Seguro?' : <Trash2 size={13} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* Header */}
        <header className="app-header px-8 py-3 flex items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="search-icon absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar tarea..."
              className="w-full pl-9 pr-4 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-gray-400 dark:text-zinc-500 hidden sm:block">
              {filteredTasks.length} tareas
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <TaskForm onTaskCreated={loadInitialData} users={users} />

            {appError && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 flex items-center justify-between">
                <span className="text-sm font-medium">{appError}</span>
                <button onClick={loadInitialData} className="text-xs underline font-bold">Reintentar</button>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-7 h-7 border-[3px] border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
              />
            )}
          </div>
        </main>

      </div>
    </div>
  )
}