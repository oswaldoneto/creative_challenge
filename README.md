# Desafio de Criação

Página web interativa para o desafio "Setup IA Ready: Playlists, Estrutura e Mini-Identidade".

## Estrutura do Projeto

```
creative_challenge/
├── index.html              # Página principal HTML
├── package.json            # Dependências do projeto
├── vite.config.js          # Configuração do Vite
├── Makefile                # Comandos do projeto
├── src/
│   ├── main.jsx            # Ponto de entrada React
│   ├── App.jsx             # Componente principal
│   └── components/         # Componentes React
│       ├── Header.jsx      # Cabeçalho com navegação e status
│       ├── Sidebar.jsx     # Painel esquerdo com enunciado
│       ├── ChatContainer.jsx # Container do chat
│       ├── ChatMessage.jsx # Componente de mensagem
│       └── CodeBlock.jsx   # Bloco de código com botão copiar
├── md_files/               # Arquivos markdown com conteúdo
│   ├── enunciado.md
│   └── step_1.md até step_7.md
└── README.md
```

## Tecnologias

- **React 18** - Framework frontend
- **Material-UI (MUI)** - Biblioteca de componentes
- **Vite** - Build tool e dev server
- **React Markdown** - Renderização de markdown
- **Emotion** - CSS-in-JS (requerido pelo MUI)

## Como Usar

### Instalação

```bash
make setup
# ou
npm install
```

### Desenvolvimento

```bash
make dev
# ou
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:3000`

### Build para Produção

```bash
make build
# ou
npm run build
```

### Preview da Build

```bash
make preview
# ou
npm run preview
```

## Funcionalidades

- ✅ Layout responsivo com duas colunas (baseado na imagem de referência)
- ✅ Header com navegação, feedback e indicadores de status (XP, Nível, Corações)
- ✅ Painel esquerdo com enunciado do desafio
- ✅ Painel direito com interface tipo ChatGPT (fundo escuro)
- ✅ Efeito de digitação tipo ChatGPT
- ✅ Renderização de markdown com suporte a código
- ✅ Blocos de código com botão "Copiar código"
- ✅ Navegação sequencial pelos passos
- ✅ Mensagens aleatórias do usuário entre passos
- ✅ Input habilitado apenas no último passo
- ✅ Botão muda de "Próximo" para "Enviar" no último passo

## Comandos Disponíveis

- `make setup` - Instala dependências
- `make dev` - Inicia servidor de desenvolvimento
- `make build` - Gera build de produção
- `make preview` - Preview da build de produção
- `make lint` - Executa linter
- `make fmt` - Formata código com Prettier

## Estrutura de Componentes

A aplicação segue uma arquitetura componentizada:

- **App.jsx**: Componente raiz que gerencia estado global
- **Header.jsx**: Cabeçalho com informações de navegação e status
- **Sidebar.jsx**: Painel esquerdo exibindo o enunciado do desafio
- **ChatContainer.jsx**: Container principal do chat que gerencia steps e mensagens
- **ChatMessage.jsx**: Componente individual de mensagem (usuário ou assistente)
- **CodeBlock.jsx**: Componente para exibir e copiar snippets de código

## Notas

- Os arquivos markdown são carregados via `fetch` durante a execução
- O Vite serve os arquivos estáticos da pasta `md_files/` automaticamente
- O layout foi desenvolvido para ser o mais próximo possível da imagem de referência
