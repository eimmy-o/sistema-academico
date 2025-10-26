import { Box } from '@mui/material';
import './App.css';
import { Navbar } from './components/Navbar';
import { AppRouter } from './router/AppRouter';

function App() {
  const hideNavBar = location.pathname === '/login';
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

