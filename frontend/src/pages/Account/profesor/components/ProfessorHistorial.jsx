import React from 'react'
import { useState } from "react";
import "../../styles/ProfileStyle.css"

export const ProfessorHistorial = () => {
  // Datos placeholder simulando filas de una base de datos
  const datos = Array.from({ length: 35 }, (_, i) => ({
    ano_termino: `Termino ${i + 1}`,
    codigo: `${i + 1}`,
    materia:`Computacion ${i + 1}`,
    promedio:`8${i + 1}`,
    estado:`A${i + 1}I`
    

  }));

  // Estado de paginacion
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10;

  // Calcular indices para mostrar solo las filas de la pagina actual
  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const indiceFin = indiceInicio + filasPorPagina;
  const filasActuales = datos.slice(indiceInicio, indiceFin);

  // Total de paginas
  const totalPaginas = Math.ceil(datos.length / filasPorPagina);

  // Cambiar pagina
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="card">
      <table className="history-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Año termino</th>
            <th>Codigo</th>
            <th>Materia</th>
            <th>Promedio General</th>
            <th>Estado</th>
            <th>Estudiantes</th>

          </tr>
        </thead>
        <tbody>
          {filasActuales.map((fila) => (
            <tr key={fila.codigo}>
              <td>{fila.ano_termino}</td>
              <td>{fila.codigo}</td>
              <td>{fila.materia}</td>
              <td>{fila.promedio}</td>
              <td>{fila.estado}</td>
              <td>Ver listado</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginacion */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <button className="boton-nav-tabla" onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            &lt;
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {paginaActual} de {totalPaginas}
        </span>

        <button className="boton-nav-tabla" onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          &gt;
        </button>
      </div>
    </div>
  );
}

