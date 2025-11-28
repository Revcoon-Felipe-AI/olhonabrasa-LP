Sim, é totalmente possível e altamente recomendado. O processo é idêntico ao dos cookies do Facebook: você precisa capturar, armazenar em campos ocultos (`hidden inputs`) e passar pela sua Netlify Function até o Sellflux.

O grande "pulo do gato" das UTMs é que o usuário pode chegar pela Home (`utm_source=google`) e navegar até a página de Contato. Se você tentar ler a URL na página de Contato, as UTMs já sumiram.

Por isso, a melhor estratégia é: **Salvar as UTMs no LocalStorage do navegador assim que o usuário chega, e depois preencher o formulário.**

Aqui está o passo a passo atualizado:

-----

### 1\. Preparação no Sellflux

Antes de codar, vá no Sellflux e crie os **Campos Personalizados** (tipo Texto) para receber esses dados, se ainda não existirem:

  * `utm_source` (Origem)
  * `utm_medium` (Meio)
  * `utm_campaign` (Campanha)
  * `utm_term` (Termo)
  * `utm_content` (Conteúdo)

-----

### 2\. Frontend (HTML + JS Inteligente)

Atualize o seu formulário para incluir os campos ocultos das UTMs e use este script melhorado. Ele verifica se há UTMs na URL; se houver, salva. Se não houver na URL (o usuário navegou pelo site), ele busca o que foi salvo anteriormente.

**O HTML:**

```html
<form name="lead-magnet" method="POST" data-netlify="true" action="/sucesso">
  <label>Nome: <input type="text" name="name" required /></label>
  <label>Email: <input type="email" name="email" required /></label>
  <label>WhatsApp: <input type="tel" name="whatsapp" required /></label>

  <input type="hidden" name="fbp" id="fbp_field" value="" />
  <input type="hidden" name="fbc" id="fbc_field" value="" />

  <input type="hidden" name="utm_source" class="utm-field" />
  <input type="hidden" name="utm_medium" class="utm-field" />
  <input type="hidden" name="utm_campaign" class="utm-field" />
  <input type="hidden" name="utm_term" class="utm-field" />
  <input type="hidden" name="utm_content" class="utm-field" />

  <button type="submit">Enviar</button>
</form>
```

**O JavaScript (Coloque no rodapé do site):**

```javascript
<script>
  document.addEventListener("DOMContentLoaded", function() {
    
    // --- PARTE 1: Facebook Cookies ---
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return '';
    };
    
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    if(fbp) document.getElementById('fbp_field').value = fbp;
    if(fbc) document.getElementById('fbc_field').value = fbc;

    // --- PARTE 2: UTMs (Com persistência) ---
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const urlParams = new URLSearchParams(window.location.search);

    utmParams.forEach(param => {
      // 1. Tenta pegar da URL atual
      let value = urlParams.get(param);

      // 2. Se achou na URL, salva no navegador (LocalStorage) para não perder se ele mudar de página
      if (value) {
        localStorage.setItem(param, value);
      } 
      
      // 3. Se não achou na URL, tenta recuperar do LocalStorage (da navegação anterior)
      if (!value) {
        value = localStorage.getItem(param);
      }

      // 4. Se encontrou algum valor (na URL ou salvo), preenche o campo oculto
      if (value) {
        // Busca o input pelo name (ex: name="utm_source")
        const field = document.querySelector(`input[name="${param}"]`);
        if (field) field.value = value;
      }
    });
  });
</script>
```

-----

### 3\. Backend (Netlify Function Atualizada)

Agora atualizamos a função para pegar esses novos dados e repassar ao Sellflux.

```javascript
// netlify/functions/submission-created.js

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const data = body.payload.data;
    const SELLFLUX_WEBHOOK_URL = "SUA_URL_DO_SELLFLUX";

    // Tratamento de telefone (igual anterior)
    let whatsapp = data.whatsapp.replace(/\D/g, '');
    if (whatsapp.length <= 11) whatsapp = '55' + whatsapp;

    // Payload Completo
    const payloadSellflux = {
      // Dados Pessoais
      nome: data.name,
      email: data.email.toLowerCase(),
      telefone: whatsapp,
      
      // Facebook API CAPI
      facebook_fbp: data.fbp, 
      facebook_fbc: data.fbc,

      // UTMs de Rastreamento
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_term: data.utm_term || '',
      utm_content: data.utm_content || '',
      
      // Metadados extras úteis
      origem_url: data.referrer || '' // O Netlify costuma capturar o referrer automaticamente
    };

    // Envio
    const response = await fetch(SELLFLUX_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadSellflux)
    });

    if (!response.ok) throw new Error(`Sellflux respondeu: ${response.statusText}`);

    return { statusCode: 200, body: JSON.stringify({ message: "OK" }) };

  } catch (error) {
    console.error(error);
    return { statusCode: 200, body: JSON.stringify({ error: error.message }) };
  }
};
```

### Por que usar LocalStorage para UTMs?

Imagine este cenário comum em tráfego pago:

1.  Usuário clica no anúncio no Instagram: `seusite.com/landing?utm_source=fb_ads`.
2.  O script roda, pega "fb\_ads" e salva no LocalStorage.
3.  O usuário decide clicar em "Sobre mim" no menu (`seusite.com/sobre`). **A UTM sumiu da URL.**
4.  Ele decide comprar/converter e vai para o formulário.
5.  O script roda, vê que a URL está limpa, mas lembra do "fb\_ads" salvo no passo 2 e preenche o formulário.

Sem o LocalStorage, você perderia a origem da venda nesse cenário de navegação.

Gostaria de ajuda para testar se as UTMs estão sendo salvas corretamente no navegador antes de enviar?