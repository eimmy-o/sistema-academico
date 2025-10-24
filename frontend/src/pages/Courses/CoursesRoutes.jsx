import { Route, Routes } from "react-router-dom"
import { CoursesHome } from "./CoursesHome"
import { Grades } from "./components/Grades/Grades"
import { AttendancePage } from "./components/attendance/AttendancePage"
import { AssessmentPage } from "./components/assessments/AssessmentPage"
import { Users } from "./components/users/Users"

export const CoursesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CoursesHome />}/>
            <Route path="/grades" element={<Grades />}/>
            <Route path="/attendance" element={<AttendancePage />}/>
            <Route path="/assessments" element={<AssessmentPage />}/>
            <Route path="/users" element={<Users />}/>
        </Routes>
    )
}
