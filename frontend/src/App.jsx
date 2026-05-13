/**
 * Componente principal App.
 *
 * Qué tienes que construir (ver README para el spec completo):
 *   1. Fetch y mostrar la lista de tareas.
 *   2. Un formulario para crear una nueva tarea (con dropdown de usuarios).
 *   3. Cambio de estado inline (PATCH).
 *   4. Eliminar con confirmación.
 *   5. Al menos un filtro (ej. por estado).
 *
 * Cómo estructuras esto depende de ti:
 *   - Un archivo o varios componentes — tu decides.
 *   - CSS plano, módulos, Tailwind — tu decides.
 *   - Custom hooks, context, useReducer — tu decides.
 *
 * Qué vamos a mirar:
 *   - Descomposición de componentes (o por qué decidiste dejarlo en un archivo).
 *   - Manejo de estado (sin bugs obvios, sin estado obsoleto, sin re-renders inútiles).
 *   - Estados de loading y error.
 *   - Cómo llamas al API (wrapper de fetch? inline? — ambos están bien si están bien hechos).
 */

import { useEffect, useState } from 'react'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO: Hacer fetch de las tareas desde /api/tasks al montar.
    //   - Manejar correctamente el estado de loading.
    //   - Manejar errores (falla de red, respuestas no-2xx).
    setLoading(false)
  }, [])

  return (
    <div className="container">
      <h1>📋 Gestor de Tareas</h1>
      <p style={{ color: '#666' }}>
        Este es tu punto de partida. Reemplaza este contenido con la UI descrita en el README.
      </p>

      {/* TODO: Construir la lista de tareas */}
      {/* TODO: Construir el formulario de crear tarea */}
      {/* TODO: Agregar el filtro */}
      {/* TODO: Agregar cambio de estado inline + eliminar */}

      {loading && <p>Cargando…</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
    </div>
  )
}
