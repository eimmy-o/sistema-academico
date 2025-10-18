from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PermisoViewSet,
    UsuarioViewSet,
    TipoEstudianteViewSet,
    EstudianteViewSet,
)

router = DefaultRouter()
router.register(r'permisos', PermisoViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tipos-estudiantes', TipoEstudianteViewSet)
router.register(r'estudiantes', EstudianteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
