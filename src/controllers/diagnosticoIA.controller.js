// src/controllers/diagnosticoIA.controller.js
const { DiagnosticoIA, ModeloIA, Paciente, Examen, Usuario } = require('../models');
const IAService = require('../services/ia.service');
const path = require('path');

const diagnosticoIAController = {
    // Realizar nuevo análisis
    analizar: async (req, res) => {
        try {
            const { paciente_id, examen_id, tipo_analisis } = req.body;

            // Verificar archivo
            if (!req.files || !req.files.imagen) {
                return res.status(400).json({
                    msg: 'No se ha proporcionado imagen para analizar'
                });
            }

            // Verificar paciente y examen
            const paciente = await Paciente.findByPk(paciente_id);
            if (!paciente) {
                return res.status(404).json({
                    msg: 'Paciente no encontrado'
                });
            }

            // Obtener modelo IA activo para el tipo de análisis
            const modelo = await ModeloIA.findOne({
                where: {
                    tipo_analisis,
                    activo: true
                },
                order: [['created_at', 'DESC']]
            });

            if (!modelo) {
                return res.status(404).json({
                    msg: 'No hay modelo disponible para este tipo de análisis'
                });
            }

            // Procesar y guardar imagen
            const imagen = req.files.imagen;
            const nombreArchivo = `${Date.now()}-${imagen.name}`;
            const uploadPath = path.join(__dirname, '../../uploads/imagenes', nombreArchivo);
            await imagen.mv(uploadPath);

            // Realizar análisis con IA
            const resultadoIA = await IAService.analizarImagen(nombreArchivo, tipo_analisis);
            const interpretacion = IAService.interpretarResultados(resultadoIA);

            // Crear registro de diagnóstico
            const diagnostico = await DiagnosticoIA.create({
                paciente_id,
                examen_id,
                modelo_id: modelo.id,
                imagen_url: nombreArchivo,
                resultado: resultadoIA,
                anomalia_detectada: interpretacion.anomalia_detectada,
                gravedad: interpretacion.gravedad,
                confianza: interpretacion.confianza,
                recomendaciones: interpretacion.recomendaciones
            });

            res.status(201).json({
                msg: 'Análisis completado exitosamente',
                diagnostico: {
                    ...diagnostico.toJSON(),
                    detalles: interpretacion.detalles
                }
            });
        } catch (error) {
            console.error('Error en análisis IA:', error);
            res.status(500).json({
                msg: 'Error al realizar el análisis'
            });
        }
    },

    // Obtener todos los diagnósticos
    obtenerTodos: async (req, res) => {
        try {
            const diagnosticos = await DiagnosticoIA.findAll({
                where: { activo: true },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    },
                    {
                        model: ModeloIA,
                        as: 'modelo',
                        attributes: ['nombre', 'version']
                    },
                    {
                        model: Usuario,
                        as: 'validador',
                        attributes: ['nombre']
                    }
                ],
                order: [['fecha', 'DESC']]
            });

            res.json(diagnosticos);
        } catch (error) {
            console.error('Error al obtener diagnósticos:', error);
            res.status(500).json({
                msg: 'Error al obtener diagnósticos'
            });
        }
    },

    // Obtener diagnóstico por ID
    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const diagnostico = await DiagnosticoIA.findOne({
                where: { id, activo: true },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    },
                    {
                        model: ModeloIA,
                        as: 'modelo',
                        attributes: ['nombre', 'version']
                    },
                    {
                        model: Usuario,
                        as: 'validador',
                        attributes: ['nombre']
                    }
                ]
            });

            if (!diagnostico) {
                return res.status(404).json({
                    msg: 'Diagnóstico no encontrado'
                });
            }

            res.json(diagnostico);
        } catch (error) {
            console.error('Error al obtener diagnóstico:', error);
            res.status(500).json({
                msg: 'Error al obtener diagnóstico'
            });
        }
    },

    // Validar diagnóstico
    validar: async (req, res) => {
        try {
            const { id } = req.params;
            const { estado, comentarios_medico } = req.body;

            const diagnostico = await DiagnosticoIA.findOne({
                where: { id, activo: true }
            });

            if (!diagnostico) {
                return res.status(404).json({
                    msg: 'Diagnóstico no encontrado'
                });
            }

            // Validar diagnóstico
            const validacion = await IAService.validarResultados(id, req.usuario.id, {
                estado,
                comentarios: comentarios_medico
            });

            await diagnostico.update({
                estado,
                comentarios_medico,
                validado_por: req.usuario.id
            });

            res.json({
                msg: 'Diagnóstico validado exitosamente',
                diagnostico
            });
        } catch (error) {
            console.error('Error al validar diagnóstico:', error);
            res.status(500).json({
                msg: 'Error al validar diagnóstico'
            });
        }
    },

    // Obtener diagnósticos por paciente
    obtenerPorPaciente: async (req, res) => {
        try {
            const { paciente_id } = req.params;
            
            const diagnosticos = await DiagnosticoIA.findAll({
                where: { 
                    paciente_id,
                    activo: true
                },
                include: [
                    {
                        model: ModeloIA,
                        as: 'modelo',
                        attributes: ['nombre', 'version']
                    },
                    {
                        model: Usuario,
                        as: 'validador',
                        attributes: ['nombre']
                    }
                ],
                order: [['fecha', 'DESC']]
            });

            res.json(diagnosticos);
        } catch (error) {
            console.error('Error al obtener diagnósticos del paciente:', error);
            res.status(500).json({
                msg: 'Error al obtener diagnósticos'
            });
        }
    }
};

module.exports = diagnosticoIAController;