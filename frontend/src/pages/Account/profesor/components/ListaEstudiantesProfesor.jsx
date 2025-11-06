import React, { useState } from "react";

export const ListaEstudiantesProfesor = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10;

  // Datos de ejemplo
  const datos = Array.from({ length: 53 }, (_, i) => ({
    nombre: `Estudiante ${i + 1}`,
    matricula: `201${i + 1}`,
    nota: `${i + 50}`
  }));

  // Calcular indices de las filas que se muestran
  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const indiceFinal = indiceInicio + filasPorPagina;
  const filasVisibles = datos.slice(indiceInicio, indiceFinal);

  // Calcular total de paginas
  const totalPaginas = Math.ceil(datos.length / filasPorPagina);

  return (
    <div>
      {/* Boton que abre el modal */}
      <button
        onClick={() => setMostrarModal(true)}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Mostrar tabla
      </button>

      {/* Modal */}
      {mostrarModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setMostrarModal(false);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "500px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>Tabla de Estudiantes</h2>

            {/* Tabla */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Nombre
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Matricula
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Nota
                  </th>
                </tr>
              </thead>
              <tbody>
                {filasVisibles.map((fila, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {fila.nombre}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {fila.matricula}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {fila.nota}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginacion */}
            <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "5px" }}>
              <button
                onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
                disabled={paginaActual === 1}
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: paginaActual === 1 ? "not-allowed" : "pointer",
                }}
              >
                &lt;
              </button>

              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPaginaActual(i + 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor:
                      paginaActual === i + 1 ? "#007bff" : "white",
                    color: paginaActual === i + 1 ? "white" : "black",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setPaginaActual((p) => Math.min(p + 1, totalPaginas))
                }
                disabled={paginaActual === totalPaginas}
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor:
                    paginaActual === totalPaginas ? "not-allowed" : "pointer",
                }}
              >
            &gt;
              </button>
            </div>

            {/* Boton cerrar */}
            <button
              onClick={() => setMostrarModal(false)}
              style={{
                marginTop: "15px",
                padding: "8px 15px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
