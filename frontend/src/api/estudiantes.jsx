import api from "./axios";

// Obtener lista de estudiantes
export const getEstudiantes = () => api.get("estudiantes/");

// Crear nuevo estudiante
export const createEstudiante = (data) => api.post("estudiantes/", data);

// Actualizar estudiante
export const updateEstudiante = (id, data) =>
  api.put(`estudiantes/${id}/`, data);

// Eliminar estudiante
export const deleteEstudiante = (id) => api.delete(`estudiantes/${id}/`);
