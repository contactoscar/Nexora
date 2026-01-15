// ✅ Backend con CORS restrictivo y validación básica
export default async function handler(req, res) {
  // 🔒 CORS - Solo tus dominios pueden usar tu API
  const allowedOrigins = [
    'https://contactoscar.github.io',  // ✅ Tu GitHub Pages (acepta cualquier página)
    'https://nexora-flame.vercel.app',
    'http://localhost:3000' // para desarrollo local
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { messages } = req.body;

    // ✅ Validación básica
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Formato inválido' });
    }

    // ✅ Límite de longitud para evitar mensajes gigantes
    const totalLength = messages.reduce((sum, msg) => sum + (msg.content?.length || 0), 0);
    if (totalLength > 10000) {
      return res.status(400).json({ error: 'Mensaje demasiado largo' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000 // ✅ Limita respuesta para controlar costos
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      message: data.choices[0].message.content.trim()
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la solicitud'
    });
  }
}
