from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import  Permiso, Usuario, TipoEstudiante, Estudiante
from .serializers import UsuarioSerializer, TipoEstudianteSerializer, EstudianteSerializer, PermisoSerializer

# ==========================================
# CRUD: PERMISOS (opcionales para pruebas)
# ==========================================
class PermisoViewSet(viewsets.ModelViewSet):
    queryset = Permiso.objects.all()
    serializer_class = PermisoSerializer


# ==========================================
# CRUD: USUARIOS (opcionales para pruebas)
# ==========================================
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# ==========================================
# CRUD: TIPOS DE ESTUDIANTE
# ==========================================
class TipoEstudianteViewSet(viewsets.ModelViewSet):
    queryset = TipoEstudiante.objects.all()
    serializer_class = TipoEstudianteSerializer


# ==========================================
# CRUD: ESTUDIANTES (principal)
# ==========================================
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

    # 🔹 Opcional: filtrar solo los activos
    def get_queryset(self):
        return Estudiante.objects.filter(estado='Activo')

    # 🔹 Sobrescribir eliminación (desactivar en lugar de borrar)
    def destroy(self, request, *args, **kwargs):
        estudiante = self.get_object()
        estudiante.estado = 'Inactivo'
        estudiante.save()
        return Response({'mensaje': 'Estudiante desactivado correctamente'}, status=status.HTTP_200_OK)
