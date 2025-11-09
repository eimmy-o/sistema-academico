import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useState } from 'react';

const coursesNavOptions = [
  {
    text: 'Inicio',
    tabName: 'home' 
  },
  {
    text: 'Evaluaciones',
    tabName: 'evaluations' 
  },
  {
    text: 'Calificaciones',
    tabName: 'grades',
  },
  {
    text: 'Asistencia',
    tabName: 'attendance'
  },
  {
    text: 'Personas',
    tabName: 'people'
  }
]

export const CoursesNavBar = ({flexDirection = 'row', isMobile, onTabChange, activeTab}) => {

  const [isAttendanceVisible, setIsAttendanceVisible] = useState(false); 
  
  const filteredNavOptions = coursesNavOptions.filter(item => {

    if (item.tabName !== 'attendance') {
      return true;
    }

    return isAttendanceVisible;
  });

  return (
    <div>

      <button className="switch"
          onClick={() => setIsAttendanceVisible(!isAttendanceVisible)}
          style={{ 
              backgroundColor: isAttendanceVisible ? '#f0f0f0' : '#624185', 
              color: isAttendanceVisible ? '#624185' : 'white'
          }}
      >
          Switch to {isAttendanceVisible ? 'Student' : 'Professor'} view
      </button>

      <List 
        sx={{
          display: 'flex', 
          gap: 3, 
          width: 'fit-content', 
          padding: 0, 
          flexDirection: flexDirection ,
          boxShadow: isMobile ? '0px 2px 8px rgba(0,0,0,0.4)' : '0,0,0,0', 
        }}>

        {filteredNavOptions.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton 
            onClick={() => onTabChange(item.tabName)} 
            sx={{
              padding: '0 0.5rem',
              backgroundColor: item.tabName === activeTab ? 'rgba(98, 65, 133, 0.1)' : 'transparent',
              '&:hover': {
                  backgroundColor: item.tabName === activeTab ? 'rgba(98, 65, 133, 0.15)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    color: item.tabName === activeTab ? '#624185' : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {item.text}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        ))}
      </List>
    </div>
  )
}
