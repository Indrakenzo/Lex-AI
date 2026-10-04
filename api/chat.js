export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { model, messages, temperature, max_tokens } = req.body;

    try {
        const isGemma = model && model.toLowerCase().includes('gemma');
        const endpoint = isGemma 
            ? 'https://openrouter.ai/api/v1/chat/completions' 
            : 'https://agentrouter.org/api/v1/chat/completions';
        
        const apiKey = isGemma 
            ? process.env.OPENROUTER_API_KEY 
            : process.env.AGENTROUTER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ 
                error: `API Key untuk model ${isGemma ? 'OpenRouter' : 'AgentRouter'} belum dikonfigurasi di Environment Variables Vercel.` 
            });
        }

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
            throw new Error(data.error?.message || "Gagal menghubungi API pihak ketiga.");
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
