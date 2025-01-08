const OpenAI = require("openai");
const chatbotService = require("../services/chatbot.service");
require('dotenv').config();

// Verifica que la key existe
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY no está definida en las variables de entorno');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'tu-api-key-aquí'
});

const chatbotResponse = async (req, res) => {
  try {
    const { mensaje } = req.body;
    console.log('Mensaje recibido:', mensaje);
    
    // El middleware ya verificó el token, así que podemos usar req.userId
    const contexto = await chatbotService.generarContexto(mensaje);
    console.log('Contexto generado:', contexto);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: contexto },
        { role: "user", content: mensaje }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const respuesta = completion.choices[0].message.content;
    console.log('Respuesta de OpenAI:', respuesta);

    res.json({ respuesta });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud del chatbot' });
  }
};

module.exports = {
  chatbotResponse
}; 