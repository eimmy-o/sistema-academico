import "./EstudianteForm.css";

function EstudianteForm() {
  return (
    <div className="form-container">
      <h2>Registrar Estudiante</h2>
      <form>
        <div className="form-group">
          <label>Matrícula:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>ID Usuario:</label>
          <input type="number" />
        </div>

        <div className="form-group">
          <label>ID Tipo Estudiante:</label>
          <input type="number" />
        </div>

        <button className="btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default EstudianteForm;
