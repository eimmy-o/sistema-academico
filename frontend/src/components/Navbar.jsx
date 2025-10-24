import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useState } from "react";

const getMainMenuItems = () => [
  {
    text: 'username',
    icon: <PersonIcon style={{ width: 18 }}/>
  },
  {
    text: 'Calendario',
    icon: <CalendarMonthIcon style={{ width: 18 }}/>,
    path: '/calendar'
  }, 
  {
    text: 'Dashboard',
    icon: <DashboardIcon style={{ width: 18 }}/>,
    path: '/dashboard'
  },
  {
    text: 'Courses',
    icon: <LibraryBooksIcon style={{ width: 18 }}/>,
    path: '/courses'
  }
]

export const Navbar = () => {
  const [mainMenuItems, setMainMenuItems] = useState(getMainMenuItems())
  const drawerWidth = 220;

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#4A90E2',
            color: "#FFF"
          }
        }}
      >
        <List sx={{ mt: 1 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color: '#FFF', minWidth: 40, mr: -1}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={  
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '.875rem',
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
      </Drawer>
    </>
  )
}
