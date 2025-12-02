 **Arquitetura**, **Fluxo de Dados** e **Comportamento de Estado**.


# Contexto do Projeto
Estou criando um Widget de Chat Leadbot (semelhante ao Leadster) que será embarcado em sites de terceiros via tag `<script>`. O objetivo é capturar leads de forma conversacional e enviar dados de rastreamento (Facebook Ads/Google Ads) para um backend na Netlify.

# 1. Frontend (O Script Embedável)
Preciso de um script em Vanilla Javascript (sem frameworks pesados) que execute as seguintes funções:

## A. Interface e Injeção de CSS
- O script deve injetar seu próprio CSS dinamicamente no `<head>` para estilizar o widget (botão flutuante no canto inferior direito).
- O widget deve ter um botão de fechar e minimizar.
- Layout: Estilo "chat", com balões de mensagem.

## B. Máquina de Estados (Simulação de Chat)
O chat não é uma IA real, é um fluxo roteirizado. O comportamento deve ser:
1. **Estado Inicial:** Widget fechado ou aberto (configurável).
2. **Loop de Engajamento:**
   - Ao abrir, mostrar indicador de "digitando..." (animação de 3 pontinhos) por 1.5s.
   - Exibir Mensagem 1.
   - Aguardar 3 segundos.
   - Mostrar "digitando..." por 1.5s.
   - Exibir Mensagem 2 (ex: "Vamos começar seu teste grátis?").
   - Se o usuário não interagir, mudar o texto da chamada após X segundos para tentar re-engajar.
3. **Coleta de Dados (Input):**
   - O chat deve pedir os dados sequencialmente: Nome -> Email -> WhatsApp -> CEP.
   - A cada input do usuário, simular um breve delay de "processamento" antes de pedir o próximo dado.

## C. Módulo de Tracking (Invisível)
O script deve ter uma função `getTrackingData()` que roda silenciosamente no load:
- **Cookies:** Ler os cookies `_fbc` e `_fbp` (se existirem no navegador do usuário).
- **UTMs:** Ler os parâmetros da URL atual (`utm_source`, `utm_medium`, `utm_campaign`, `src`).
- Armazenar esses dados em um objeto oculto para serem enviados junto com o lead.

# 2. Backend (Netlify Functions)
Preciso de uma Serverless Function (`collect-lead.js`) para receber o POST do script.

## Requisitos do Backend:
- **CORS:** Deve aceitar requisições de qualquer origem (`Access-Control-Allow-Origin: *`), pois o script rodará em domínios de clientes.
- **Payload Esperado:**
  ```json
  {
    "lead": {
      "name": "Nome",
      "email": "email@teste.com",
      "phone": "551199999999",
      "cep": "00000-000"
    },
    "tracking": {
      "fbc": "fb.1.123...",
      "fbp": "fb.1.456...",
      "utm_source": "google",
      "url_lead": "[https://site-cliente.com](https://site-cliente.com)" (url completa sem utm e sem parametros, mas contendo a / do final)
    }
  }
````

  - **Ação:** Receber os dados, validar se os campos obrigatórios existem e retornar status 200 para o front. (Futuramente adicionaremos criptografia e envio para CRM).

# Sua Tarefa Agora

Com base nessa arquitetura, gere o código para o arquivo `widget.js` (Frontend) focando na lógica do Loop de Engajamento (timers e animação de digitando) e na função de extração de Cookies/UTMs.

```

---

# 3. Estrutura de Pastas e Isolamento do Projeto (IMPORTANTE)
Este desenvolvimento será feito dentro do nosso repositório atual, mas deve ser **totalmente isolado** da lógica da nossa "Página de Captura" atual.

## Regras de Organização:
1. **Nova Pasta:** Crie todo o código do frontend deste widget em uma pasta dedicada na raiz, por exemplo: `/widget-leadster`. Nada deve ser misturado com os componentes da landing page atual.
2. **Independência:** Este widget será compilado/minificado para ser usado externamente (em outros sites via tag script), portanto ele não pode depender de contextos (React Context/Providers) ou estilos globais da aplicação principal.
3. **Reaproveitamento de Schema:**
   Embora o funcionamento seja independente, o formato dos dados deve ser compatível com o que já utilizamos.
   - **Campos Básicos:** `name`, `email`, `phone` (whatsapp), `cep`.
   - **Tracking:** Utilizar a mesma lógica de extração que já temos (cookies `_fbc`, `_fbp` e parâmetros URL), mas encapsulada dentro do script do widget para não depender de libs externas.

## Objetivo Final
Quero que, ao final, eu tenha um arquivo `.js` isolado dentro dessa nova pasta, pronto para subir na Netlify, que funcione de forma autônoma para coletar esses dados e enviá-los para a nossa função serverless.