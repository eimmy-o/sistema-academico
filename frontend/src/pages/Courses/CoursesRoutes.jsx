import { Route, Routes } from "react-router-dom"
import { CoursesHome } from "./CoursesHome"
import { Grades } from "./components/grades/Grades"
import { AttendancePage } from "./components/attendance/AttendancePage"
import { Users } from "./components/users/Users"
import { CoursesNavBar } from "./CoursesNavBar"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { AssignmentsPage } from "./components/assignments/AssignmentsPage"
import  AnnouncementsPage  from "./components/announcements/AnnouncementsPage"

export const CoursesRoutes = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  return (
    <Box sx={{ padding: { xs: 0, md: "2rem 1.5rem" }, width: "100%" }}>
      {isMobile ? (
        <IconButton onClick={() => setIsMenuClicked(!isMenuClicked)}>
          <MenuIcon />
        </IconButton>
      ) : (
        <>
          <CoursesNavBar />
          <hr style={{ marginInline: ".5rem" }} />
        </>
      )}
      {isMenuClicked && isMobile && (
        <CoursesNavBar flexDirection="column" isMobile={isMobile} />
      )}

      <Routes>
        <Route path="/" element={<CoursesHome />} />
        <Route path="/grades" element={<Grades />} />
        {/* Nota: asterisco para subrutas de asistencia */}
        <Route path="/attendance/*" element={<AttendancePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
      </Routes>
    </Box>
  )
}
