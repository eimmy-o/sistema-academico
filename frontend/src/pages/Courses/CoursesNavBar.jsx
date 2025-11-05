import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const coursesNavOptions = [
  {
    text: 'Inicio',
    path: 'pages/CoursesHome'
  },
  {
    text: 'Evaluaciones',
    path: 'components/assessments'
  },
  {
    text: 'Calificaciones',
    path: 'components/grades',
  },
  {
    text: 'Asistencia',
    path: 'components/attendance'
  },
  {
    text: 'Personas',
    path: 'components/users'
  }
]

export const CoursesNavBar = ({flexDirection = 'row', isMobile}) => {
  const navigate = useNavigate()
  return (
    <div>
      <List 
        sx={{
          display: 'flex', 
          gap: 3, 
          width: '32rem', 
          padding: 0, 
          flexDirection: flexDirection ,
          boxShadow: isMobile ? '0px 2px 8px rgba(0,0,0,0.4)' : '0,0,0,0', 
        }}>
        {coursesNavOptions.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton 
            onClick={() => navigate(item.path)} 
            sx={{
              padding: '0 0.5rem'
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    color: '#624185',
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
