# Desafio de Criação

Página web interativa para o desafio "Setup IA Ready: Playlists, Estrutura e Mini-Identidade".

## Estrutura do Projeto

```
creative_challenge/
├── index.html          # Página principal
├── src/
│   ├── app.js          # Lógica da aplicação
│   └── styles.css      # Estilos da página
├── md_files/           # Arquivos markdown com conteúdo
│   ├── enunciado.md
│   └── step_1.md até step_7.md
└── README.md
```

## Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. A página carregará automaticamente:
   - O enunciado do desafio no lado esquerdo
   - O primeiro passo do desafio no chat (lado direito) com efeito de digitação
3. Clique em "Próximo" para avançar para os próximos passos
4. Cada passo será exibido com uma mensagem aleatória do usuário simulada
5. No último passo, o botão mudará para "Enviar" e o campo de input será habilitado
6. Os snippets de código podem ser copiados clicando no botão "Copiar"

## Funcionalidades

- ✅ Layout responsivo com duas colunas
- ✅ Efeito de digitação tipo ChatGPT
- ✅ Renderização de markdown com suporte a código
- ✅ Botão de copiar código nos snippets
- ✅ Navegação sequencial pelos passos
- ✅ Mensagens aleatórias do usuário entre passos
- ✅ Input habilitado apenas no último passo

## Requisitos

- Navegador moderno com suporte a ES6+
- Servidor HTTP local (recomendado) ou abrir diretamente o arquivo HTML

## Notas

- Os arquivos markdown são carregados via `fetch`, então é necessário usar um servidor HTTP local ou abrir via `file://` (pode ter limitações de CORS)
- Para desenvolvimento local, pode-se usar: `python -m http.server 8000` ou `npx serve`

