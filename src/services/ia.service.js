
const axios = require('axios');

class IAService {
    constructor() {
        this.baseURL = process.env.AI_SERVICE_URL;
        this.apiKey = process.env.AI_API_KEY;
    }

    async analizarImagen(imagenUrl, tipoAnalisis) {
        try {
            const response = await axios.post(`${this.baseURL}/analizar`, {
                imagen_url: imagenUrl,
                tipo_analisis: tipoAnalisis
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error en análisis IA:', error);
            throw new Error('Error al procesar la imagen con IA');
        }
    }

    interpretarResultados(resultadoIA) {
        // Aquí iría la lógica para interpretar los resultados del modelo
        // y convertirlos al formato que necesitamos
        const {
            detections,
            confidence,
            recommendations
        } = resultadoIA;

        // Determinar gravedad basada en detecciones
        const gravedad = this.determinarGravedad(detections);

        return {
            anomalia_detectada: detections.join(', '),
            gravedad,
            confianza: confidence,
            recomendaciones: recommendations
        };
    }

    determinarGravedad(detections) {
        // Lógica para determinar la gravedad basada en las detecciones
        // Esto dependerá de las reglas específicas del negocio
        return 'MEDIA'; // Por defecto
    }
}

module.exports = new IAService();