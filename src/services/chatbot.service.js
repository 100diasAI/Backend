const productos = require("../models/assets/productos.json");
const sucursales = require("../models/assets/sucursales.json");

class ChatbotService {
  constructor() {
    this.obtenerInfoStock = this.obtenerInfoStock.bind(this);
    this.generarContexto = this.generarContexto.bind(this);
    // Procesamos los datos una sola vez al iniciar el servicio
    this.productosInfo = this.procesarProductos();
    this.sucursalesInfo = this.procesarSucursales();
  }

  procesarProductos() {
    // Creamos un resumen de productos por categoría
    const resumen = {};
    productos.forEach(producto => {
      producto.categoria.forEach(cat => {
        if (!resumen[cat]) {
          resumen[cat] = {
            cantidad: 0,
            rangoPrecios: { min: Infinity, max: -Infinity }
          };
        }
        resumen[cat].cantidad++;
        const precio = Number(producto.precio);
        resumen[cat].rangoPrecios.min = Math.min(resumen[cat].rangoPrecios.min, precio);
        resumen[cat].rangoPrecios.max = Math.max(resumen[cat].rangoPrecios.max, precio);
      });
    });
    return resumen;
  }

  procesarSucursales() {
    // Creamos un resumen de sucursales por ciudad
    return sucursales.reduce((acc, sucursal) => {
      if (!acc[sucursal.nombre]) {
        acc[sucursal.nombre] = [];
      }
      acc[sucursal.nombre].push(sucursal.capital);
      return acc;
    }, {});
  }

  async obtenerInfoStock() {
    try {
      // Implementar lógica para obtener información del stock
      const stockInfo = {
        remeras: {
          XS: 10,
          S: 15,
          M: 20,
          L: 15,
          XL: 10
        },
        pantalones: {
          28: 8,
          30: 12,
          32: 15,
          34: 10,
          36: 5
        }
      };
      return stockInfo;
    } catch (error) {
      console.error('Error al obtener info de stock:', error);
      throw error;
    }
  }

  async generarContexto(pregunta) {
    try {
        const stockInfo = await this.obtenerInfoStock();
        const preciosInfo = this.obtenerInfoPrecios(pregunta);
        const sucursalesInfo = this.obtenerInfoSucursales(pregunta);
        
        // Información adicional del negocio
        const contextoBusiness = {
            politicaDevoluciones: "30 días para cambios y devoluciones con ticket de compra",
            envios: {
                nacional: "2-5 días hábiles",
                costos: {
                    capitalFederal: "Gratis en compras mayores a $1000",
                    interior: "Según peso y distancia"
                }
            },
            mediosPago: ["Tarjetas de crédito", "Débito", "Transferencia", "Efectivo"],
            descuentos: {
                efectivo: "15% off",
                debito: "10% off",
                cuotas: "Hasta 6 cuotas sin interés"
            },
            tendencias: {
                colores: ["Verde sage", "Azul marino", "Terracota"],
                estilos: ["Minimalista", "Oversized", "Sustentable"],
                temporada: "Primavera-Verano 2024"
            }
        };

        const contexto = `
            Eres un experto asesor de moda y atención al cliente para nuestra tienda de ropa.

            INFORMACIÓN DE STOCK Y PRODUCTOS:
            ${JSON.stringify(stockInfo, null, 2)}

            PRECIOS Y PROMOCIONES:
            ${JSON.stringify(preciosInfo, null, 2)}

            SUCURSALES:
            ${JSON.stringify(sucursalesInfo, null, 2)}

            INFORMACIÓN GENERAL:
            ${JSON.stringify(contextoBusiness, null, 2)}

            INSTRUCCIONES:
            1. Sé amable y profesional
            2. Ofrece recomendaciones personalizadas basadas en la consulta
            3. Sugiere alternativas cuando algo no está disponible
            4. Menciona promociones relevantes
            5. Prioriza la satisfacción del cliente
            6. Si no tienes información específica, sé honesto y ofrece alternativas

            Responde la siguiente consulta del cliente de manera natural y conversacional.
        `;
        
        return contexto;
    } catch (error) {
        console.error('Error al generar contexto:', error);
        throw error;
    }
  }

  obtenerInfoPrecios(pregunta) {
    // Buscamos productos específicos o categorías mencionadas
    const categorias = Object.keys(this.productosInfo);
    const categoriasMencionadas = categorias.filter(cat => 
      pregunta.includes(cat.toLowerCase())
    );

    if (categoriasMencionadas.length > 0) {
      return categoriasMencionadas.reduce((acc, cat) => {
        acc[cat] = this.productosInfo[cat].rangoPrecios;
        return acc;
      }, {});
    }
    
    return this.productosInfo;
  }

  obtenerInfoSucursales(pregunta) {
    const ciudades = Object.keys(this.sucursalesInfo);
    const ciudadMencionada = ciudades.find(ciudad => 
      pregunta.includes(ciudad.toLowerCase())
    );

    return ciudadMencionada ? 
      { [ciudadMencionada]: this.sucursalesInfo[ciudadMencionada] } : 
      this.sucursalesInfo;
  }

  formatearContexto(contexto) {
    // Formateamos el contexto para el prompt de GPT
    return `
      Eres un asistente de una tienda de ropa. 
      Contexto actual: ${contexto.tipo}
      Datos relevantes: ${JSON.stringify(contexto.datos)}
      
      Reglas:
      1. Responde solo sobre la información proporcionada
      2. Si no tienes suficiente información, pide más detalles
      3. Sé conciso y directo
      4. Mantén un tono amable y profesional
    `;
  }
}

// Exportamos una instancia única
module.exports = new ChatbotService(); 