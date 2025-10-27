import { Box } from '@mui/material';
import './App.css';
import { Navbar } from './components/Navbar';
import { AppRouter } from './router/AppRouter';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  const noNavRoutes = ['/login']
  const hideNavBar = noNavRoutes.includes(location.pathname)
  return (
    <Box sx={{ display: 'flex' }}>
      {!hideNavBar && (
        <>
          <Navbar />
        </>
      )}
      <AppRouter />
    </Box>
  )
}

export default App;

