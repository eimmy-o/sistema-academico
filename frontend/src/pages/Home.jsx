import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Sistema Académico</h1>
      <p style={styles.subtitle}>
        Bienvenido al sistema de gestión académica.  
        Selecciona un módulo para comenzar.
      </p>

      <div style={styles.links}>
        <Link to="/estudiantes" style={styles.linkButton}>
          Módulo de Estudiantes
        </Link>
        <Link to="/docentes" style={styles.linkButton}>
          Módulo de Docentes
        </Link>
        <Link to="/materias" style={styles.linkButton}>
          Módulo de Materias
        </Link>
        <Link to="/prueba" style={styles.linkButton}>
          Módulo de pruebas
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "5rem",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    color: "#2c3e50",
  },
  subtitle: {
    color: "#555",
    fontSize: "1.2rem",
  },
  links: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
  },
  linkButton: {
    textDecoration: "none",
    backgroundColor: "#3498db",
    color: "white",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "background 0.2s",
  },
};

export default Home;
