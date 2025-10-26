import PersonIcon from '@mui/icons-material/Person';
import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const UserProfile = ({ userName = 'username' }) => {
  return (
    <Link to='/account' style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box>
        <Box sx={{ ml: 2, mr: 2.8, mt: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3, },
              px: '.813rem',
              py: '.625rem'
            }}
          >
            <PersonIcon sx={{width: '3rem', height: '3rem'}}/>
            <Typography>
              {userName}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', pb: 1 }}>
          <Divider
            sx={{
              bgcolor: '#FFF',
              position: 'absolute',
              bottom: 0,
              left: '8%',
              width: '81%',
              height: '0.04rem'
            }}
          />
        </Box>
      </Box>
    </Link>
  )
}