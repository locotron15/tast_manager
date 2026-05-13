# 🧪 Prueba Técnica — Programador Junior Full Stack

> **Tiempo estimado:** 3-4 horas
> **Stack:** React + Flask + SQLAlchemy + PostgreSQL
> **Entrega:** Subir a un repositorio Git público y enviarnos el link.

---

## 👋 Bienvenido

Gracias por dedicar tiempo a esta prueba. El objetivo **no** es ver si puedes construir algo perfecto — es ver **cómo piensas, codeas y estructuras un proyecto pequeño**.

Te dejamos un esqueleto tanto del backend como del frontend. Tu trabajo es completarlo hasta tener un gestor de tareas funcional.

> ⚠️ **Sé honesto contigo mismo.** Si no logras terminar todo, está bien — trabajo parcial con código limpio vale más que trabajo completo pero desordenado. Documenta lo que no terminaste y por qué.

---

## 📦 Qué vas a construir

Un **Gestor de Tareas** simple con usuarios y tareas. Un usuario puede tener muchas tareas; una tarea pertenece a un solo usuario.

### Entidades principales

**User (Usuario)**
- `id` (int, PK)
- `name` (string, obligatorio)
- `email` (string, obligatorio, único)
- `created_at` (timestamp)

**Task (Tarea)**
- `id` (int, PK)
- `title` (string, obligatorio)
- `description` (text, opcional)
- `status` (enum: `pending`, `in_progress`, `done`) — por defecto `pending`
- `priority` (enum: `low`, `medium`, `high`) — por defecto `medium`
- `user_id` (FK → User, obligatorio)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## ✅ Funcionalidades obligatorias

### Backend (Flask + SQLAlchemy + PostgreSQL)

Construir una API REST con los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/users` | Listar todos los usuarios |
| `POST` | `/api/users` | Crear un usuario |
| `GET` | `/api/tasks` | Listar todas las tareas (con filtros — ver abajo) |
| `POST` | `/api/tasks` | Crear una tarea |
| `GET` | `/api/tasks/<id>` | Obtener una tarea con la info de su usuario |
| `PATCH` | `/api/tasks/<id>` | Actualizar una tarea (cualquier campo) |
| `DELETE` | `/api/tasks/<id>` | Eliminar una tarea |

**Filtros en `GET /api/tasks` (query params):**
- `?status=pending` — filtrar por estado
- `?priority=high` — filtrar por prioridad
- `?user_id=3` — filtrar por usuario
- Los filtros deben poder combinarse (ej. `?status=pending&priority=high`)

**Requisitos de validación:**
- Los campos obligatorios deben validarse (devolver `400` con mensaje de error claro)
- Los valores de enum inválidos deben rechazarse
- IDs inexistentes devuelven `404`
- Emails duplicados devuelven `409`

**Formato de respuesta:** Todas las respuestas deben ser JSON. Los errores deben seguir esta forma:
```json
{ "error": "mensaje describiendo qué salió mal" }
```

### Frontend (React)

Construir una single-page app con las siguientes vistas y componentes:

#### 1. Lista de tareas (vista principal)

Mostrar todas las tareas en una lista o grid. Cada tarea debe mostrar:

| Campo | Comportamiento |
|---|---|
| Título | Texto plano |
| Descripción | Truncar si es muy larga (ej. mostrar primeras 100 chars + "...") |
| Estado | Badge/píldora con color distinto por estado (ej. amarillo `pending`, azul `in_progress`, verde `done`) |
| Prioridad | Indicador visual (color, ícono o texto) |
| Usuario asignado | Nombre del usuario (no solo el ID) |
| Fecha de creación | Formato legible (ej. "13/05/2026" o "hace 3 días") |
| Acciones | Botones de cambiar estado y eliminar |

**Comportamiento:**
- Si no hay tareas, mostrar un mensaje vacío (ej. "No hay tareas todavía. Crea la primera.").
- Si la API tarda más de ~300ms, mostrar un spinner o skeleton.
- Si la API falla, mostrar el mensaje de error con un botón de "Reintentar".

#### 2. Formulario para crear tarea

Puede ser un modal, una sección colapsable o un componente inline — tu decides.

**Campos:**
- `title` — input de texto, **obligatorio**, mínimo 3 caracteres.
- `description` — textarea, opcional.
- `priority` — select con `low` / `medium` / `high`, default `medium`.
- `user_id` — dropdown poblado desde `GET /api/users`.

**Validaciones en el cliente (antes de mandar el POST):**
- Botón "Crear" deshabilitado si `title` está vacío o no se eligió usuario.
- Mostrar mensajes de error junto al campo correspondiente (no en un alert).

**Después de crear:**
- Limpiar el formulario.
- Agregar la nueva tarea a la lista sin recargar.
- Si el backend devuelve error (ej. 400 o 409), mostrarlo al usuario.

#### 3. Cambio de estado inline

Desde la lista, el usuario debe poder cambiar el estado de una tarea sin abrir otra pantalla. Acepta cualquiera de estos diseños:

- Un `<select>` que dispare `PATCH` al cambiar.
- Tres botones (uno por estado) que actualicen al hacer click.
- Un menú contextual con las opciones.

**Comportamiento:**
- Mientras la request está en vuelo, el control debe estar deshabilitado o mostrar feedback visual.
- Si falla, revertir al estado anterior y mostrar el error.

#### 4. Eliminar tarea

- Botón visible en cada tarea (ej. ícono de basura).
- **Confirmación obligatoria** antes de borrar — puede ser un `confirm()` nativo, un modal o un patrón "click dos veces para confirmar".
- Tras confirmar, sacarla de la lista sin recargar la página.

#### 5. Filtros

Al menos **un** filtro funcional sobre la lista. Recomendado: filtrar por estado con tres tabs/pills (`Todas` / `Pendientes` / `Completadas`) o un dropdown.

- El filtro debe traducirse a un query param al API (ej. `GET /api/tasks?status=pending`), **no** filtrar solo en el cliente.
- Cambiar de filtro no debe romper la lista (mostrar loading apropiado).

#### Requisitos generales de UX

- **Loading states:** spinner, skeleton o texto "Cargando…" en cualquier operación async.
- **Estados vacíos:** mensaje claro cuando no hay datos.
- **Manejo de errores:** nada de `console.log` para errores que el usuario debería ver; usar UI visible.
- **Sin recargas:** ninguna acción debe forzar un `window.location.reload()` ni recargar la página.
- **Responsive básico:** que se vea decente en una pantalla de laptop (no hace falta optimizar para mobile).
- **Accesibilidad mínima:** labels en los inputs, botones con texto descriptivo (no solo íconos sin `aria-label`).

#### Estructura del proyecto (sugerida, no obligatoria)

```
frontend/src/
├── App.jsx              # componente raíz
├── components/          # componentes reutilizables (TaskList, TaskForm, etc.)
├── hooks/               # custom hooks si decides usarlos (ej. useTasks)
├── api/                 # wrapper para llamadas al backend
└── utils/               # helpers de formato, validaciones, etc.
```

Si decides poner todo en `App.jsx`, **explica por qué** en tu README. No hay una respuesta correcta, pero queremos ver tu criterio.

---

## 🎁 Bonus (opcional, solo si te sobra tiempo)

Estos **no** son obligatorios. Elige el que más te interese:

- [ ] **Paginación** en `GET /api/tasks` (ej. `?page=1&limit=20`).
- [ ] **Ordenamiento** en `GET /api/tasks` (ej. `?sort=priority&order=desc`).
- [ ] **Autenticación básica** — endpoint de login con JWT, proteger los endpoints de tareas.
- [ ] **Tests unitarios** para al menos un endpoint (pytest) o un componente (React Testing Library).
- [ ] **Docker** — `docker-compose.yml` que levante backend + Postgres.
- [ ] **Updates optimistas de UI** al cambiar el estado de una tarea.

---

## 🚀 Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate     # En Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configura tu conexión a la BD en .env (copia .env.example)
cp .env.example .env

# Crear las tablas
flask --app app db-init

# Correr el servidor
flask --app app run --debug
```

El API estará en `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app estará en `http://localhost:5173`.

---

## 📋 Qué vamos a evaluar

| Área | Qué buscamos |
|---|---|
| **Calidad del código** | Nombres claros, estructura sensata, sin código muerto. |
| **Diseño del API** | Verbos HTTP correctos, status codes, forma del JSON, manejo de errores. |
| **Modelado de la BD** | Relaciones apropiadas, foreign keys, tipos de columnas sensatos. |
| **Skills de React** | Estructura de componentes, manejo de estado, sin anti-patterns obvios. |
| **Higiene de Git** | Varios commits con sentido, no un único commit gigante de "versión final". |
| **README actualizado** | Documentas cómo correr TU versión, qué hiciste, qué dejaste fuera. |

---

## 📝 Checklist de entrega

Antes de entregar, asegúrate de:

- [ ] El repo es **público** y el link funciona.
- [ ] Tienes una **sección en el README llamada "Notas del candidato"** explicando:
  - Qué terminaste.
  - Qué dejaste fuera y por qué.
  - Algo que harías diferente con más tiempo.
- [ ] Tus **commits no están todos aplastados en uno solo** — queremos ver tu proceso de pensamiento.
- [ ] Los archivos sensibles (ej. `.env` con credenciales reales) **no están subidos** al repo.
- [ ] La app **realmente corre** desde un clone limpio siguiendo tu README.

---

## ❓ Preguntas para responder en tu README

Al final de tu README, por favor responde estas brevemente (2-4 oraciones cada una):

1. **¿Por qué estructuraste el backend de esa manera?** (carpetas, archivos, blueprints, etc.)
2. **¿Cómo escalarías esto a 1 millón de tareas?** ¿Qué cambiarías?
3. **¿Qué es una cosa en tu código con la que no estás contento, pero no tuviste tiempo de arreglar?**
4. **Si tuvieras que agregar autenticación, ¿por dónde empezarías?**

---

## 🤝 Reglas

- **Puedes usar Google, Stack Overflow y documentación.** Así es como funciona el trabajo real.
- **Puedes usar asistentes de IA (Copilot, ChatGPT, Claude)** pero tienes que entender cada línea que entregues — te vamos a pedir que la expliques.
- **No copies un proyecto completo de un tutorial.** Nos vamos a dar cuenta.
- **Si te atascas, documenta lo que intentaste.** Valoramos más la resolución de problemas que la completitud.

---

¡Mucho éxito! 🚀

Cuando termines, envíanos el link del repo más una estimación de cuántas horas realmente le dedicaste.
