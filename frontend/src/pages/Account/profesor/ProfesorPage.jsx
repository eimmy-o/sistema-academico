// ProfesorPage.jsx
import { useEffect, useState } from "react";

import { ProfNavBar } from "./components/ProfNavBar";
import ThemeToggle from "../components_general/ThemeToggle";

export const ProfesorPage = () => {
  const [profesores, setProfesores] = useState([]);
  return (
    
    <div className="page-container">
        <ThemeToggle></ThemeToggle>
        <ProfNavBar></ProfNavBar>

    </div>
  );
};  