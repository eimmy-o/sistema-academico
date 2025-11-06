from datetime import datetime

from rest_framework import serializers
from .models import Usuario, TipoEstudiante, Estudiante, Permiso



class PermisoSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Permiso.
    Se utiliza para manejar los datos del tipo de permiso
    asociado a un usuario dentro del sistema académico.
    """

    class Meta:
        model = Permiso
        fields = [
            'id_permiso_usuario',
            'tipo',
            'estado',
        ]

# ==============================
# SERIALIZADOR: USUARIO
# ==============================
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'  # incluir todos los campos de la tabla
        extra_kwargs = {
            'password': {'write_only': True}
        }


# ==============================
# SERIALIZADOR: TIPO DE ESTUDIANTE
# ==============================
class TipoEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstudiante
        fields = '__all__'


# ==============================
# SERIALIZADOR: ESTUDIANTE
# ==============================
class EstudianteSerializer(serializers.ModelSerializer):
    # Relación con otros modelos (para mostrar datos anidados)
    usuario = UsuarioSerializer(read_only=True)
    tipo_estudiante = TipoEstudianteSerializer(read_only=True)

   # llamar a todos los datos anidados (para obtener el nombre, apellido y demas)
    usuario = UsuarioSerializer(read_only=True, source='id_usuario')
    tipo_estudiante = TipoEstudianteSerializer(read_only=True, source='id_tipo_estudiante')  
    # solo por debug cambiarlo luego en el modelo
    estado = serializers.CharField(default='Activo')
    fecha_creacion = serializers.DateTimeField(default=datetime.now)  
    class Meta:
        model = Estudiante
        fields = [
            'id_estudiante',
            'matricula',
            'usuario',
            'tipo_estudiante',
            'id_usuario',
            'id_tipo_estudiante',
            'estado',
            'fecha_creacion',
        ]
    def create(self, validated_data):
        # aqui deben ir las claves id_usuario y id_tipo_estudiante
        usuario = validated_data.pop('id_usuario')
        tipo_estudiante = validated_data.pop('id_tipo_estudiante')
        estudiante = Estudiante.objects.create(
            id_usuario=usuario,
            id_tipo_estudiante=tipo_estudiante,
            **validated_data
        )
        return estudiante
