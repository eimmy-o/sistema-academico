DROP DATABASE IF EXISTS academico;
CREATE DATABASE academico;
USE academico;

CREATE TABLE permiso(
    id_permiso_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL, -- 'Estudiante', 'Profesor', 'Administrador'
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo'
);

CREATE TABLE usuario(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_permiso_usuario INT,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    telefono VARCHAR(14) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM ('Masculino', 'Femenino'),
    tipo_documento ENUM ('Cedula', 'RUC', 'Pasaporte'),
    num_documento VARCHAR(20),
    estado_civil ENUM ('Soltero', 'Casado', 'Divorciado', 'Viudo'),
    ciudad VARCHAR (20),
    provincia VARCHAR(20),
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_permiso_usuario) REFERENCES permiso(id_permiso_usuario) ON DELETE CASCADE
);

CREATE TABLE tipo_estudiante(
    id_tipo_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(40) NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo'
);

CREATE TABLE estudiante(
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(10) NOT NULL,
    id_usuario INT,
    id_tipo_estudiante INT NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tipo_estudiante) REFERENCES tipo_estudiante(id_tipo_estudiante) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE docente(
    id_docente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE materia(
    id_materia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_materia VARCHAR(25) NOT NULL,
    codigo_materia VARCHAR(8) NOT NULL,
    creditos INT NOT NULL,
    requisitos VARCHAR(50),
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo'
);

CREATE TABLE docente_materia(
    id_docente INT,
    id_materia INT,
    PRIMARY KEY(id_docente, id_materia),
    FOREIGN KEY (id_docente) REFERENCES docente(id_docente) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materia(id_materia) ON DELETE CASCADE
);

CREATE TABLE periodo_academico(
    id_periodo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo'
);

CREATE TABLE aula(
    id_aula INT AUTO_INCREMENT PRIMARY KEY,
    codigo_aula VARCHAR(10) NOT NULL,
    capacidad INT NOT NULL,
    edificio VARCHAR(50),
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo'
);

CREATE TABLE curso(
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    id_docente INT,
    id_materia INT,
    nombre_curso VARCHAR(40) NOT NULL,
    paralelo VARCHAR(20) NOT NULL,
    codigo VARCHAR(8) NOT NULL,
    id_periodo INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_docente) REFERENCES docente(id_docente) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materia(id_materia) ON DELETE CASCADE,
    FOREIGN KEY (id_periodo) REFERENCES periodo_academico(id_periodo) ON DELETE CASCADE
);

CREATE TABLE curso_estudiante(
    id_curso INT, 
    id_estudiante INT,
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id_curso, id_estudiante),
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante) ON DELETE CASCADE
);

CREATE TABLE horario(
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT NOT NULL,
    id_aula INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo',
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE,
    FOREIGN KEY (id_aula) REFERENCES aula(id_aula) ON DELETE CASCADE
);

CREATE TABLE evaluacion(
    id_evaluacion INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT NOT NULL,
    tipo_evaluacion ENUM ('examen', 'parcial', 'tarea'),
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_evaluacion DATE NOT NULL,
    nota_maxima DECIMAL(5,2) DEFAULT 10.00,
    ponderacion DECIMAL(5,2) NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Eliminado') DEFAULT 'Activo',
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE
);

CREATE TABLE nota_evaluacion(
    id_nota INT AUTO_INCREMENT PRIMARY KEY,
    id_evaluacion INT NOT NULL,
    id_estudiante INT NOT NULL,
    nota DECIMAL(5,2) NOT NULL,
    fecha_entrega DATETIME,
    observacion TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_evaluacion) REFERENCES evaluacion(id_evaluacion) ON DELETE CASCADE,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante) ON DELETE CASCADE,
    UNIQUE KEY unique_estudiante_evaluacion (id_evaluacion, id_estudiante)
);

CREATE TABLE asistencia(
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_curso INT NOT NULL,
    fecha DATE NOT NULL,
    estado ENUM('Presente', 'Ausente', 'Tardanza', 'Justificado') NOT NULL,
    observacion VARCHAR(200),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante) ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE
);