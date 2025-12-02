# Olho na Brasa - Marketing & Tech Projects

Este repositório contém dois projetos distintos de marketing digital e captura de leads para a marca **Olho na Brasa**:
1.  **Landing Page de Alta Conversão**: A página principal de vendas do Suporte Suspenso.
2.  **Chat Widget (Leadbot)**: Um widget de chat embarcável para captura de leads em sites de terceiros (estilo Leadster).

---

## 1. Landing Page (LP)

A Landing Page foi desenvolvida para maximizar a conversão de visitantes em leads qualificados para o time comercial.

### 🛠 Tecnologias
-   **HTML5 / CSS3**: Estrutura semântica e estilização moderna.
-   **Tailwind CSS**: Framework utilitário para design responsivo e ágil.
-   **Vanilla JavaScript**: Lógica leve para modais, carrosséis e validações.
-   **Netlify Functions**: Backend serverless para proxy seguro de webhooks.

### ✨ Funcionalidades Principais
-   **Design Premium**: Estética "Dark/Fire" com efeitos de glassmorphism e animações.
-   **Carrossel Infinito**: Marquee de produtos para prova social visual.
-   **Captura em 2 Etapas**:
    1.  **Formulário Inicial**: Captura Nome, Email e WhatsApp.
    2.  **Modal de Confirmação**: Garante a veracidade dos dados.
    3.  **Quiz de Qualificação (Survey)**: 7 perguntas interativas para perfilar o lead.
-   **Rastreamento Avançado**:
    -   Captura automática de UTMs (`utm_source`, `medium`, etc.).
    -   Integração com Facebook Pixel (Deduplicação via `event_id`).
    -   Cookies `_fbc` e `_fbp`.
-   **Webhooks Duplos (via n8n)**:
    -   **Lead Capture**: Disparo imediato ao confirmar dados básicos.
    -   **Survey Enrichment**: Disparo enriquecido ao finalizar o Quiz.

### 📂 Estrutura de Arquivos (LP)
-   `index.html`: Arquivo principal.
-   `js/script.js`: Lógica de formulários, quiz e rastreamento.
-   `css/styles.css`: Estilos customizados e Tailwind.
-   `netlify/functions/collect-lead.js`: Proxy seguro para o n8n.

---

## 2. Chat Widget (Leadbot)

Um script autônomo projetado para ser "embarcado" em qualquer site (e-commerce, blog, parceiros) para capturar leads de forma conversacional.

### 🛠 Arquitetura
-   **Frontend (`/widget-leadster`)**:
    -   Script único (`widget.js`) que injeta seu próprio HTML e CSS (Shadow DOM-like).
    -   Totalmente isolado do CSS do site hospedeiro.
-   **Backend Seguro**:
    -   O widget envia dados para `/.netlify/functions/collect-lead`.
    -   A função adiciona a URL do n8n (escondida no servidor) e encaminha os dados.

### 🚀 Como Usar (Embed)
Para adicionar o chat em um site, basta inserir o seguinte código antes do fechamento da tag `</body>`:

```html
<script src="https://seu-dominio-netlify.app/widget-leadster/widget.js"></script>
```

---

## 3. Configuração e Deploy

### Variáveis de Ambiente (Obrigatório)
Para que o sistema funcione, você deve configurar as seguintes variáveis no painel da Netlify (**Site Settings > Environment Variables**) ou no arquivo `.env` localmente:

| Chave | Descrição |
| :--- | :--- |
| `N8N_WEBHOOK_LEAD_URL` | URL do Webhook do n8n para receber o lead inicial (Nome, Email, Whats). |
| `N8N_WEBHOOK_SURVEY_URL` | URL do Webhook do n8n para receber as respostas do Quiz. |

### 💻 Como Rodar Localmente

Como utilizamos **Netlify Functions** para segurança, você **NÃO** pode apenas abrir o `index.html` no navegador. Você precisa simular o servidor da Netlify.

1.  **Instale o Netlify CLI** (caso não tenha):
    ```bash
    npm install netlify-cli -g
    ```

2.  **Configure o Ambiente Local**:
    Crie um arquivo `.env` na raiz do projeto e adicione suas URLs:
    ```env
    N8N_WEBHOOK_LEAD_URL=https://webhook.sellflux.com.br/...
    N8N_WEBHOOK_SURVEY_URL=https://webhook.sellflux.com.br/...
    ```

3.  **Inicie o Servidor**:
    ```bash
    netlify dev
    ```
    O terminal mostrará um link (geralmente `http://localhost:8888`). Acesse por este link.

4.  **Teste o Widget**:
    Acesse `http://localhost:8888/test-widget.html` para ver o chat em ação.

---

**Desenvolvido por Felipe Moreira & Antigravity Agent**
