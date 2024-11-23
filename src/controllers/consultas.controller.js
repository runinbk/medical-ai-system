
const { Consulta, Paciente, Medico, Usuario } = require('../models');
const { Op } = require('sequelize');

const consultasController = {
    // Crear consulta
    crear: async (req, res) => {
        try {
            const { paciente_id, medico_id, fecha, sintomas, notas } = req.body;

            // Verificar existencia de paciente y médico
            const paciente = await Paciente.findByPk(paciente_id);
            const medico = await Medico.findByPk(medico_id);

            if (!paciente || !medico) {
                return res.status(404).json({
                    msg: !paciente ? 'Paciente no encontrado' : 'Médico no encontrado'
                });
            }

            // Crear consulta
            const consulta = await Consulta.create({
                paciente_id,
                medico_id,
                fecha,
                sintomas,
                notas
            });

            res.status(201).json({
                msg: 'Consulta agendada exitosamente',
                consulta
            });
        } catch (error) {
            console.error('Error al crear consulta:', error);
            if (error.message === 'El médico no está disponible en ese horario') {
                return res.status(400).json({
                    msg: error.message
                });
            }
            res.status(500).json({
                msg: 'Error al crear consulta'
            });
        }
    },

    // Obtener todas las consultas
    obtenerTodas: async (req, res) => {
        try {
            const consultas = await Consulta.findAll({
                where: { activo: true },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    },
                    {
                        model: Medico,
                        as: 'medico',
                        attributes: ['nombre', 'especialidad']
                    }
                ],
                order: [['fecha', 'DESC']]
            });

            res.json(consultas);
        } catch (error) {
            console.error('Error al obtener consultas:', error);
            res.status(500).json({
                msg: 'Error al obtener consultas'
            });
        }
    },

    // Obtener consulta por ID
    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const consulta = await Consulta.findOne({
                where: { id, activo: true },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    },
                    {
                        model: Medico,
                        as: 'medico',
                        attributes: ['nombre', 'especialidad']
                    }
                ]
            });

            if (!consulta) {
                return res.status(404).json({
                    msg: 'Consulta no encontrada'
                });
            }

            res.json(consulta);
        } catch (error) {
            console.error('Error al obtener consulta:', error);
            res.status(500).json({
                msg: 'Error al obtener consulta'
            });
        }
    },

    // Actualizar consulta
    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { estado, diagnostico_preliminar, tratamiento_prescrito, seguimiento, notas } = req.body;

            const consulta = await Consulta.findOne({
                where: { id, activo: true }
            });

            if (!consulta) {
                return res.status(404).json({
                    msg: 'Consulta no encontrada'
                });
            }

            // Solo permitir actualizar ciertos campos según el estado
            if (consulta.estado === 'COMPLETADA') {
                return res.status(400).json({
                    msg: 'No se puede modificar una consulta completada'
                });
            }

            await consulta.update({
                estado,
                diagnostico_preliminar,
                tratamiento_prescrito,
                seguimiento,
                notas
            });

            res.json({
                msg: 'Consulta actualizada exitosamente',
                consulta
            });
        } catch (error) {
            console.error('Error al actualizar consulta:', error);
            res.status(500).json({
                msg: 'Error al actualizar consulta'
            });
        }
    },

    // Cancelar consulta
    cancelar: async (req, res) => {
        try {
            const { id } = req.params;
            
            const consulta = await Consulta.findOne({
                where: { 
                    id, 
                    activo: true,
                    estado: ['PENDIENTE', 'CONFIRMADA']
                }
            });

            if (!consulta) {
                return res.status(404).json({
                    msg: 'Consulta no encontrada o no se puede cancelar'
                });
            }

            await consulta.update({ 
                estado: 'CANCELADA'
            });

            res.json({
                msg: 'Consulta cancelada exitosamente'
            });
        } catch (error) {
            console.error('Error al cancelar consulta:', error);
            res.status(500).json({
                msg: 'Error al cancelar consulta'
            });
        }
    },

    // Obtener consultas por médico
    obtenerPorMedico: async (req, res) => {
        try {
            const { medico_id } = req.params;
            const { fecha } = req.query;

            let whereClause = {
                medico_id,
                activo: true
            };

            if (fecha) {
                whereClause.fecha = {
                    [Op.gte]: new Date(fecha),
                    [Op.lt]: new Date(new Date(fecha).setDate(new Date(fecha).getDate() + 1))
                };
            }

            const consultas = await Consulta.findAll({
                where: whereClause,
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    }
                ],
                order: [['fecha', 'ASC']]
            });

            res.json(consultas);
        } catch (error) {
            console.error('Error al obtener consultas del médico:', error);
            res.status(500).json({
                msg: 'Error al obtener consultas'
            });
        }
    },

    // Obtener consultas por paciente
    obtenerPorPaciente: async (req, res) => {
        try {
            const { paciente_id } = req.params;
            
            const consultas = await Consulta.findAll({
                where: { 
                    paciente_id,
                    activo: true
                },
                include: [
                    {
                        model: Medico,
                        as: 'medico',
                        attributes: ['nombre', 'especialidad']
                    }
                ],
                order: [['fecha', 'DESC']]
            });

            res.json(consultas);
        } catch (error) {
            console.error('Error al obtener consultas del paciente:', error);
            res.status(500).json({
                msg: 'Error al obtener consultas'
            });
        }
    }
};

module.exports = consultasController;