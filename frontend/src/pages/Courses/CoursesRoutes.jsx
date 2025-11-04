import { Route, Routes } from "react-router-dom"
import { CoursesHome } from "./CoursesHome"
import { Grades } from "./components/Grades/Grades"
import { AttendancePage } from "./components/attendance/AttendancePage"
import { AssessmentPage } from "./components/assessments/AssessmentPage"
import { Users } from "./components/users/Users"
import { CoursesNavBar } from "./CoursesNavBar"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react"
import { Course } from "./Course"

export const CoursesRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Course />}/>
            </Routes>
        )
}
