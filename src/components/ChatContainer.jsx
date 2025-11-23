import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import ChatMessage from './ChatMessage';
import SuccessPopup from './SuccessPopup';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ChatContainer({ currentStep, onNextStep, sidebarOpen, onToggleSidebar }) {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
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
    if (currentStep === 0 && !hasLoadedRef.current) {
      loadStep(0);
      hasLoadedRef.current = true;
    } else if (currentStep > 0) {
      loadStep(currentStep);
    }
  }, [currentStep]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentStep === 8) {
      setInputDisabled(false);
    }
  }, [currentStep]);

  const loadStep = async (stepNumber) => {
    try {
      setIsTyping(true);
      const response = await fetch(`/assets/step_${stepNumber}.md`);
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

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const validateLink = async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'cors',
        signal: controller.signal,
        headers: {
          'Accept': '*/*',
        },
      });

      clearTimeout(timeoutId);
      return response.ok && response.status >= 200 && response.status < 300;
    } catch (error) {
      if (error.name === 'AbortError') {
        return false;
      }
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response.ok && response.status >= 200 && response.status < 300;
      } catch (err) {
        return false;
      }
    }
  };

  const handleNext = () => {
    if (currentStep < 8) {
      if (currentStep > 0) {
        addUserMessage();
        setTimeout(() => {
          onNextStep();
        }, 500);
      } else {
        onNextStep();
      }
    } else {
      handleSubmit();
    }
  };

  const getUserSubmissionMessage = () => {
    const messages = [
      'Aqui está o link da minha entrega final.',
      'Segue o link da entrega.',
      'Entrega final enviada. Link público anexado.',
      'Link enviado, desafio concluído.',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLocked) return;

    const url = inputValue.trim();

    if (!isValidUrl(url)) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'assistant',
          content:
            '❌ O link fornecido não é uma URL válida. Por favor, verifique o formato e tente novamente. Certifique-se de incluir o protocolo (http:// ou https://).',
          isComplete: true,
        },
      ]);
      scrollToBottom();
      return;
    }

    setIsValidating(true);
    setInputDisabled(true);

    const userMessage = getUserSubmissionMessage();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        content: userMessage,
        isComplete: true,
      },
    ]);

    const isValid = await validateLink(url);

    setIsValidating(false);

    if (isValid) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'assistant',
          content: '✅ Link validado com sucesso! Sua entrega foi registrada.',
          isComplete: true,
        },
      ]);
      setShowSuccess(true);
      setIsLocked(true);
      setInputDisabled(true);
      setInputValue('');
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'assistant',
          content:
            '❌ Não foi possível validar o link. Verifique se:\n- O link está público e acessível\n- O formato está correto (incluindo http:// ou https://)\n- O servidor não está bloqueando requisições\n\nTente novamente com um link válido.',
          isComplete: true,
        },
      ]);
      setInputDisabled(false);
      scrollToBottom();
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: sidebarOpen ? '50%' : '100%',
          backgroundColor: '#2d2d2d',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          position: 'relative',
        }}
      >
        {!sidebarOpen && (
          <IconButton
            onClick={onToggleSidebar}
            sx={{
              position: 'absolute',
              left: 16,
              top: 16,
              color: '#d4d4d4',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
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
                    backgroundColor: '#dc004e',
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
                  inputDisabled
                    ? 'Adicione o link público da sua entrega final (disponível no último passo).'
                    : 'Cole o link público da sua entrega...'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={inputDisabled || isLocked}
                onKeyPress={(e) => {
                  if (
                    e.key === 'Enter' &&
                    !inputDisabled &&
                    !isLocked &&
                    inputValue.trim()
                  ) {
                    handleSubmit();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#3a3a3a',
                    color: '#f5f5f5',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#dc004e',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#2d2d2d',
                      color: '#666',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#f5f5f5',
                    '&::placeholder': {
                      color: '#999',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isTyping || isValidating || isLocked}
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
                {isValidating
                  ? 'Validando...'
                  : currentStep === 8
                  ? 'Enviar'
                  : 'Próximo'}
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
              {currentStep === 8
                ? 'Após adicionar o link, finalize o desafio. Esse link ficará disponível no seu perfil e poderá ser visto por recrutadores da Talent Match e por outros participantes do bootcamp.'
                : 'Após executar o prompt, clique em Próximo para acessar as próximas etapas. No final, você enviará o link da sua entrega, que ficará visível no seu perfil e para recrutadores da Talent Match.'}
            </Typography>
          </Stack>
        </Box>
      </Paper>
      {showSuccess && <SuccessPopup />}
    </>
  );
}

export default ChatContainer;
