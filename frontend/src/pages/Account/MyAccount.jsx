import { EstudianteInfo } from "./estudiante/EstudianteInfo"
import { HistorialAcademico } from "./estudiante/HistorialAcademico";
import { InformacionGeneral } from "./InformacionGeneral"
import "./styles/StyleAccount.css"
import { useState } from "react";

export const MyAccount = () => {
  const [activo, setActivo] = useState("personales");
  return (
    <div className="account-page-container">
      
      

      <div className="usuario-info-basica">
        <div className="foto-usuario">
          <img src="/gato_guerra.jpg"></img>
        </div>
        <div className = "usuario-nombre">
          <h1>Juan Perez</h1>
          <h2>Tipo usuario</h2> 
          <h3> Becado </h3>
        </div>
        <div className="opciones-usuario">
          <button className = "boton-opcion">Editar Perfil</button>

          {/*Este boton debe de cambiar segun el tipo de usuario*/}
          <button className = "boton-opcion">Cambiar estado</button>
        </div>
      </div>

      <div className="barra-navegacion">
        <div className="opciones">
          <button
            className={activo === "informacion-basica" ? "opcion-slc" : "opcion"}
            onClick={() => setActivo("informacion-basica")}
          >
            Datos personales
          </button>
          <button
            className={activo === "historial-academico" ? "opcion-slc" : "opcion"}
            onClick={() => setActivo("historial-academico")}
          >
            Datos académicos
          </button>
          <button
            className={activo === "calificaciones" ? "opcion-slc" : "opcion"}
            onClick={() => setActivo("calificaciones")}
          >
            Cursos inscritos
          </button>
          <button
            className={activo === "horarios" ? "opcion-slc" : "opcion"}
            onClick={() => setActivo("horarios")}
          >
            Actividad
          </button>
        </div>

      </div>

        
      <div class="contenedor-cambia">
        {activo === "informacion-basica" && 
          <div className="contenedor-info"> 
            <div className="info-basica">
              <InformacionGeneral />
            </div>
      
            <div className="info-especifica">
              <EstudianteInfo />
            </div>
          </div>
        }
        
        {activo === "historial-academico" &&
        <div className="contenedor-info">
          <HistorialAcademico/>
        </div>
        }
        
        {activo === "calificaciones" && 
        <p>Contenido de cursos inscritos</p>}
        
        {activo === "horarios" && 
        <p>Contenido de actividad</p>}
      
        
        </div>
      </div>
  )
}
