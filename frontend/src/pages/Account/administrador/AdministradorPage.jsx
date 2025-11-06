import React from 'react'
import { useEffect, useState } from "react";
import ThemeToggle from "../estudiante/components/ThemeToggle";
import { AdminNavBar } from './components/AdminNavBar';
export const AdministradorPage = () => {
    const [administradores, setAdministradores] = useState([]);
  return (
      
      <div className="page-container">
          <ThemeToggle></ThemeToggle>
          <AdminNavBar></AdminNavBar>
  
      </div>
    );
};
