// EstudiantesPage.jsx
import { useEffect, useState } from "react";

import { EstNavBar } from "./components/EstNavBar";
import ThemeToggle from "./components/ThemeToggle";

export const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  return (
    
    <div className="page-container">
        <ThemeToggle></ThemeToggle>
        <EstNavBar></EstNavBar>

    </div>
  );
};  

