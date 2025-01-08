require('dotenv').config();
console.log('API Key:', process.env.OPENAI_API_KEY);
const { chatbotResponse } = require('../controllers/chatbot.controller');

async function probarChatbot() {
    const preguntas = [
        // Preguntas de inventario complejas
        "¿Tienen remeras negras talle M con diseños de bandas?",
        "¿Cuál es el rango de precios de los jeans slim fit?",
        
        // Preguntas de recomendación
        "Busco un outfit formal para una entrevista de trabajo",
        "¿Qué me recomiendan para un evento casual de noche?",
        
        // Preguntas de comparación
        "¿Cuál es la diferencia entre sus jeans classic y slim fit?",
        "¿Qué material es mejor para el verano, algodón o lino?",
        
        // Preguntas de disponibilidad y envíos
        "¿Cuánto tarda el envío a Córdoba y cuánto cuesta?",
        "¿Tienen política de devolución? ¿Cómo funciona?",
        
        // Preguntas de tendencias y moda
        "¿Qué colores están de moda esta temporada?",
        "¿Tienen la nueva colección de verano?"
    ];

    for (const pregunta of preguntas) {
        console.log("\n=== Nueva Pregunta ===");
        console.log("Pregunta:", pregunta);
        
        try {
            const req = { body: { mensaje: pregunta } };
            const res = {
                json: (data) => console.log("Respuesta:", data.respuesta),
                status: (code) => ({ json: (data) => console.log("Error:", data) })
            };

            await chatbotResponse(req, res);
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

probarChatbot(); 