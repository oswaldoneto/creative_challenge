import { Box, Paper, Typography, IconButton } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function Sidebar({ content, onToggle }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '50%',
        backgroundColor: '#1e1e1e',
        borderRadius: 0,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#d4d4d4',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box
        sx={{
          p: 4,
          maxWidth: '100%',
          '& h1': {
            fontSize: '1.5rem',
            fontWeight: 600,
            mb: 2,
            color: '#fff',
          },
          '& h2': {
            fontSize: '1.2rem',
            fontWeight: 600,
            mt: 3,
            mb: 1.5,
            color: '#e0e0e0',
          },
          '& p': {
            mb: 1.5,
            lineHeight: 1.7,
            color: '#d4d4d4',
          },
          '& ul, & ol': {
            ml: 3,
            mb: 1.5,
          },
          '& li': {
            mb: 0.75,
            lineHeight: 1.7,
            color: '#d4d4d4',
          },
          '& strong': {
            fontWeight: 600,
            color: '#fff',
          },
          '& em': {
            fontStyle: 'italic',
            color: '#b0b0b0',
          },
        }}
      >
        {content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        ) : (
          <Typography>Carregando...</Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Sidebar;
