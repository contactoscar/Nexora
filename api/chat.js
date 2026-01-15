// ✅ Backend MEJORADO - Rechaza peticiones no autorizadas ANTES de gastar crédito
export default async function handler(req, res) {
  // 🔒 CORS - Solo tus dominios
  const allowedOrigins = [
    'https://contactoscar.github.io',
    'https://nexora-flame.vercel.app',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;

  // ⚠️ CRÍTICO: Manejar OPTIONS primero (preflight CORS)
  if (req.method === 'OPTIONS') {
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    return res.status(200).end();
  }

  // 🛡️ SEGURIDAD 1: Verificar método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // 🛡️ SEGURIDAD 2: Verificar origen ANTES de hacer nada
  if (!allowedOrigins.includes(origin)) {
    console.log('❌ Origen no autorizado:', origin);
    return res.status(403).json({ 
      error: 'Acceso denegado',
      message: 'Origen no autorizado'
    });
  }

  // ✅ Si llega aquí, el origen es válido - añadir CORS
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  try {
    const { messages } = req.body;

    // 🛡️ SEGURIDAD 3: Validación de datos
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Formato inválido' });
    }

    if (messages.length === 0) {
      return res.status(400).json({ error: 'No hay mensajes' });
    }

    // 🛡️ SEGURIDAD 4: Límite de longitud total
    const totalLength = messages.reduce((sum, msg) => sum + (msg.content?.length || 0), 0);
    if (totalLength > 10000) {
      return res.status(400).json({ error: 'Mensaje demasiado largo (máx 10000 caracteres)' });
    }

    // 🛡️ SEGURIDAD 5: Límite de mensajes
    if (messages.length > 50) {
      return res.status(400).json({ error: 'Demasiados mensajes (máx 50)' });
    }

    // ✅ TODO VERIFICADO - Ahora sí llamar a OpenAI
    console.log('✅ Petición autorizada desde:', origin);

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
        max_tokens: 1000 // Limita respuesta para controlar costos
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Error de OpenAI:', errorData);
      throw new Error(`OpenAI error: ${response.status}`);  // ✅ CORREGIDO
    }

    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      message: data.choices[0].message.content.trim()
    });

  } catch (error) {
    console.error('❌ Error en el servidor:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la solicitud',
      message: 'Intenta de nuevo más tarde'
    });
  }
}
