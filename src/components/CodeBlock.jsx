import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function CodeBlock({ code, language = 'text' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        borderRadius: 1,
        overflow: 'hidden',
        my: 1.5,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#2d2d2d',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.75rem',
            color: '#d4d4d4',
            textTransform: 'uppercase',
          }}
        >
          {language}
        </Typography>
        <Button
          size="small"
          onClick={handleCopy}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          sx={{
            color: copied ? '#4caf50' : '#dc004e',
            fontSize: '0.75rem',
            textTransform: 'none',
            minWidth: 'auto',
            padding: '4px 12px',
            '&:hover': {
              backgroundColor: 'rgba(220, 0, 78, 0.1)',
            },
          }}
        >
          {copied ? 'Copiado!' : 'Copiar código'}
        </Button>
      </Box>
      <Box
        component="pre"
        sx={{
          margin: 0,
          padding: 2,
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        <code>{code}</code>
      </Box>
    </Box>
  );
}

export default CodeBlock;

