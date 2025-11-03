import React from 'react'
import { useState } from "react";
import { EstudianteInfo } from "./EstudianteInfo";
import { HistorialAcademico } from "./HistorialAcademicoEstudiante";
import {InformacionGeneral } from "../InformacionGeneral";

export const EstNavBar_comp = () => {
    const [activo, setActivo] = useState("informacion-basica");
  return (
    <div>
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

      <div className="contenedor-cambia">
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
