import { Route, Routes} from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { DashboardRoutes } from "../pages/Dashboard/DashboardRoutes";
import { CoursesRoutes } from "../pages/Courses/CoursesRoutes";
import { CalendarRoutes } from "../pages/Calendar/CalendarRoutes";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="dashboard/*" element={<DashboardRoutes />}/> 
            <Route path="courses/*" element={<CoursesRoutes />}/>
            <Route path="calendar/*" element={<CalendarRoutes />}/>
        </Routes>
    )
}
