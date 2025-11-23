import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [enunciado, setEnunciado] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('/assets/enunciado.md')
      .then((res) => res.text())
      .then((text) => setEnunciado(text))
      .catch((err) => console.error('Erro ao carregar enunciado:', err));
  }, []);

  const handleNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {sidebarOpen && (
          <Sidebar
            content={enunciado}
            onToggle={() => setSidebarOpen(false)}
          />
        )}
        <ChatContainer
          currentStep={currentStep}
          onNextStep={handleNextStep}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </Box>
    </Box>
  );
}

export default App;
