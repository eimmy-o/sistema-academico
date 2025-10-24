import { Route, Routes } from "react-router-dom"
import { CalendarPage } from "./CalendarPage"

export const CalendarRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CalendarPage />}/>
        </Routes>
    )
}