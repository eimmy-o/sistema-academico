import { useState } from "react";
import { CoursesHome } from "./components/home/CoursesHome"
import  Grades  from "./components/Grades/Grades"
import { AttendancePage } from "./components/attendance/AttendancePage"
import { AssessmentPage } from "./components/assessments/AssessmentPage"
import { Users } from "./components/users/Users"
import { CoursesNavBar } from "./CoursesNavBar"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

export const CourseDetailRoutes = () => {
    const [activeTab, setActiveTab] = useState('home');

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <CoursesHome />; // Muestra el contenido de "Inicio"
            case 'evaluations':
                return <AssessmentPage />;
            case 'grades':
                return <Grades />;
            case 'attendance':
                return <AttendancePage />;
            case 'people':
                return <Users />;
            default:
                return <CoursesHome />;
        }
    };

    return (
        <Box sx={{padding: {xs: 0, md: '2rem 1.5rem'}, width: '100%'}}>
            {/* --- LAYOUT DEL NAV BAR --- */}
            {isMobile ? 
                <IconButton onClick={() => setIsMenuClicked(!isMenuClicked)}>
                    <MenuIcon/> 
                </IconButton> : 
                <>
                    <CoursesNavBar 
                        activeTab={activeTab} 
                        onTabChange={setActiveTab} 
                    />
                    <hr style={{marginInline: '.5rem'}}/>
                </>
            }
            {isMenuClicked && isMobile && (
                <CoursesNavBar 
                    flexDirection="column" 
                    isMobile={isMobile} 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            )}
            
            <div className="course-content-area">
                {renderContent()}
            </div>
        </Box>
    )
}
