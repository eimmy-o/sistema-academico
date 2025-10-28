import { EstudianteInfo } from "./EstudianteInfo"

export const MyAccount = () => {
  return (
    <div className="account-page-container">
      <h1>banneeeeeer</h1>

      <div className="account-page-contents">

        
        <div class="tabla-info">
  <div class="perfil-info">
    <table class="tabla-perfil">
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
  </div>

  <div class="perfil-foto">
    <img src="tu_imagen.jpg" alt="Foto de perfil" />
  </div>
</div>


        <EstudianteInfo />
      </div>


    </div>
  )
}
