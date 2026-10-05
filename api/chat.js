export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { model, provider, messages, temperature, max_tokens } = req.body;

    let endpoint = '';
    let apiKey = '';

    // Switch Case Otomatis Berdasarkan Penyedia
    switch (provider) {
        case 'Google':
            endpoint = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
            apiKey = process.env.GEMINI_API_KEY;
            break;
        case 'Groq':
            endpoint = 'https://api.groq.com/openai/v1/chat/completions';
            apiKey = process.env.GROQ_API_KEY;
            break;
        case 'DeepInfra':
            endpoint = 'https://api.deepinfra.com/v1/openai/chat/completions';
            apiKey = process.env.DEEPINFRA_API_KEY;
            break;
        case 'Neosantara':
            endpoint = 'https://app.neosantara.xyz/v1/chat/completions';
            apiKey = process.env.NEOSANTARA_API_KEY;
            break;
        case 'Flushapi':
            endpoint = 'https://flushapi.fun/v1/chat/completions';
            apiKey = process.env.FLUSHAPI_API_KEY;
            break;
        case 'Kiraai':
            endpoint = 'https://kiraai.vn/v1/chat/completions';
            apiKey = process.env.KIRAAI_API_KEY;
            break;
        case 'Careke (Gemini)':
            endpoint = 'https://api.careke.cn/v1/chat/completions';
            apiKey = process.env.CAREKE_GEMINI_KEY;
            break;
        case 'Careke (Claude)':
            endpoint = 'https://api.careke.cn/v1/chat/completions';
            apiKey = process.env.CAREKE_CLAUDE_KEY;
            break;
        case 'Justwoker':
            endpoint = 'https://api.justwoker.icu/v1/chat/completions';
            apiKey = process.env.JUSTWOKER_API_KEY;
            break;
        case 'Kid1412':
            endpoint = 'https://napi.kid1412.qzz.io/v1/chat/completions';
            apiKey = process.env.KID1412_API_KEY;
            break;
        case 'Ai-Router':
            endpoint = 'https://api.ai-router.dev/v1'; // Endpoint khusus untuk model GPT-5 bayangan
            if (model.includes('gpt-') || model.includes('codex')) {
                endpoint = 'https://api.ai-router.dev/v1/chat/completions';
            }
            apiKey = process.env.AIROUTER_API_KEY;
            break;
        case 'OpenRouter':
        default:
            endpoint = 'https://openrouter.ai/api/v1/chat/completions';
            apiKey = process.env.OPENROUTER_API_KEY;
            break;
    }

    if (!apiKey) {
        return res.status(500).json({ 
            error: `API Key untuk provider ${provider} belum dikonfigurasi di Environment Variables Vercel.` 
        });
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://lex-ai.vercel.app',
                'X-Title': 'Lex-AI'
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: temperature || 0.7,
                max_tokens: max_tokens || 2048
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || `Gagal menghubungi API ${provider}.`);
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
