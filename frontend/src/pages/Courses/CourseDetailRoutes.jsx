import { Route, Routes } from "react-router-dom"
import { CoursesHome } from "./pages/CoursesHome"
import { Grades } from "./components/Grades/Grades"
import { AttendancePage } from "./components/attendance/AttendancePage"
import { AssessmentPage } from "./components/assessments/AssessmentPage"
import { Users } from "./components/users/Users"
import { CoursesNavBar } from "./CoursesNavBar"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react"

export const CourseDetailRoutes = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    return (
        <Box sx={{padding: {xs: 0, md: '2rem 1.5rem'}, width: '100%'}}>
            {isMobile ? 
                <IconButton onClick={() => setIsMenuClicked(!isMenuClicked)}>
                    <MenuIcon/> 
                </IconButton> : 
                <>
                    <CoursesNavBar />
                    <hr style={{marginInline: '.5rem'}}/>
                </>
            }
            {isMenuClicked && isMobile && <CoursesNavBar flexDirection="column" isMobile={isMobile}/>}
            <Routes>
                <Route path="/" element={<CoursesHome />}/>
                <Route path="/grades" element={<Grades />}/>
                <Route path="/attendance" element={<AttendancePage />}/>
                <Route path="/assessments" element={<AssessmentPage />}/>
                <Route path="/users" element={<Users />}/>
            </Routes>
        </Box>
    )
}
