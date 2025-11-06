import { Route, Routes} from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { DashboardRoutes } from "../pages/Dashboard/DashboardRoutes";
import { CoursesRoutes } from "../pages/Courses/CoursesRoutes";
import { CalendarRoutes } from "../pages/Calendar/CalendarRoutes";
import { MyAccount } from "../pages/Account/MyAccount";
import { EstudiantesPage } from "../pages/Account/estudiante/EstudiantesPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="account/*" element={<MyAccount />} />
            <Route path="dashboard/*" element={<DashboardRoutes />}/> 
            <Route path="courses/*" element={<CoursesRoutes />}/>
            <Route path="calendar/*" element={<CalendarRoutes />}/>
            <Route path="estudiante/*" element={<EstudiantesPage />} />
        </Routes>
    )
}
