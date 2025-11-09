# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models




class Permiso(models.Model):
    id_permiso_usuario = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=20)
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permiso'
        
class TipoEstudiante(models.Model):
    id_tipo_estudiante = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=40)
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tipo_estudiante'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    correo = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    id_permiso_usuario = models.ForeignKey(Permiso, models.DO_NOTHING, db_column='id_permiso_usuario', blank=True, null=True)
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length=20)
    telefono = models.CharField(max_length=14)
    direccion = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=9, blank=True, null=True)
    tipo_documento = models.CharField(max_length=9, blank=True, null=True)
    num_documento = models.CharField(max_length=20, blank=True, null=True)
    estado_civil = models.CharField(max_length=10, blank=True, null=True)
    ciudad = models.CharField(max_length=20, blank=True, null=True)
    provincia = models.CharField(max_length=20, blank=True, null=True)
    estado = models.CharField(max_length=9, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario'



class Asistencia(models.Model):
    id_asistencia = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')
    id_curso = models.ForeignKey('Curso', models.DO_NOTHING, db_column='id_curso')
    fecha = models.DateField()
    estado = models.CharField(max_length=11)
    observacion = models.CharField(max_length=200, blank=True, null=True)
    fecha_registro = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'asistencia'


class Aula(models.Model):
    id_aula = models.AutoField(primary_key=True)
    codigo_aula = models.CharField(max_length=10)
    capacidad = models.IntegerField()
    edificio = models.CharField(max_length=50, blank=True, null=True)
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aula'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    id_docente = models.ForeignKey('Docente', models.DO_NOTHING, db_column='id_docente', blank=True, null=True)
    id_materia = models.ForeignKey('Materia', models.DO_NOTHING, db_column='id_materia', blank=True, null=True)
    nombre_curso = models.CharField(max_length=40)
    paralelo = models.CharField(max_length=20)
    codigo = models.CharField(max_length=8)
    id_periodo = models.ForeignKey('PeriodoAcademico', models.DO_NOTHING, db_column='id_periodo', blank=True, null=True)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    estado = models.CharField(max_length=9, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'curso'


class CursoEstudiante(models.Model):
    id_curso = models.OneToOneField(Curso, models.DO_NOTHING, db_column='id_curso', primary_key=True)  # The composite primary key (id_curso, id_estudiante) found, that is not supported. The first column is selected.
    id_estudiante = models.ForeignKey('Estudiante', models.DO_NOTHING, db_column='id_estudiante')
    fecha_inscripcion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'curso_estudiante'
        unique_together = (('id_curso', 'id_estudiante'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Docente(models.Model):
    id_docente = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    estado = models.CharField(max_length=9, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'docente'


class DocenteMateria(models.Model):
    id_docente = models.OneToOneField(Docente, models.DO_NOTHING, db_column='id_docente', primary_key=True)  # The composite primary key (id_docente, id_materia) found, that is not supported. The first column is selected.
    id_materia = models.ForeignKey('Materia', models.DO_NOTHING, db_column='id_materia')

    class Meta:
        managed = False
        db_table = 'docente_materia'
        unique_together = (('id_docente', 'id_materia'),)


class Estudiante(models.Model):
    id_estudiante = models.AutoField(primary_key=True)
    matricula = models.CharField(max_length=10)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_tipo_estudiante = models.ForeignKey('TipoEstudiante', models.DO_NOTHING, db_column='id_tipo_estudiante')
    estado = models.CharField(max_length=9, blank=True, null=True)
    fecha_creacion = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estudiante'


class Evaluacion(models.Model):
    id_evaluacion = models.AutoField(primary_key=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')
    tipo_evaluacion = models.CharField(max_length=7, blank=True, null=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    fecha_evaluacion = models.DateField()
    nota_maxima = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    ponderacion = models.DecimalField(max_digits=5, decimal_places=2)
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evaluacion'


class Horario(models.Model):
    id_horario = models.AutoField(primary_key=True)
    id_curso = models.ForeignKey(Curso, models.DO_NOTHING, db_column='id_curso')
    id_aula = models.ForeignKey(Aula, models.DO_NOTHING, db_column='id_aula')
    dia_semana = models.CharField(max_length=9)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'horario'


class Materia(models.Model):
    id_materia = models.AutoField(primary_key=True)
    nombre_materia = models.CharField(max_length=25)
    codigo_materia = models.CharField(max_length=8)
    creditos = models.IntegerField()
    requisitos = models.CharField(max_length=50, blank=True, null=True)
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'materia'


class NotaEvaluacion(models.Model):
    id_nota = models.AutoField(primary_key=True)
    id_evaluacion = models.ForeignKey(Evaluacion, models.DO_NOTHING, db_column='id_evaluacion')
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    nota = models.DecimalField(max_digits=5, decimal_places=2)
    fecha_entrega = models.DateTimeField(blank=True, null=True)
    observacion = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nota_evaluacion'
        unique_together = (('id_evaluacion', 'id_estudiante'),)


class PeriodoAcademico(models.Model):
    id_periodo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'periodo_academico'


