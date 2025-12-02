(function () {
    // --- Configuration ---
    const CONFIG = {
        primaryColor: '#e96527', // Orange from Olho na Brasa
        textColor: '#ffffff',
        botName: 'Consultor Olho na Brasa',
        botAvatar: 'https://s3.1app.com.br/master/project_24727/9GfHWwfYXkqRRNxbuUWN0egO0m6AtTLZ.png', // Favicon as avatar
        backendUrl: '/.netlify/functions/collect-lead?type=lead', // Proxy seguro via Netlify Function
        delays: {
            typing: 1500,
            message: 3000,
            processing: 1000
        }
    };

    // --- State ---
    let state = {
        isOpen: false,
        step: 0,
        lead: {
            name: '',
            email: '',
            phone: '',
            cep: ''
        },
        tracking: {}
    };

    // --- CSS Injection ---
    function injectStyles() {
        const css = `
            #lb-widget-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
            #lb-toggle-btn {
                width: 60px;
                height: 60px;
                background-color: ${CONFIG.primaryColor};
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease;
            }
            #lb-toggle-btn:hover {
                transform: scale(1.05);
            }
            #lb-toggle-icon {
                width: 30px;
                height: 30px;
                fill: ${CONFIG.textColor};
            }
            #lb-chat-window {
                width: 350px;
                height: 500px;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                display: none; /* Hidden by default */
                flex-direction: column;
                overflow: hidden;
                position: absolute;
                bottom: 80px;
                right: 0;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            #lb-chat-window.open {
                display: flex;
                opacity: 1;
                transform: translateY(0);
            }
            #lb-header {
                background-color: ${CONFIG.primaryColor};
                color: ${CONFIG.textColor};
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            #lb-header-title {
                font-weight: bold;
                font-size: 16px;
            }
            #lb-close-btn {
                cursor: pointer;
                font-size: 20px;
                line-height: 1;
            }
            #lb-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background-color: #f9f9f9;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .lb-message {
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 12px;
                font-size: 14px;
                line-height: 1.4;
                position: relative;
                animation: lb-fade-in 0.3s ease;
            }
            .lb-message.bot {
                background-color: #fff;
                color: #333;
                border-bottom-left-radius: 2px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                align-self: flex-start;
            }
            .lb-message.user {
                background-color: ${CONFIG.primaryColor};
                color: ${CONFIG.textColor};
                border-bottom-right-radius: 2px;
                align-self: flex-end;
            }
            .lb-typing {
                display: flex;
                gap: 4px;
                padding: 12px 15px;
                background-color: #fff;
                border-radius: 12px;
                border-bottom-left-radius: 2px;
                width: fit-content;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            .lb-dot {
                width: 6px;
                height: 6px;
                background-color: #ccc;
                border-radius: 50%;
                animation: lb-bounce 1.4s infinite ease-in-out both;
            }
            .lb-dot:nth-child(1) { animation-delay: -0.32s; }
            .lb-dot:nth-child(2) { animation-delay: -0.16s; }
            #lb-input-area {
                padding: 15px;
                border-top: 1px solid #eee;
                background-color: #fff;
                display: flex;
                gap: 10px;
            }
            #lb-input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
            }
            #lb-input:focus {
                border-color: ${CONFIG.primaryColor};
            }
            #lb-send-btn {
                background-color: ${CONFIG.primaryColor};
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @keyframes lb-fade-in {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes lb-bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    // --- UI Rendering ---
    function renderWidget() {
        const container = document.createElement('div');
        container.id = 'lb-widget-container';

        container.innerHTML = `
            <div id="lb-chat-window">
                <div id="lb-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${CONFIG.botAvatar}" style="width:30px; height:30px; border-radius:50%;">
                        <span id="lb-header-title">${CONFIG.botName}</span>
                    </div>
                    <span id="lb-close-btn">&times;</span>
                </div>
                <div id="lb-body"></div>
                <div id="lb-input-area">
                    <input type="text" id="lb-input" placeholder="Digite sua resposta..." disabled>
                    <button id="lb-send-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                    </button>
                </div>
            </div>
            <div id="lb-toggle-btn">
                <svg id="lb-toggle-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
            </div>
        `;

        document.body.appendChild(container);

        // Event Listeners
        document.getElementById('lb-toggle-btn').addEventListener('click', toggleChat);
        document.getElementById('lb-close-btn').addEventListener('click', toggleChat);
        document.getElementById('lb-send-btn').addEventListener('click', handleInput);
        document.getElementById('lb-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleInput();
        });
    }

    function toggleChat() {
        const chatWindow = document.getElementById('lb-chat-window');
        state.isOpen = !state.isOpen;

        if (state.isOpen) {
            chatWindow.classList.add('open');
            if (state.step === 0) startConversation();
        } else {
            chatWindow.classList.remove('open');
        }
    }

    // --- Chat Logic ---
    function addMessage(text, sender = 'bot') {
        const body = document.getElementById('lb-body');
        const msg = document.createElement('div');
        msg.className = `lb-message ${sender}`;
        msg.innerText = text;
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
        const body = document.getElementById('lb-body');
        const typing = document.createElement('div');
        typing.id = 'lb-typing-indicator';
        typing.className = 'lb-typing';
        typing.innerHTML = '<div class="lb-dot"></div><div class="lb-dot"></div><div class="lb-dot"></div>';
        body.appendChild(typing);
        body.scrollTop = body.scrollHeight;
        return typing;
    }

    function removeTyping() {
        const typing = document.getElementById('lb-typing-indicator');
        if (typing) typing.remove();
    }

    async function botSpeak(text, delay = CONFIG.delays.typing) {
        showTyping();
        await new Promise(r => setTimeout(r, delay));
        removeTyping();
        addMessage(text, 'bot');
    }

    async function startConversation() {
        state.step = 1;
        await botSpeak("Olá! Tudo bem?");
        await new Promise(r => setTimeout(r, CONFIG.delays.message));
        await botSpeak("Gostaria de receber uma proposta personalizada para o seu churrasco?");

        enableInput("Qual é o seu nome?");
    }

    function enableInput(placeholder) {
        const input = document.getElementById('lb-input');
        input.disabled = false;
        input.placeholder = placeholder;
        input.focus();
    }

    function disableInput() {
        const input = document.getElementById('lb-input');
        input.disabled = true;
        input.value = '';
        input.placeholder = '...';
    }

    async function handleInput() {
        const input = document.getElementById('lb-input');
        const value = input.value.trim();
        if (!value) return;

        addMessage(value, 'user');
        disableInput();

        // Process Input based on step
        await processStep(value);
    }

    async function processStep(value) {
        showTyping(); // Processing delay
        await new Promise(r => setTimeout(r, CONFIG.delays.processing));
        removeTyping();

        if (state.step === 1) { // Name
            state.lead.name = value;
            state.step = 2;
            await botSpeak(`Prazer, ${value}! E qual é o seu melhor e-mail?`);
            enableInput("Digite seu e-mail...");
        } else if (state.step === 2) { // Email
            state.lead.email = value;
            state.step = 3;
            await botSpeak("Perfeito. Agora, me informe seu WhatsApp com DDD.");
            enableInput("(00) 00000-0000");
        } else if (state.step === 3) { // Phone
            state.lead.phone = value;
            state.step = 4;
            await botSpeak("Última pergunta: Qual é o seu CEP?");
            enableInput("00000-000");
        } else if (state.step === 4) { // CEP
            state.lead.cep = value;
            state.step = 5;
            await botSpeak("Obrigado! Estou gerando sua proposta...");
            await submitLead();
        }
    }

    // --- Tracking ---
    function getTrackingData() {
        // Cookies
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return '';
        };

        state.tracking.fbp = getCookie('_fbp');
        state.tracking.fbc = getCookie('_fbc');

        // UTMs
        const urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
            state.tracking[param] = urlParams.get(param) || '';
        });

        state.tracking.url_lead = window.location.href;
    }

    // --- Backend Submission ---
    async function submitLead() {
        getTrackingData();

        const payload = {
            lead: state.lead,
            tracking: state.tracking
        };

        try {
            // Simulate API call for now (or call real backend if ready)
            console.log("Sending Payload:", payload);

            const response = await fetch(CONFIG.backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            await botSpeak("Recebemos seus dados! Um consultor entrará em contato em breve.");
        } catch (error) {
            console.error("Error submitting lead:", error);
            await botSpeak("Ops, tive um erro ao enviar. Mas não se preocupe, tente novamente mais tarde.");
        }
    }

    // --- Initialization ---
    function init() {
        injectStyles();
        renderWidget();
        getTrackingData(); // Pre-load tracking data
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
