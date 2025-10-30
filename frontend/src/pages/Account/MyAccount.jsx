import { EstudianteInfo } from "./EstudianteInfo"
import "./styles/StyleAccount.css"

export const MyAccount = () => {
  return (
    <div className="account-page-container">
      
      

      <div className="usuario-info-basica">
        <div className="foto-usuario">
          <img src="public/gato_guerra.jpg"></img>
        </div>
        <div className = "usuario-nombre">
          <h1>Juan Perez</h1>
          <h2>Tipo usuario</h2> 
          <h3> Becado </h3>
        </div>
        <div className="opciones-usuario">
          <button>Editar Perfil</button>

          {/*Este boton debe de cambiar segun el tipo de usuario*/}
          <button>Cambiar estado</button>
        </div>
      </div>
        <nav className="barra-navegacion">
          <ul className="lista-navegacion">
          <li>
            <a href="#" className="link-navegacion"> informacion basica</a>
          </li>
          <li> 
            <a href="#" className="link-navegacion"> calificaciones</a>
          </li>
          <li >
            <a href="#" className="link-navegacion"> horario</a>
          </li>
          </ul>
        </nav>

        
      <div class="contenedor-info">
        <table class="tabla-info">
          <h3>
            Informacion Basica
          </h3>
        <tr>
          <th>Apellidos:</th>
          <td>Delgado Cañarte</td>
        </tr>
        <tr>
          <th>Nombre:</th>
          <td>Cesar Johan</td>
        </tr>
        <tr>
          <th>Telefono:</th>
          <td>09888989416</td>
        </tr>
        <tr>
          <th>Genero:</th>
          <td>Masculino</td>
        </tr>
        <tr>
          <th>Direccion:</th>
          <td>Mucho lote</td>
        </tr>
        <tr>
          <th>Fecha de nacimiento:</th>
          <td>18/08/2000</td>
        </tr>
        <tr>
          <th>Cedula:</th>
          <td>130569994413</td>
        </tr>
        <tr>
          <th>Ciudad:</th>
          <td>Guayaquil</td>
        </tr>
        <tr>
          <th>Provincia:</th>
          <td>Guayas</td>
        </tr>
        </table>
      
        <div className="info-especifica">
          <EstudianteInfo />
        </div>
        </div>
      </div>
  )
}
