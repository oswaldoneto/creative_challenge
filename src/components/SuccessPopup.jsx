import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SuccessPopup() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#2d2d2d',
        borderRadius: 3,
        padding: 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minWidth: 300,
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: 64,
          color: '#4caf50',
          animation: 'scaleIn 0.5s ease-out',
          '@keyframes scaleIn': {
            '0%': {
              transform: 'scale(0)',
              opacity: 0,
            },
            '50%': {
              transform: 'scale(1.2)',
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
          },
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: '#fff',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Entrega enviada com sucesso!
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#d4d4d4',
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        Seu link foi validado e está disponível no seu perfil.
      </Typography>
    </Box>
  );
}

export default SuccessPopup;

