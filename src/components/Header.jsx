import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Chip,
  LinearProgress,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import RatingStars from './RatingStars';

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#424242',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="voltar"
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', lineHeight: 1.2 }}>
              Desafio de Criação
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: '0.75rem', opacity: 0.8, lineHeight: 1.2 }}
            >
              Setup IA Ready: Playlists, Estrutura e Mini-Identidade
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              Seu feedback
            </Typography>
            <RatingStars />
          </Box>
          <Chip
            label="BASIC"
            size="small"
            sx={{
              backgroundColor: '#9c27b0',
              color: 'white',
              fontSize: '0.7rem',
              height: '24px',
            }}
          />
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
              fontSize: '0.7rem',
              textTransform: 'none',
              minWidth: 'auto',
              px: 1.5,
            }}
          >
            Upgrade
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
            <BoltIcon sx={{ fontSize: '1rem', color: '#ffc107' }} />
            <Box sx={{ minWidth: 80 }}>
              <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                XP 200/318
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(200 / 318) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                  },
                }}
              />
            </Box>
          </Box>

          <Chip
            label="NÍVEL 2"
            size="small"
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontSize: '0.7rem',
              height: '24px',
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FavoriteIcon sx={{ fontSize: '1.2rem', color: '#f44336' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              5/5
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

