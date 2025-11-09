import { Route, Routes} from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { DashboardRoutes } from "../pages/Dashboard/DashboardRoutes";
import { CoursesRoutes } from "../pages/Courses/CoursesRoutes";
import { CalendarRoutes } from "../pages/Calendar/CalendarRoutes";
import { EstudiantesPage } from "../pages/Account/estudiante/EstudiantesPage";
import { AdministradorPage } from "../pages/Account/administrador/AdministradorPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="account/*" element={<EstudiantesPage />} />
            <Route path="dashboard/*" element={<DashboardRoutes />}/> 
            <Route path="courses/*" element={<CoursesRoutes />}/>
            <Route path="calendar/*" element={<CalendarRoutes />}/>
            <Route path="administrador/*" element={<AdministradorPage/>}/>
        </Routes>
    )
}
