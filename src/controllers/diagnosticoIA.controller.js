
const { DiagnosticoIA, Usuario, Paciente } = require('../models');
const IAService = require('../services/ia.service');

const diagnosticoIAController = {
    // Crear nuevo diagnóstico
    crear: async (req, res) => {
        try {
            const { 
                id_paciente, 
                diagnostico_ia, 
                imagen_original 
            } = req.body;

            // Verificar que se proporcionen los campos requeridos
            if (!id_paciente || !diagnostico_ia || !imagen_original) {
                return res.status(400).json({
                    msg: 'Todos los campos requeridos deben ser proporcionados'
                });
            }

            // Verificar paciente
            const paciente = await Paciente.findByPk(id_paciente);
            if (!paciente) {
                return res.status(404).json({
                    msg: 'Paciente no encontrado'
                });
            }

            // Procesar imagen con IA 
            const resultado = await IAService.procesarImagen(imagen_original);
            
            // Crear diagnóstico
            const diagnostico = await DiagnosticoIA.create({
                id_paciente,
                id_user: req.usuario.id, // Tomado del token JWT
                diagnostico_ia,
                imagen_original,
                imagen_marcada_ia: resultado.imagen_marcada
            });

            res.status(201).json({
                msg: 'Diagnóstico creado exitosamente',
                diagnostico
            });
        } catch (error) {
            console.error('Error al crear diagnóstico:', error);
            res.status(500).json({
                msg: 'Error al crear el diagnóstico'
            });
        }
    },

    // Obtener todos los diagnósticos
    obtenerTodos: async (req, res) => {
        try {
            const diagnosticos = await DiagnosticoIA.findAll({
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'apellido']
                    },
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['nombre', 'apellido']
                    }
                ],
                order: [['created_at', 'DESC']]
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
                where: { id },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'apellido']
                    },
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['nombre', 'apellido']
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

    // Actualizar diagnóstico médico
    actualizarDiagnosticoMedico: async (req, res) => {
        try {
            const { id } = req.params;
            const { diagnostico_medico } = req.body;

            const diagnostico = await DiagnosticoIA.findOne({
                where: { id }
            });

            if (!diagnostico) {
                return res.status(404).json({
                    msg: 'Diagnóstico no encontrado'
                });
            }

            // Actualizar solo el diagnóstico médico
            await diagnostico.update({
                diagnostico_medico
            });

            res.json({
                msg: 'Diagnóstico médico actualizado exitosamente',
                diagnostico
            });
        } catch (error) {
            console.error('Error al actualizar diagnóstico médico:', error);
            res.status(500).json({
                msg: 'Error al actualizar diagnóstico médico'
            });
        }
    },

    // Obtener diagnósticos por paciente
    obtenerPorPaciente: async (req, res) => {
        try {
            const { id_paciente } = req.params;
            
            const diagnosticos = await DiagnosticoIA.findAll({
                where: { id_paciente },
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['nombre', 'apellido']
                    }
                ],
                order: [['created_at', 'DESC']]
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