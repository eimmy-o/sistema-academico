import api from "./axios";

// Obtener todos los estudiantes
export const getEstudiantes = () => api.get("/estudiantes/");

// Crear un nuevo estudiante
export const createEstudiante = (data) => api.post("/estudiantes/", data);

// Eliminar estudiante
export const deleteEstudiante = (id) => api.delete(`/estudiantes/${id}/`);
