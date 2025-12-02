document.addEventListener('DOMContentLoaded', function () {
    // --- PARTE 1: Facebook Cookies ---
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    };

    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    if (fbp) {
        const fbpField = document.getElementById('fbp_field');
        if (fbpField) fbpField.value = fbp;
    }
    if (fbc) {
        const fbcField = document.getElementById('fbc_field');
        if (fbcField) fbcField.value = fbc;
    }

    // --- PARTE 1.5: Event ID (Deduplicação Facebook) ---
    const uniqueEventID = 'evt_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000);
    const eventIdField = document.getElementById('event_id_field');
    if (eventIdField) {
        eventIdField.value = uniqueEventID;
    }

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

    // Form Validation and Masking
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }

            e.target.value = value;
        });
    }

    const form = document.getElementById('form-contato');
    const modal = document.getElementById('confirmation-modal');
    const btnConfirm = document.getElementById('btn-confirm-submit');
    const btnEdit = document.getElementById('btn-edit');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (form && modal && btnConfirm && btnEdit) {
        // 1. Intercept Form Submit
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop submission

            // Validate Phone
            const phoneValue = phoneInput.value.replace(/\D/g, '');
            if (phoneValue.length < 10 || phoneValue.length > 11) {
                alert('Por favor, insira um telefone válido com DDD.');
                phoneInput.focus();
                return;
            }

            // Populate Modal
            document.getElementById('modal-name-display').textContent = nameInput.value;
            document.getElementById('modal-email-display').textContent = emailInput.value;
            document.getElementById('modal-phone-display').textContent = phoneInput.value;

            // Show Modal
            modal.classList.remove('hidden');
        });

        // 2. Handle "Editar" (Close Modal)
        btnEdit.addEventListener('click', function () {
            modal.classList.add('hidden');
        });

        // 3. Handle "Confirmar" (Submit)
        btnConfirm.addEventListener('click', function () {
            // Add Country Code (+55)
            let rawPhone = phoneInput.value.replace(/\D/g, '');
            if (!rawPhone.startsWith('55')) {
                rawPhone = '55' + rawPhone;
            }
            phoneInput.value = rawPhone;

            // Capture Initial Data
            initialLeadData = {
                name: nameInput.value,
                email: emailInput.value,
                whatsapp: rawPhone,
                fbp: document.getElementById('fbp_field').value,
                fbc: document.getElementById('fbc_field').value,
                event_id: uniqueEventID,
                utm_source: document.querySelector('input[name="utm_source"]').value,
                utm_medium: document.querySelector('input[name="utm_medium"]').value,
                utm_campaign: document.querySelector('input[name="utm_campaign"]').value,
                utm_term: document.querySelector('input[name="utm_term"]').value,
                utm_content: document.querySelector('input[name="utm_content"]').value,
            };

            // Track Facebook Lead (Initial)
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {}, { eventID: uniqueEventID });
            }

            // --- WEBHOOK 1: GARANTIA DO LEAD (Dispara já!) ---
            // Envia os dados básicos imediatamente para garantir o lead caso ele desista do quiz
            submitToN8n(initialLeadData, 'lead')
                .catch(err => console.error('Erro ao enviar lead inicial:', err));

            // Close Confirmation Modal
            modal.classList.add('hidden');

            // Open Survey Modal
            surveyModal.classList.remove('hidden');
            renderIntro();
        });
    }

    // Carousel Seamless Loop Check (Optional safeguard)
    // The CSS animation handles the loop, but we ensure the track width is correct
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        // Ensure we have enough items for a smooth loop?
        // We already duplicated them in HTML, so this should be fine.
    });

    // --- Countdown Timer Logic ---
    function startCountdown() {
        const deadline = new Date("2025-12-05T23:59:59").getTime();
        const urgencySection = document.getElementById('urgency-section');

        if (!urgencySection) return;

        const timer = setInterval(function () {
            const now = new Date().getTime();
            const t = deadline - now;

            if (t >= 0) {
                const days = Math.floor(t / (1000 * 60 * 60 * 24));
                const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((t % (1000 * 60)) / 1000);

                document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
                document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
                document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
                document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

                // Show section if hidden
                urgencySection.classList.remove('hidden');
            } else {
                clearInterval(timer);
                urgencySection.classList.add('hidden'); // Hide if expired
            }
        }, 1000);
    }

    // --- N8N WEBHOOK URL ---
    // Aponta para a Netlify Function (Proxy Seguro)
    const N8N_WEBHOOK_URL = '/.netlify/functions/collect-lead';

    // Helper to send to n8n
    function submitToN8n(data, type = 'lead') {
        const url = `${N8N_WEBHOOK_URL}?type=${type}`;
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    // --- Survey Logic ---
    const surveyModal = document.getElementById('survey-modal');
    const surveyContainer = document.getElementById('survey-container');
    const surveyProgress = document.getElementById('survey-progress');
    const btnSurveyNext = document.getElementById('btn-survey-next');
    const btnSurveyBack = document.getElementById('btn-survey-back');

    let currentStep = 0;
    let surveyData = {};
    let initialLeadData = {}; // Store data from the first form

    // Mapeamento de Perguntas para Chaves do Sellflux
    const sellfluxKeys = {
        q1: 'custom-qntd-pessoas-1-14',
        q2: 'custom-tipo-preparo-1-13',
        q3: 'custom-possui-barra-1-12',
        q4: 'custom-conhecia-o-kit-1-11',
        q5: 'custom-churrasqueira-ja-esta-pronta-1-10',
        q6: 'custom-maior-dificuldade-1-9',
        q7: 'custom-objecao-compra-1-8'
    };

    const questions = [
        {
            id: 'q1',
            question: 'Para quantas pessoas você costuma fazer churrasco?',
            type: 'radio',
            options: [
                { label: 'Até 10 pessoas (família próxima)', value: 'ate_10' },
                { label: '10-20 pessoas (amigos próximos)', value: '10_20' },
                { label: '20+ pessoas (eventos/festas)', value: '20_mais' }
            ]
        },
        {
            id: 'q2',
            question: 'Quais cortes você mais prepara? (Máx 3)',
            type: 'checkbox',
            maxSelect: 3,
            options: [
                { label: 'Picanha', value: 'picanha', icon: '🥩' },
                { label: 'Costela', value: 'costela', icon: '🍖' },
                { label: 'Fraldinha/Contra-filé', value: 'fraldinha', icon: '🥓' },
                { label: 'Linguiça/Medalhões', value: 'linguica', icon: '🌭' },
                { label: 'Frango/Peixe', value: 'frango_peixe', icon: '🍗' }
            ]
        },
        {
            id: 'q3',
            question: 'Sua churrasqueira tem barra frontal?',
            type: 'radio',
            options: [
                { label: 'Sim, tem barra frontal', value: 'sim_barra' },
                { label: 'Não, é só alvenaria', value: 'nao_alvenaria' },
                { label: 'Não tenho churrasqueira ainda (em obra)', value: 'em_obra' }
            ]
        },
        {
            id: 'q4',
            question: 'Você já conhecia o Kit Suporte Suspenso?',
            type: 'radio',
            options: [
                { label: 'Sim, estava procurando especificamente', value: 'procurando' },
                { label: 'Já ouvi falar, mas não conheço detalhes', value: 'ouvi_falar' },
                { label: 'Não, é primeira vez que vejo', value: 'primeira_vez' },
                { label: 'Já vi na casa de amigos', value: 'vi_amigos' }
            ]
        },
        {
            id: 'q5',
            question: 'Sua churrasqueira já está pronta ou está em obra/reforma?',
            type: 'radio',
            options: [
                { label: 'Em obra/reforma - ainda construindo', value: 'em_obra' },
                { label: 'Pronta - só trocar o kit', value: 'pronta' },
                { label: 'Planejando - ainda escolhendo', value: 'planejando' }
            ]
        },
        {
            id: 'q6',
            question: 'Qual é sua maior dificuldade no churrasco hoje?',
            type: 'checkbox',
            options: [
                { label: 'Queimar a carne (não acerto o ponto)', value: 'queimar_carne' },
                { label: 'Limpeza demorada (trabalheira)', value: 'limpeza' },
                { label: 'Subir o nível da Carne sem tirar a Grelha', value: 'subir_nivel' },
                { label: 'Colocar ou trocar o Carvão', value: 'carvao' },
                { label: 'Preparar vários tipos de carne ao mesmo tempo', value: 'varios_tipos' },
                { label: 'Servir o churrasco de 1 só vez', value: 'servir_vez' }
            ]
        },
        {
            id: 'q7',
            question: 'O que mais te preocupa na hora de comprar?',
            type: 'radio',
            options: [
                { label: 'Vai caber na minha churrasqueira?', value: 'caber' },
                { label: 'O preço (é o investimento)', value: 'preco' },
                { label: 'Prazo de entrega', value: 'prazo' },
                { label: 'Qualidade do material', value: 'qualidade' },
                { label: 'Se enferruja ou é destruído pela maresia', value: 'ferrugem' }
            ]
        }
    ];

    // Extra question for "Em obra" logic
    const obraQuestion = {
        id: 'q5_extra',
        question: 'Qual a previsão para terminar a obra?',
        type: 'radio',
        options: [
            { label: 'Até final do ano', value: 'final_ano' },
            { label: 'Primeiro trimestre 2026', value: 'tri_2026' },
            { label: 'Ainda sem data definida', value: 'sem_data' }
        ]
    };

    function renderIntro() {
        // Hide Progress and Nav initially
        document.querySelector('.bg-gray-100').classList.add('hidden'); // Hide header/progress
        document.querySelector('.border-t').classList.add('hidden'); // Hide footer/nav

        const firstName = (initialLeadData.name || '').split(' ')[0];

        const html = `
            <div class="text-center py-4">
                <div class="mb-6 flex justify-center">
                    <div class="bg-orange-100 p-4 rounded-full">
                        <span class="text-4xl">📋</span>
                    </div>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    ${firstName}, nosso time já irá entrar em contato com você.
                </h3>
                <p class="text-lg text-gray-600 mb-8">
                    Mas antes precisamos te conhecer melhor...
                </p>
                
                <div class="bg-gray-50 text-left p-6 rounded-xl border border-gray-200 mb-8">
                    <p class="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">Responda algumas breves perguntas e receba:</p>
                    <ul class="space-y-3">
                        <li class="flex items-start">
                            <span class="text-green-500 font-bold mr-2">✓</span>
                            <span class="text-gray-700">Recomendação exata para seus cortes favoritos</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 font-bold mr-2">✓</span>
                            <span class="text-gray-700">Kit dimensionado para seu número de convidados</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-green-500 font-bold mr-2">✓</span>
                            <span class="text-gray-700">Instruções específicas para seu tipo de churrasqueira</span>
                        </li>
                    </ul>
                </div>

                <button onclick="startSurvey()" class="w-full bg-primary hover:bg-orange-600 text-white font-bold text-xl py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-[1.02] uppercase tracking-wide mb-4">
                    Iniciar Formulário
                </button>
                
                <button onclick="skipSurvey()" class="text-gray-500 hover:text-gray-700 font-medium text-sm underline">
                    Pular e ir para o site
                </button>
            </div>
        `;
        surveyContainer.innerHTML = html;
    }

    window.skipSurvey = function () {
        window.location.href = 'https://www.olhonabrasa.com.br/';
    };

    window.startSurvey = function () {
        // Show Header and Footer again
        document.querySelector('.bg-gray-100').classList.remove('hidden');
        document.querySelector('.border-t').classList.remove('hidden');
        renderQuestion(0);
    };

    function renderQuestion(index) {
        // Handle "Em obra" conditional logic
        let question = questions[index];

        // If we just answered "Em obra" in Q5, show the extra question
        if (index === 5 && surveyData['q5'] === 'em_obra' && !surveyData['q5_extra_shown']) {
            // Logic to insert or show extra question could be complex. 
            // Simpler approach: Check if we need to show extra question based on previous answer
        }

        // Update Progress
        const progress = ((index + 1) / questions.length) * 100;
        surveyProgress.style.width = `${progress}%`;

        // Render HTML
        let html = `
            <h4 class="text-2xl font-bold text-gray-800 mb-6">${question.question.replace('{name}', initialLeadData.name || 'Churrasqueiro')}</h4>
            <div class="grid grid-cols-1 gap-3">
        `;

        question.options.forEach(opt => {
            const isSelected = Array.isArray(surveyData[question.id])
                ? surveyData[question.id].includes(opt.value)
                : surveyData[question.id] === opt.value;

            const activeClass = isSelected ? 'border-primary bg-orange-50 ring-2 ring-primary' : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50';

            html += `
                <div class="cursor-pointer relative flex items-center p-4 rounded-xl border-2 transition-all ${activeClass}" onclick="selectOption('${question.id}', '${opt.value}', '${question.type}')">
                    <input type="${question.type}" name="${question.id}" value="${opt.value}" class="hidden" ${isSelected ? 'checked' : ''}>
                    ${opt.icon ? `<span class="text-2xl mr-3">${opt.icon}</span>` : ''}
                    <span class="font-medium text-gray-700 text-lg">${opt.label}</span>
                    ${isSelected ? '<span class="absolute right-4 text-primary font-bold">✓</span>' : ''}
                </div>
            `;
        });

        html += `</div>`;
        surveyContainer.innerHTML = html;

        // Button State
        btnSurveyBack.classList.toggle('hidden', index === 0);
        btnSurveyNext.textContent = index === questions.length - 1 ? 'Ver Minha Recomendação' : 'Próximo →';

        // Disable Next until selected
        const hasAnswer = surveyData[question.id] && (Array.isArray(surveyData[question.id]) ? surveyData[question.id].length > 0 : true);
        btnSurveyNext.disabled = !hasAnswer;
    }

    window.selectOption = function (qId, value, type) {
        if (type === 'radio') {
            surveyData[qId] = value;
            // Auto advance for radio? Maybe better to let user click next for confirmation feel
            // But for "dynamic" feel, auto-advance is nice. Let's keep manual for now to avoid mistakes.
        } else if (type === 'checkbox') {
            if (!surveyData[qId]) surveyData[qId] = [];

            const idx = surveyData[qId].indexOf(value);
            if (idx > -1) {
                surveyData[qId].splice(idx, 1);
            } else {
                // Check max select
                const q = questions.find(q => q.id === qId);
                if (q.maxSelect && surveyData[qId].length >= q.maxSelect) return;
                surveyData[qId].push(value);
            }
        }
        renderQuestion(currentStep);
    };

    btnSurveyNext.addEventListener('click', function () {
        // Conditional Logic Check
        if (currentStep === 4 && surveyData['q5'] === 'em_obra') {
            // Insert extra question if not already there
            if (!questions.find(q => q.id === 'q5_extra')) {
                questions.splice(5, 0, obraQuestion);
            }
        } else if (currentStep === 4 && surveyData['q5'] !== 'em_obra') {
            // Remove extra question if it exists and we changed mind
            const idx = questions.findIndex(q => q.id === 'q5_extra');
            if (idx > -1) questions.splice(idx, 1);
        }

        if (currentStep < questions.length - 1) {
            currentStep++;
            renderQuestion(currentStep);
        } else {
            submitSurvey();
        }
    });

    btnSurveyBack.addEventListener('click', function () {
        if (currentStep > 0) {
            currentStep--;
            renderQuestion(currentStep);
        }
    });

    function submitSurvey() {
        btnSurveyNext.textContent = 'Enviando...';
        btnSurveyNext.disabled = true;

        // Map answers to Sellflux Keys
        const mappedSurvey = {};
        for (const [key, value] of Object.entries(surveyData)) {
            const sellfluxKey = sellfluxKeys[key] || key;
            mappedSurvey[sellfluxKey] = value;
        }

        const payload = {
            ...initialLeadData,
            ...mappedSurvey, // Spread mapped keys directly into root or keep in survey object? 
            // User asked to use Sellflux labels. Usually flat structure is better for n8n -> Sellflux.
            // But let's keep it clean. I will put them in 'survey' object but with correct keys, 
            // OR merge them. Let's merge them to root for easier mapping in n8n if needed, 
            // OR keep in survey object. Let's keep in survey object for organization.
            survey: mappedSurvey
        };

        submitToN8n(payload, 'survey')
            .then(() => {
                window.location.href = 'https://www.olhonabrasa.com.br/';
            })
            .catch(err => {
                console.error('Erro ao enviar:', err);
                // Fallback redirect
                window.location.href = 'https://www.olhonabrasa.com.br/';
            });
    }

    startCountdown();
});
