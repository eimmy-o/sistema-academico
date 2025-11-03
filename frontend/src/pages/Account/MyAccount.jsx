import { EstNavBar_comp } from "./estudiante/EstNavBar_comp";
import { InformacionGeneral } from "./InformacionGeneral";
import { ProfNavBar } from "./profesor/ProfNavBar_comp";


import "./styles/StyleAccount.css"
import { useState } from "react";

export const MyAccount = () => {
  const [rol, setRol] = useState("estudiante");
  return (
    <div className="account-page-container">
      
      <div className="selector-rol">
      <p htmlFor="rol" className="etiqueta">
        Selecciona un rol:
      </p>

      <select
        id="rol"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
        className="combo"
      >
        <option value="estudiante">Estudiante</option>
        <option value="profesor">Profesor</option>
      </select>

      
    </div>
      

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

      <div className="contenido">
        {rol === "estudiante" ? <EstNavBar_comp /> : <ProfNavBar/>}
      </div>

      </div>
  )
}
