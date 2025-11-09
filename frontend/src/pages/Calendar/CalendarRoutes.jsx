import { Route, Routes } from "react-router-dom"
import StudentSchedule from "./CalendarPage";

export const CalendarRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentSchedule/>}/>
        </Routes>
    )
}