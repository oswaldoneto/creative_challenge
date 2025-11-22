class ChallengeApp {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 7;
    this.userMessages = [
      'Pronto, podemos continuar.',
      'Ok, seguindo para o próximo passo.',
      'Tudo certo, próximo.',
      'Concluído aqui, pode enviar o próximo passo.',
    ];
    this.chatMessagesEl = document.getElementById('chat-messages');
    this.nextButton = document.getElementById('next-button');
    this.chatInput = document.getElementById('chat-input');
    this.init();
  }

  async init() {
    await this.loadEnunciado();
    await this.loadStep(1);
    this.nextButton.addEventListener('click', () => this.handleNext());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.chatInput.disabled) {
        this.handleSubmit();
      }
    });
  }

  async loadEnunciado() {
    try {
      const response = await fetch('md_files/enunciado.md');
      const text = await response.text();
      const html = marked.parse(text);
      document.getElementById('enunciado-content').innerHTML = html;
    } catch (error) {
      console.error('Erro ao carregar enunciado:', error);
      document.getElementById('enunciado-content').innerHTML =
        '<p>Erro ao carregar o enunciado.</p>';
    }
  }

  async loadStep(stepNumber) {
    try {
      const response = await fetch(`md_files/step_${stepNumber}.md`);
      const text = await response.text();
      const html = this.processMarkdown(text);
      await this.typeMessage(html, 'assistant');
    } catch (error) {
      console.error(`Erro ao carregar step ${stepNumber}:`, error);
      this.addMessage('Erro ao carregar o passo.', 'assistant');
    }
  }

  processMarkdown(text) {
    let html = marked.parse(text);
    html = this.processCodeBlocks(html);
    return html;
  }

  processCodeBlocks(html) {
    return html;
  }

  async typeMessage(html, type) {
    const messageEl = this.createMessageElement(type);
    const contentEl = messageEl.querySelector('.message-content');
    this.chatMessagesEl.appendChild(messageEl);

    const fullHtml = html;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = fullHtml;
    this.processCodeBlocksInElement(tempDiv);
    const processedHtml = tempDiv.innerHTML;

    let currentHtml = '';
    const chars = processedHtml.split('');

    for (let i = 0; i < chars.length; i++) {
      currentHtml += chars[i];
      contentEl.innerHTML = currentHtml + '<span class="typing-indicator"></span>';
      await this.delay(10);
    }

    contentEl.innerHTML = processedHtml;
    this.attachCopyListeners(contentEl);
    this.scrollToBottom();
  }

  processCodeBlocksInElement(element) {
    const codeBlocks = element.querySelectorAll('pre code');
    codeBlocks.forEach((codeEl) => {
      const code = codeEl.textContent;
      const lang =
        codeEl.className.match(/language-(\w+)/)?.[1] || 'text';
      const codeBlock = document.createElement('div');
      codeBlock.className = 'code-block';
      const codeId = `code-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      codeBlock.innerHTML = `
        <div class="code-header">
          <span>${lang}</span>
          <button class="code-copy-btn" data-code-id="${codeId}">
            Copiar
          </button>
        </div>
        <div class="code-content">${this.escapeHtml(code)}</div>
      `;
      codeBlock.dataset.code = code;
      codeEl.parentElement.replaceWith(codeBlock);
    });
  }

  attachCopyListeners(element) {
    const copyButtons = element.querySelectorAll('.code-copy-btn');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const codeBlock = btn.closest('.code-block');
        const code = codeBlock.dataset.code;
        navigator.clipboard.writeText(code).then(() => {
          btn.classList.add('copied');
          btn.textContent = 'Copiado!';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = 'Copiar';
          }, 2000);
        });
      });
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  addMessage(text, type) {
    const messageEl = this.createMessageElement(type);
    const contentEl = messageEl.querySelector('.message-content');
    contentEl.textContent = text;
    this.chatMessagesEl.appendChild(messageEl);
    this.scrollToBottom();
  }

  createMessageElement(type) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';
    messageEl.appendChild(contentEl);
    return messageEl;
  }

  getRandomUserMessage() {
    return this.userMessages[
      Math.floor(Math.random() * this.userMessages.length)
    ];
  }

  async handleNext() {
    if (this.currentStep < this.totalSteps) {
      const userMessage = this.getRandomUserMessage();
      this.addMessage(userMessage, 'user');

      await this.delay(500);

      this.currentStep++;
      await this.loadStep(this.currentStep);

      if (this.currentStep === this.totalSteps) {
        this.nextButton.textContent = 'Enviar';
        this.chatInput.disabled = false;
        this.chatInput.placeholder = 'Cole o link público da sua entrega...';
      }
    } else {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const inputValue = this.chatInput.value.trim();
    if (inputValue) {
      this.addMessage(inputValue, 'user');
      this.addMessage('Entrega enviada com sucesso!', 'assistant');
      this.chatInput.value = '';
      this.chatInput.disabled = true;
      this.nextButton.disabled = true;
    }
  }

  scrollToBottom() {
    this.chatMessagesEl.scrollTop = this.chatMessagesEl.scrollHeight;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ChallengeApp();
});

