import { Box, Button, Dialog, Typography } from "@mui/material"

export const SignOutModal = ({openModal, handleClose, handleLogOut}) => {
  return (
    <Dialog open={openModal} onClose={handleClose}>
      <Box sx={{padding: 4, textAlign: 'center'}}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: '#624185'
          }}
        >
          ¿Estás seguro de cerrar sesión?
        </Typography>
        <Box
          sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3}}
        >
          <Button
            onClick={handleLogOut}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              bgcolor: '#fff',
              color: '#624185',
              border: '2px solid #624185',
              borderRadius: '.5rem',
              padding: '.5rem 1rem',
              fontSize: '1rem',
              '&:hover': {bgcolor: '#fdfdfd'}
            }}
          >
            Confirmar
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'none',
              bgcolor: '#ff0000',
              color: '#fff',
              borderRadius: '.5rem',
              padding: '.5rem 1rem',
              fontSize: '1rem',
              '&:hover': {bgcolor: '#d60000'}
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}