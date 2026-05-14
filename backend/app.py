"""
Punto de entrada de la aplicación Flask.

Este archivo es intencionalmente minimal. Puedes refactorizarlo como quieras —
blueprints, factory pattern, archivos separados para rutas/modelos, etc.

Lo que tienes que hacer:
  1. Conectar a PostgreSQL usando SQLAlchemy.
  2. Definir los modelos User y Task en models.py.
  3. Implementar los endpoints listados en el README.
  4. Asegurarte de que los errores devuelvan JSON con status codes apropiados.

Bonus: estructura de carpetas limpia, capa de validación, blueprints, etc.
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from model import db



load_dotenv()

#crea la aplicacion y configura la base de datos
def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)
    
    #importar blueprint 
    from routes.user_routes import user_bp
    app.register_blueprint(user_bp)
    
    from routes.task_routes import task_bp
    app.register_blueprint(task_bp)


    @app.route("/api/health")
    def health():
        """Sanity check — déjalo así, lo usamos para verificar que tu servidor corre."""
        return jsonify({"status": "ok"})
    

    @app.cli.command("db-init")
    def init_db():
        """Crea las tablas en la base de datos."""
        with app.app_context():
            db.create_all()
        print("Tablas creadas correctamente.")


    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
