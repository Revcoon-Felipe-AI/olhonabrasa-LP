exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const data = body.payload.data;

        // 1. URL do Webhook do Sellflux (Via Variável de Ambiente para Segurança)
        const SELLFLUX_WEBHOOK_URL = process.env.SELLFLUX_WEBHOOK_URL;

        // 2. Tratamento de dados básico
        // O Sellflux geralmente prefere telefone com 55 (DDI)
        let whatsapp = data.whatsapp.replace(/\D/g, ''); // Remove tudo que não é número
        if (whatsapp.length <= 11) {
            whatsapp = '55' + whatsapp; // Adiciona DDI do Brasil se não tiver
        }

        // 3. Montar o Objeto para o Sellflux
        const payloadSellflux = {
            // Dados Pessoais
            nome: data.name,
            email: data.email.toLowerCase(),
            telefone: whatsapp, // Formato 5511999999999

            // Enviando os cookies para os campos personalizados
            facebook_fbp: data.fbp,
            facebook_fbc: data.fbc,

            // UTMs de Rastreamento
            utm_source: data.utm_source || '',
            utm_medium: data.utm_medium || '',
            utm_campaign: data.utm_campaign || '',
            utm_term: data.utm_term || '',
            utm_content: data.utm_content || '',

            // Metadados extras
            origem_url: data.referrer || '',
            tags: ["lead_site", "captura_organico"]
        };

        // 4. Enviar para o Sellflux
        if (!SELLFLUX_WEBHOOK_URL) {
            console.error("ERRO CRÍTICO: A variável de ambiente SELLFLUX_WEBHOOK_URL não está configurada no Netlify.");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Configuration error: Webhook URL missing." }),
            };
        }

        const response = await fetch(SELLFLUX_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payloadSellflux)
        });

        if (!response.ok) {
            throw new Error(`Erro no Sellflux: ${response.statusText}`);
        }

        console.log("Sucesso ao enviar para Sellflux");

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Lead enviado ao Sellflux e processado." }),
        };

    } catch (error) {
        console.error("Erro na function:", error);
        // Mesmo dando erro no envio ao Sellflux, retornamos 200 para o formulário não quebrar pro usuário
        return { statusCode: 200, body: JSON.stringify({ error: error.message }) };
    }
};
