import React, { useMemo, useState } from "react";
import "./styles/EstudiantesList.css";
import "./styles/mainStyles.css";

function EstudiantesList({ estudiantes = [], eliminarEstudiante }) {
  if (!Array.isArray(estudiantes)) {
    console.error("Error: 'estudiantes' no es un array:", estudiantes);
    return (
      <div className="lista-container">
        <p className="mensaje-error">⚠ Error al cargar la lista de estudiantes.</p>
      </div>
    );
  }

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState({ key: "matricula", dir: "asc" }); // asc | desc
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Helpers para acceder seguro a campos anidados
  const pick = (est, path) => {
    try {
      return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), est);
    } catch {
      return undefined;
    }
  };

  // Normaliza texto para búsquedas
  const norm = (v) =>
    (v ?? "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  // Filtro por query: busca en matrícula, nombre, apellido, tipo, correo
  const filtered = useMemo(() => {
    if (!query.trim()) return estudiantes;
    const q = norm(query);
    return estudiantes.filter((e) => {
      const campos = [
        e.matricula,
        pick(e, "usuario.nombre"),
        pick(e, "usuario.apellido"),
        pick(e, "usuario.correo"),
        pick(e, "tipo_estudiante.descripcion"),
      ];
      return campos.some((c) => norm(c).includes(q));
    });
  }, [estudiantes, query]);

  // Ordenamiento
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { key, dir } = sortBy;

    const getValue = (e) => {
      switch (key) {
        case "matricula": return e.matricula ?? "";
        case "nombre": return pick(e, "usuario.nombre") ?? "";
        case "apellido": return pick(e, "usuario.apellido") ?? "";
        case "correo": return pick(e, "usuario.correo") ?? "";
        case "tipo": return pick(e, "tipo_estudiante.descripcion") ?? "";
        default: return "";
      }
    };

    arr.sort((a, b) => {
      const va = norm(getValue(a));
      const vb = norm(getValue(b));
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [filtered, sortBy]);

  // Paginación
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sorted.slice(start, end);

  // Cambiar orden al clickear encabezado
  const toggleSort = (key) => {
    setPage(1);
    setSortBy((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  const SortIcon = ({ colKey }) => {
    if (sortBy.key !== colKey) return <span className="sort-icon">↕</span>;
    return <span className="sort-icon">{sortBy.dir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="lista-container">
      <div className="toolbar">
        <h2>Lista de Estudiantes</h2>

        <div className="toolbar-right">
          <input
            className="input-buscar"
            type="search"
            placeholder="Buscar por nombre, matricula, tipo..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />

          <label className="rows-select">
            <span>Filas:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
      </div>

      {estudiantes.length === 0 ? (
        <p className="mensaje-vacio">No hay estudiantes registrados.</p>
      ) : (
        <>
          <div className="tabla-wrapper">
            <table className="tabla-estudiantes">
              <thead>
                <tr>
                  <th onClick={() => toggleSort("matricula")} role="button">
                    Matrícula <SortIcon colKey="matricula" />
                  </th>
                  <th onClick={() => toggleSort("nombre")} role="button">
                    Nombre <SortIcon colKey="nombre" />
                  </th>
                  <th onClick={() => toggleSort("apellido")} role="button">
                    Apellido <SortIcon colKey="apellido" />
                  </th>
                  <th onClick={() => toggleSort("tipo")} role="button">
                    Tipo de estudiante <SortIcon colKey="tipo" />
                  </th>
                  <th onClick={() => toggleSort("correo")} role="button">
                    Correo <SortIcon colKey="correo" />
                  </th>
                  <th style={{ width: 120 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((est) => {
                  const usuario = est.usuario || {};
                  const tipo = est.tipo_estudiante || {};
                  return (
                    <tr key={est.id_estudiante || est.id}>
                      <td>{est.matricula || "—"}</td>
                      <td>{usuario.nombre || "—"}</td>
                      <td>{usuario.apellido || "—"}</td>
                      <td>{tipo.descripcion || "—"}</td>
                      <td>{usuario.correo || "—"}</td>
                      <td>
                        <button
                          className="btn-eliminar"
                          onClick={() =>
                            eliminarEstudiante &&
                            eliminarEstudiante(est.id_estudiante || est.id)
                          }
                          aria-label={`Eliminar ${usuario.nombre || "estudiante"}`}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 16 }}>
                      Sin resultados para “{query}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="paginacion">
            <button
              className="btn-page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              « Anterior
            </button>
            <span className="page-info">
              Página {currentPage} de {totalPages} · {total} registros
            </span>
            <button
              className="btn-page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente »
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EstudiantesList;
