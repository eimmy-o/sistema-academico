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
        # Si deseas ocultar el password, puedes hacerlo así:
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

    # Si quieres permitir crear/actualizar estudiante con ID de usuario y tipo:
    id_usuario = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='usuario', write_only=True
    )
    id_tipo_estudiante = serializers.PrimaryKeyRelatedField(
        queryset=TipoEstudiante.objects.all(), source='tipo_estudiante', write_only=True
    )

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
        usuario = validated_data.pop('usuario')
        tipo_estudiante = validated_data.pop('tipo_estudiante')
        estudiante = Estudiante.objects.create(
            id_usuario=usuario,
            id_tipo_estudiante=tipo_estudiante,
            **validated_data
        )
        return estudiante
