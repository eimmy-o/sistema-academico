import { Button, InputLabel, TextField } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { MessageError } from "../../components/tooltips/MessageError";

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserData((prev) => ({...prev, [name]: value}))
  }

  const validateFields = () => {
    let newErrors = {}
    Object.keys(userData).map((key) => {
      if (userData[key] === "" || userData[key] === null || userData[key] === "undefined") {
        newErrors[key] = "Este campo es obligatorio"
      } else if (key === "email" && !/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData[key])) {
        newErrors[key] = "El correo electrónico no es válido"
      }   
    })
    return newErrors
  }
  
  console.log(validateFields());

  const handleLogin = () => {
    let newErrors = validateFields()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return;
    
    setErrors({})
    navigate("/dashboard")
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
              <div style={{position: 'relative'}}>
                <MessageError error={errors.email}/>
                <InputLabel sx={{
                  textAlign: "initial",
                  color: "#FFF",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}> 
                  Correo 
                </InputLabel>
                <TextField 
                  placeholder="Correo" 
                  fullWidth
                  onChange={handleChange}
                  name="email"
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
              <div style={{position: 'relative'}}>
                <MessageError error={errors.password}/>
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
                  name="password"
                  onChange={handleChange}
                  type="password"
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
