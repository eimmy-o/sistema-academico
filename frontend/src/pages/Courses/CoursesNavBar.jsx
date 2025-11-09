import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"

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
    text: 'Anuncios',
    path: '/courses/announcements'
  },
  {
    text: 'Actividades',
    path: '/courses/assignments'
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
  
  return (
    <div>
      <h1>Programacion basica</h1>
      <List 
        sx={{
          display: 'flex', 
          gap: 3, 
          // Ajusté el ancho a 'fit-content' para mejor flexibilidad. Puedes dejar '32rem' si lo prefieres.
          width: 'fit-content', 
          padding: 0, 
          flexDirection: flexDirection ,
          boxShadow: isMobile ? '0px 2px 8px rgba(0,0,0,0.4)' : '0,0,0,0', 
        }}>
        {coursesNavOptions.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton 
            // ⬅️ Al hacer click, llamamos a la función del padre y le pasamos el nombre de la pestaña
            onClick={() => onTabChange(item.tabName)} 
            sx={{
              padding: '0 0.5rem',
              // ⬅️ Opcional: Estilo visual para saber en qué pestaña estamos
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
                    // ⬅️ Opcional: Cambiamos el color si está activa
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
