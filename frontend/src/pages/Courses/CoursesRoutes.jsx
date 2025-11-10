import { Route, Routes } from "react-router-dom"
import { Course } from "./Course"
import { CourseDetailRoutes } from "./CourseDetailRoutes";
import { Box, useMediaQuery } from "@mui/material"; 
import { useState } from "react";


export const CoursesRoutes = () => {
    return (
      <Box sx={{ padding: { xs: 0, md: "2rem 1.5rem" }, width: "100%" }}>
        <Routes>
          <Route path="/" element={<Course />}/>
          <Route path="pages/*" element={<CourseDetailRoutes />} />
        </Routes>
      </Box>
    )
}
