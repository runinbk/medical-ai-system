
const { Examen, Paciente, Medico, Consulta } = require('../models');

const examenesController = {
    // Crear examen
    crear: async (req, res) => {
        try {
            const { 
                paciente_id, 
                medico_id, 
                consulta_id, 
                tipo_examen, 
                notas_medicas 
            } = req.body;

            // Verificar existencia de paciente y médico
            const paciente = await Paciente.findByPk(paciente_id);
            const medico = await Medico.findByPk(medico_id);

            if (!paciente || !medico) {
                return res.status(404).json({
                    msg: !paciente ? 'Paciente no encontrado' : 'Médico no encontrado'
                });
            }

            // Verificar consulta si se proporciona
            if (consulta_id) {
                const consulta = await Consulta.findByPk(consulta_id);
                if (!consulta) {
                    return res.status(404).json({
                        msg: 'Consulta no encontrada'
                    });
                }
            }

            // Crear examen
            const examen = await Examen.create({
                paciente_id,
                medico_id,
                consulta_id,
                tipo_examen,
                notas_medicas
            });

            res.status(201).json({
                msg: 'Examen creado exitosamente',
                examen
            });
        } catch (error) {
            console.error('Error al crear examen:', error);
            res.status(500).json({
                msg: 'Error al crear examen'
            });
        }
    },

    // Obtener todos los exámenes
    obtenerTodos: async (req, res) => {
        try {
            const examenes = await Examen.findAll({
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
                    },
                    {
                        model: Consulta,
                        as: 'consulta'
                    }
                ],
                order: [['fecha', 'DESC']]
            });

            res.json(examenes);
        } catch (error) {
            console.error('Error al obtener exámenes:', error);
            res.status(500).json({
                msg: 'Error al obtener exámenes'
            });
        }
    },

    // Obtener examen por ID
    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const examen = await Examen.findOne({
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
                    },
                    {
                        model: Consulta,
                        as: 'consulta'
                    }
                ]
            });

            if (!examen) {
                return res.status(404).json({
                    msg: 'Examen no encontrado'
                });
            }

            res.json(examen);
        } catch (error) {
            console.error('Error al obtener examen:', error);
            res.status(500).json({
                msg: 'Error al obtener examen'
            });
        }
    },

    // Actualizar examen
    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { 
                estado, 
                resultados, 
                diagnostico_asociado, 
                notas_medicas,
                archivo_url
            } = req.body;

            const examen = await Examen.findOne({
                where: { id, activo: true }
            });

            if (!examen) {
                return res.status(404).json({
                    msg: 'Examen no encontrado'
                });
            }

            if (examen.estado === 'COMPLETADO') {
                return res.status(400).json({
                    msg: 'No se puede modificar un examen completado'
                });
            }

            await examen.update({
                estado,
                resultados,
                diagnostico_asociado,
                notas_medicas,
                archivo_url
            });

            res.json({
                msg: 'Examen actualizado exitosamente',
                examen
            });
        } catch (error) {
            console.error('Error al actualizar examen:', error);
            res.status(500).json({
                msg: 'Error al actualizar examen'
            });
        }
    },

    // Cancelar examen
    cancelar: async (req, res) => {
        try {
            const { id } = req.params;
            
            const examen = await Examen.findOne({
                where: { 
                    id, 
                    activo: true,
                    estado: ['PENDIENTE', 'EN_PROCESO']
                }
            });

            if (!examen) {
                return res.status(404).json({
                    msg: 'Examen no encontrado o no se puede cancelar'
                });
            }

            await examen.update({ estado: 'CANCELADO' });

            res.json({
                msg: 'Examen cancelado exitosamente'
            });
        } catch (error) {
            console.error('Error al cancelar examen:', error);
            res.status(500).json({
                msg: 'Error al cancelar examen'
            });
        }
    },

    // Obtener exámenes por paciente
    obtenerPorPaciente: async (req, res) => {
        try {
            const { paciente_id } = req.params;
            
            const examenes = await Examen.findAll({
                where: { 
                    paciente_id,
                    activo: true
                },
                include: [
                    {
                        model: Medico,
                        as: 'medico',
                        attributes: ['nombre', 'especialidad']
                    },
                    {
                        model: Consulta,
                        as: 'consulta'
                    }
                ],
                order: [['fecha', 'DESC']]
            });

            res.json(examenes);
        } catch (error) {
            console.error('Error al obtener exámenes del paciente:', error);
            res.status(500).json({
                msg: 'Error al obtener exámenes'
            });
        }
    }
};

module.exports = examenesController;