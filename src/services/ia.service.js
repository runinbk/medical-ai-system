
const axios = require('axios');

class IAService {
    constructor() {
        this.baseURL = process.env.AI_SERVICE_URL;
        this.apiKey = process.env.AI_API_KEY;
        
        // Definir umbrales de gravedad
        this.umbrales = {
            BAJA: 0.3,
            MEDIA: 0.5,
            ALTA: 0.7,
            CRITICA: 0.85
        };

        // Mapeo de hallazgos a recomendaciones
        this.recomendaciones = {
            'neumonía': [
                'Realizar seguimiento con radiografía en 7 días',
                'Considerar tratamiento antibiótico',
                'Monitorear saturación de oxígeno'
            ],
            'derrame pleural': [
                'Evaluación urgente por especialista',
                'Considerar toracocentesis',
                'Realizar exámenes complementarios'
            ],
            'nódulo pulmonar': [
                'Programar TAC de tórax',
                'Seguimiento en 3 meses',
                'Evaluación por oncología si >8mm'
            ],
            'default': [
                'Seguimiento según protocolo estándar',
                'Consultar con especialista si hay deterioro',
                'Documentar evolución'
            ]
        };
    }

    async analizarImagen(imagenUrl, tipoAnalisis) {
        try {
            const response = await axios.post(`${this.baseURL}/analizar`, {
                imagen_url: imagenUrl,
                tipo_analisis: tipoAnalisis,
                config: {
                    threshold: 0.2, // Umbral mínimo de detección
                    enhance: true,  // Mejorar imagen automáticamente
                    format: 'detailed' // Formato de respuesta detallado
                }
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
        const {
            detections,      // Array de objetos con hallazgos y probabilidades
            heatmap_url,    // URL del mapa de calor de detecciones
            measurements,    // Mediciones específicas
            confidence      // Confianza global del análisis
        } = resultadoIA;

        // Procesar detecciones
        const hallazgos = this.procesarHallazgos(detections);
        
        // Determinar gravedad
        const gravedad = this.determinarGravedad(hallazgos);
        
        // Generar recomendaciones
        const recomendaciones = this.generarRecomendaciones(hallazgos);

        return {
            anomalia_detectada: hallazgos.descripcion,
            gravedad: gravedad,
            confianza: confidence,
            recomendaciones: recomendaciones,
            detalles: {
                heatmap_url,
                measurements,
                hallazgos: hallazgos.detallados
            }
        };
    }

    procesarHallazgos(detections) {
        // Procesar y estructurar los hallazgos detectados
        const hallazgosDetallados = detections.map(detection => ({
            tipo: detection.label,
            probabilidad: detection.probability,
            ubicacion: detection.location,
            dimensiones: detection.dimensions,
            severidad: this.calcularSeveridad(detection)
        }));

        // Ordenar por probabilidad/severidad
        hallazgosDetallados.sort((a, b) => b.probabilidad - a.probabilidad);

        return {
            descripcion: hallazgosDetallados
                .map(h => `${h.tipo} (${(h.probabilidad * 100).toFixed(1)}%)`)
                .join('; '),
            detallados: hallazgosDetallados
        };
    }

    calcularSeveridad(detection) {
        const { probability, dimensions, characteristics } = detection;
        
        // Ponderación de factores para severidad
        const factores = {
            tamano: 0.4,    // 40% basado en dimensiones
            prob: 0.3,      // 30% basado en probabilidad
            caract: 0.3     // 30% basado en características específicas
        };

        // Cálculo de severidad por tamaño relativo
        const severidadTamano = dimensions ? 
            (dimensions.width * dimensions.height) / (1024 * 1024) : 0.5;

        // Características específicas que aumentan severidad
        const caracteristicasRiesgo = [
            'irregular',
            'invasive',
            'multiple',
            'bilateral'
        ];

        const severidadCaract = characteristics ? 
            características.filter(c => caracteristicasRiesgo.includes(c)).length / 
            caracteristicasRiesgo.length : 
            0.5;

        // Cálculo ponderado final
        return (
            factores.tamano * severidadTamano +
            factores.prob * probability +
            factores.caract * severidadCaract
        );
    }

    determinarGravedad(hallazgos) {
        // Obtener la máxima severidad de los hallazgos
        const maxSeveridad = Math.max(
            ...hallazgos.detallados.map(h => h.severidad)
        );

        // Determinar nivel de gravedad según umbrales
        if (maxSeveridad >= this.umbrales.CRITICA) return 'CRITICA';
        if (maxSeveridad >= this.umbrales.ALTA) return 'ALTA';
        if (maxSeveridad >= this.umbrales.MEDIA) return 'MEDIA';
        return 'BAJA';
    }

    generarRecomendaciones(hallazgos) {
        let recomendacionesSet = new Set();

        // Agregar recomendaciones específicas por cada hallazgo
        hallazgos.detallados.forEach(hallazgo => {
            const recsEspecificas = this.recomendaciones[hallazgo.tipo.toLowerCase()] || 
                                  this.recomendaciones.default;
            
            recsEspecificas.forEach(rec => recomendacionesSet.add(rec));
        });

        // Agregar recomendaciones basadas en severidad
        const maxSeveridad = Math.max(...hallazgos.detallados.map(h => h.severidad));
        if (maxSeveridad >= this.umbrales.ALTA) {
            recomendacionesSet.add('Requiere atención prioritaria');
            recomendacionesSet.add('Considerar interconsulta especializada');
        }

        return Array.from(recomendacionesSet).join('\n');
    }

    async validarResultados(diagnosticoId, medicoId, validacion) {
        try {
            // Registrar retroalimentación para mejora del modelo
            await this.registrarRetroalimentacion(diagnosticoId, validacion);

            return {
                validado: true,
                actualizado: new Date(),
                validador: medicoId,
                comentarios: validacion.comentarios
            };
        } catch (error) {
            console.error('Error en validación:', error);
            throw new Error('Error al validar resultados');
        }
    }

    async registrarRetroalimentacion(diagnosticoId, validacion) {
        // Enviar retroalimentación al servicio de IA para mejora continua
        try {
            await axios.post(`${this.baseURL}/feedback`, {
                diagnostico_id: diagnosticoId,
                validacion: validacion,
                timestamp: new Date()
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
        } catch (error) {
            console.error('Error al registrar retroalimentación:', error);
            // No lanzar error para no interrumpir el flujo principal
        }
    }
}

module.exports = new IAService();