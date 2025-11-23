import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

function ChatMessage({ message }) {
  const isUser = message.type === 'user';

  if (isUser) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#3d3d3d',
            color: 'white',
            padding: '12px 18px',
            borderRadius: '18px 18px 4px 18px',
            maxWidth: '70%',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            {message.content}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        borderRadius: 2,
        p: 2.5,
        mb: 2,
        '& h1': {
          fontSize: '1.25rem',
          fontWeight: 600,
          mb: 1.5,
          color: '#fff',
        },
        '& h2': {
          fontSize: '1.1rem',
          fontWeight: 600,
          mt: 2,
          mb: 1,
          color: '#e0e0e0',
        },
        '& h3': {
          fontSize: '1rem',
          fontWeight: 600,
          mt: 1.5,
          mb: 0.75,
          color: '#d0d0d0',
        },
        '& p': {
          mb: 1.25,
          lineHeight: 1.7,
          color: '#d4d4d4',
          fontSize: '0.875rem',
        },
        '& ul, & ol': {
          ml: 2.5,
          mb: 1.25,
          color: '#d4d4d4',
        },
        '& li': {
          mb: 0.5,
          lineHeight: 1.7,
          fontSize: '0.875rem',
        },
        '& strong': {
          fontWeight: 600,
          color: '#fff',
        },
        '& em': {
          fontStyle: 'italic',
          color: '#b0b0b0',
        },
        '& pre': {
          margin: 0,
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            const codeString = String(children).replace(/\n$/, '');

            return <CodeBlock code={codeString} language={language} />;
          },
          pre({ node, children, ...props }) {
            if (node.children && node.children[0] && node.children[0].tagName === 'code') {
              return <>{children}</>;
            }
            return <pre {...props}>{children}</pre>;
          },
        }}
      >
        {message.content}
      </ReactMarkdown>
    </Box>
  );
}

export default ChatMessage;

