export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { model, provider, messages, temperature, max_tokens } = req.body;
    
    // Default routing ke OpenRouter
    let endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    let apiKey = process.env.OPENROUTER_API_KEY;

    // Jika yang dipilih adalah Ai-Router (GPT-5.5)
    if (provider === 'Ai-Router') {
        endpoint = 'https://api.ai-router.dev/v1/chat/completions';
        apiKey = process.env.AIROUTER_API_KEY;
    }

    if (!apiKey) {
        return res.status(500).json({ 
            error: `API Key belum dikonfigurasi di Environment Variables Vercel untuk ${provider}.` 
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
            throw new Error(data.error?.message || `Gagal menghubungi API dari ${provider}.`);
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
