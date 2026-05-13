"""
Modelos de SQLAlchemy.

Define User y Task acá. No olvides:
  - Foreign key de Task hacia User.
  - El relationship() para que puedas hacer user.tasks y task.user.
  - Tipos de columnas y constraints apropiados (unique, nullable, defaults).
  - Métodos to_dict() (o usar una librería de serialización) — tu decides.
"""

from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# ──────────────────────────────────────────────────────────────
# TODO: Definir el modelo User.
#
# Columnas esperadas:
#   - id (int, PK)
#   - name (string, obligatorio)
#   - email (string, obligatorio, único)
#   - created_at (timestamp, default = now)
#
# Agregar relationship hacia tasks (un usuario, muchas tareas).
# ──────────────────────────────────────────────────────────────

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    # TODO: completar el resto

    def to_dict(self):
        # TODO: implementar
        raise NotImplementedError("Candidato: implementar to_dict")


# ──────────────────────────────────────────────────────────────
# TODO: Definir el modelo Task.
#
# Columnas esperadas:
#   - id (int, PK)
#   - title (string, obligatorio)
#   - description (text, opcional)
#   - status (enum: pending / in_progress / done)
#   - priority (enum: low / medium / high)
#   - user_id (FK → users.id, obligatorio)
#   - created_at, updated_at (timestamps)
#
# Bonus: piensa cómo mantener updated_at... actualizado.
# ──────────────────────────────────────────────────────────────

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    # TODO: completar el resto

    def to_dict(self):
        # TODO: implementar — decide si incluir info anidada del usuario.
        raise NotImplementedError("Candidato: implementar to_dict")
