import { Route, Routes } from "react-router-dom"
import { Course } from "./Course"
import { CourseDetailRoutes } from "./CourseDetailRoutes";

export const CoursesRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Course />}/>
                <Route path="pages/*" element={<CourseDetailRoutes />} />
                <Route path="components/*" element={<CourseDetailRoutes />} />
            </Routes>
        )
}
