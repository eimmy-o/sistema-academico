import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstudiantesPage from "./pages/EstudiantesPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiantes" element={<EstudiantesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
