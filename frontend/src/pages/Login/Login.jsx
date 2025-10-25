import { Button, InputLabel, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    //logica de autenticacion
    navigate("/dashboard");
  }


  return (

    <div className="login-container">
        <div className="welcome">
            <h2 className="welcome-h2">Bienvenido a</h2>
            <h1 className="welcome-h1"> ESPOL </h1>
            <img src="public\Group 26.png" className="image-espol"/>
        </div>
        <div className="login">
          <div className="login-contents">
            <div className="login-form">
            <h2 className="login-title">Iniciar sesión</h2>
            <div className="login-fields">
              <div>
                <InputLabel sx={{
                  textAlign: "initial",
                  color: "#FFF",
                  fontFamily: "'Poppins', sans-serif",
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
                    borderRadius: ".5rem",
                    "& .MuiInputBase-input": {
                      padding: ".625rem .75rem"
                    }
                  }}
                />
              </div>
              <div>
                <InputLabel sx={{
                  textAlign: "initial",
                  color: "#FFF",
                  fontFamily: "'Poppins', sans-serif",
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
                    borderRadius: ".5rem",
                    "& .MuiInputBase-input": {
                      padding: ".625rem .75rem",
                    },
                  }}
                />
              </div>
            </div>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.125rem",
                mt: "1rem",
                bgcolor: "#495057",
                padding: ".375rem 1rem",
                borderRadius: ".5rem",
                color:"#E9ECEF",
                fontWeight:600,
                textTransform: "none",
              }}
            >
              Iniciar Sesión
            </Button>
          </div>
          <p className="password-forgot">
            ¿Olvidaste tu contraseña?
          </p>
          </div>
          
        </div>
    </div>
  )
}
