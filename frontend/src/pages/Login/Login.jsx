import { Button, InputLabel, TextField } from "@mui/material"

export const Login = () => {
  return (
    <div className="login-container">
        <div className="welcome">
            <h2 className="welcome-h2">Bienvenido a</h2>
            <h1 className="welcome-h1"> ESPOL </h1>
            <img src="public\Group 26.png" className="image-espol"/>
        </div>
        <div className="login">
          <div className="login-form">
            <h2>Iniciar sesión</h2>
            <div className="login-fields">
              <div>
                <InputLabel sx={{
                  textAlign: "initial",
                  color: "#FFF",
                  fontFamily: "'Poopins', sans-serif",
                  fontWeight: 600
                }}> 
                  Correo 
                </InputLabel>
                <TextField 
                  placeholder="Correo" 
                  fullWidth
                  sx={{
                    border: "none",
                    bgcolor: "#FFF",
                    borderRadius: ".5rem"
                  }}
                />
              </div>
              <div>
                <InputLabel sx={{
                  textAlign: "initial",
                  color: "#FFF",
                  fontFamily: "'Poopins', sans-serif",
                  fontWeight: 600,
                }}> 
                  Contraseña
                </InputLabel>
                <TextField 
                  placeholder="Ingrese su contraseña" 
                  fullWidth
                  sx={{
                    border: "none",
                    bgcolor: "#FFF",
                    borderRadius: ".5rem"
                  }}
                />
              </div>
            </div>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: "1rem",
                bgcolor: "#495057",
                padding: ".7rem 1rem",
                borderRadius: ".5rem",
                color:"#E9ECEF",
                fontWeight:600
              }}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
    </div>
  )
}
