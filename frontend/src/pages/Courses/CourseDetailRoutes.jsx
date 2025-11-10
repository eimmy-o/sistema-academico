import { useState } from "react";
import { CoursesHome } from "./CoursesHome"
import  Grades  from "./components/Grades/Grades"
import { AttendancePage } from "./components/attendance/AttendancePage"
import { AssignmentsPage } from "./components/assignments/AssignmentsPage"
import  AnnouncementsPage  from "./components/announcements/AnnouncementsPage"
import { Users } from "./components/users/Users"
import { CoursesNavBar } from "./CoursesNavBar"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { TareasPage } from "./components/Tareas/TareasPage";

export const CourseDetailRoutes = () => {
    const [activeTab, setActiveTab] = useState('home');

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <CoursesHome />; 
            case 'evaluations':
                return <AssignmentsPage />;
            case 'grades':
                return <Grades />;
            case 'attendance':
                return <AttendancePage />;
            case 'people':
                return <Users />;
            case 'assignements':
                return <TareasPage />;
            case 'announcements':
                return <AnnouncementsPage />;
            default:
                return <CoursesHome />;
        }
    };

    return (
        <Box sx={{padding: {xs: 0, md: '2rem 1.5rem'}, width: '100%'}}>
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
