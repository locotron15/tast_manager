from .base import db
from .user import User
from .task import Task, EstadoTarea, PrioridadTarea

#Exporta todo lo necesario para poder usarlo en otros archivos
#esto hace que cuando importemos algo desde model, podamos usar directamente db, User, Task, etc.
