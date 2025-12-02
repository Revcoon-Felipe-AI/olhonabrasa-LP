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
            phoneInput.value = rawPhone; // Update input value for submission

            // Track Facebook Lead
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {}, { eventID: uniqueEventID });
            }

            // Submit Form
            form.submit();
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

    startCountdown();
});
