import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExitToApp } from "@mui/icons-material";
import { UserProfile } from "./UserProfile";

const getMainMenuItems = () => [
  {
    text: 'Dashboard',
    icon: <DashboardIcon style={{ width: 18 }}/>,
    path: '/dashboard'
  },
  {
    text: 'Cursos',
    icon: <LibraryBooksIcon style={{ width: 18 }}/>,
    path: '/courses'
  },
  {
    text: 'Calendario',
    icon: <CalendarMonthIcon style={{ width: 18 }}/>,
    path: '/calendar'
  },
]

const getBottomMenuItems = () => [
  {
    text: 'Cerrar sesión',
    icon: <ExitToApp />,
    path: '/logout'
  }
]

export const Navbar = () => {
  const [mainMenuItems, setMainMenuItems] = useState(getMainMenuItems())
  const [bottomMenuItems, setBottomMenuItems] = useState(getBottomMenuItems())
  const drawerWidth = 220;
  const navigate = useNavigate();
  const [userName, setUsername] = useState('username')

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
            bgcolor: '#624185',
            color: "#FFF"
          }
        }}
      >

        <UserProfile username={userName}/>

        <List sx={{ mt: 1 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  ml: 2,
                  mr: 2.8,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 3},
                  '& .Mui-selected': { '&:hover': {bgcolor: 'rgba(255,255,255,0.2)'}}
                }} 
              >
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

        <Box sx={{flexGrow: 1}}/>

        <List>
          {bottomMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  ml: 2,
                  mr: 2.8,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 3 },
                  '& .Mui-selected': { '&:hover': {bgcolor: 'rgba(255,255,255,0.2)'}}
                }}
              >
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
