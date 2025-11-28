# Olho na Brasa - Landing Page

Landing page de alta conversão para "Olho na Brasa", especializada em churrasqueiras personalizadas.

## Estrutura do Projeto

O projeto foi organizado para facilitar a manutenção e o deploy no Netlify.

*   **`index.html`**: Página principal (Landing Page).
*   **`css/`**: Contém os estilos (`styles.css`).
*   **`js/`**: Contém a lógica (`script.js`).
*   **`docs/`**: Documentação completa do projeto.
*   **`netlify/`**: Funções Serverless e Edge Functions.
    *   `functions/submission-created.js`: Processa formulários e envia para o Sellflux.
    *   `edge-functions/`: (Preparado) Para futuros testes A/B.
*   **`export/`**: Versão consolidada (`sellflux_lp.html`) para uso direto no Sellflux (se necessário).

## Configuração e Deploy (Netlify)

Este projeto utiliza **Netlify Forms** e **Netlify Functions**.

### 1. Variáveis de Ambiente (Segurança)
Para que a integração com o Sellflux funcione, você deve configurar a seguinte variável de ambiente no painel da Netlify:

*   **Key**: `SELLFLUX_WEBHOOK_URL`
*   **Value**: A URL do seu Webhook no Sellflux.

### 2. Formulário
O formulário captura automaticamente:
*   Dados do Lead (Nome, Email, WhatsApp).
*   Cookies do Facebook (`_fbp`, `_fbc`).
*   Parâmetros UTM (`utm_source`, etc.).

### 3. Testes A/B
Consulte `docs/AB_TESTING_GUIDE.md` para instruções sobre como criar variantes e configurar testes A/B.

## Desenvolvimento Local

Para rodar localmente, você pode abrir o `index.html` diretamente no navegador. Para testar as Netlify Functions localmente, recomenda-se usar o [Netlify CLI](https://docs.netlify.com/cli/get-started/).

```bash
netlify dev
```

## Integrações

*   **Sellflux**: Via Webhook (Server-side).
*   **Facebook Pixel**: Captura de cookies no frontend e envio via API (CAPI) através do Sellflux.
# olhonabrasa-LP
