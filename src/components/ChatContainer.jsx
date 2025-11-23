import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import ChatMessage from './ChatMessage';

function ChatContainer({ currentStep, onNextStep }) {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const hasLoadedRef = useRef(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    if (currentStep === 1 && !hasLoadedRef.current) {
      loadStep(1);
      hasLoadedRef.current = true;
    } else if (currentStep > 1) {
      loadStep(currentStep);
    }
  }, [currentStep]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentStep === 7) {
      setInputDisabled(false);
    }
  }, [currentStep]);

  const loadStep = async (stepNumber) => {
    try {
      setIsTyping(true);
      const response = await fetch(`/md_files/step_${stepNumber}.md`);
      const text = await response.text();
      await typeMessage(text, 'assistant');
    } catch (error) {
      console.error(`Erro ao carregar step ${stepNumber}:`, error);
      setIsTyping(false);
    }
  };

  const typeMessage = async (text, type) => {
    const messageId = Date.now();
    const tempMessage = { id: messageId, type, content: '', isComplete: false };
    setMessages((prev) => [...prev, tempMessage]);

    let currentContent = '';
    const chars = text.split('');

    for (let i = 0; i < chars.length; i++) {
      currentContent += chars[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentContent } : msg
        )
      );
      await delay(10);
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isComplete: true } : msg
      )
    );
    setIsTyping(false);
  };

  const addUserMessage = (text) => {
    const userMessages = [
      'Pronto, podemos continuar.',
      'Ok, seguindo para o próximo passo.',
      'Tudo certo, próximo.',
      'Concluído aqui, pode enviar o próximo passo.',
    ];
    const randomMessage =
      userMessages[Math.floor(Math.random() * userMessages.length)];
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: 'user', content: randomMessage, isComplete: true },
    ]);
  };

  const handleNext = () => {
    if (currentStep < 7) {
      addUserMessage();
      setTimeout(() => {
        onNextStep();
      }, 500);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'user',
          content: inputValue,
          isComplete: true,
        },
        {
          id: Date.now() + 1,
          type: 'assistant',
          content: 'Entrega enviada com sucesso!',
          isComplete: true,
        },
      ]);
      setInputValue('');
      setInputDisabled(true);
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <Paper
      elevation={0}
      sx={{
        width: '50%',
        backgroundColor: '#2d2d2d',
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={messagesContainerRef}
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 3,
          backgroundColor: '#2d2d2d',
        }}
      >
        <Stack spacing={2}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#d4d4d4', fontSize: '0.875rem' }}
              >
                Digitando
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  animation: 'blink 1s infinite',
                  '@keyframes blink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.3 },
                  },
                }}
              />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      <Box
        sx={{
          p: 3,
          backgroundColor: '#2d2d2d',
          borderTop: 'none',
        }}
      >
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder={
                currentStep === 7
                  ? 'Adicione o link público da sua entrega final (disponível no último passo).'
                  : 'Digite sua mensagem...'
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={inputDisabled}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !inputDisabled && inputValue.trim()) {
                  handleSubmit();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#3d3d3d',
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#007bff',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#2d2d2d',
                    color: '#666',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#999',
                  opacity: 1,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isTyping}
              sx={{
                backgroundColor: '#dc004e',
                color: 'white',
                minWidth: 120,
                '&:hover': {
                  backgroundColor: '#b8003d',
                },
                '&:disabled': {
                  backgroundColor: '#555',
                  color: '#999',
                },
              }}
            >
              {currentStep === 7 ? 'Enviar' : 'Próximo'}
            </Button>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#999',
              fontSize: '0.75rem',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            {currentStep === 7
              ? 'Após adicionar o link, finalize o desafio. Esse link ficará disponível no seu perfil e poderá ser visto por recrutadores da Talent Match e por outros participantes do bootcamp.'
              : 'Após executar o prompt, clique em Próximo para acessar as próximas etapas. No final, você enviará o link da sua entrega, que ficará visível no seu perfil e para recrutadores da Talent Match.'}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default ChatContainer;

