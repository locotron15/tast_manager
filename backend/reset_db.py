from app import create_app
from model import db

#Borra todo y crea de nuevo
app = create_app()
with app.app_context():
    print("Borrando tablas antiguas...")
    db.drop_all()
    print("Creando tablas nuevas con todas las columnas...")
    db.create_all()
    print("¡Listo! Base de datos reiniciada.")
