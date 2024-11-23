// src/controllers/medicos.controller.js
const { Medico, Usuario, Role } = require('../models');

const medicosController = {
    // Crear médico
    crear: async (req, res) => {
        try {
            const { nombre, especialidad, telefono, email } = req.body;

            // Verificar si ya existe un médico con ese email
            const medicoExiste = await Medico.findOne({ where: { email } });
            if (medicoExiste) {
                return res.status(400).json({
                    msg: 'Ya existe un médico con ese email'
                });
            }

            // Crear médico
            const medico = await Medico.create({
                nombre,
                especialidad,
                telefono,
                email,
                usuario_id: req.usuario.id
            });

            // Asignar rol DOCTOR al usuario si no lo tiene
            const usuario = await Usuario.findByPk(req.usuario.id);
            const rolDoctor = await Role.findOne({ where: { nombre: 'DOCTOR' } });
            if (rolDoctor) {
                await usuario.addRole(rolDoctor);
            }

            res.status(201).json({
                msg: 'Médico creado exitosamente',
                medico
            });
        } catch (error) {
            console.error('Error al crear médico:', error);
            res.status(500).json({
                msg: 'Error al crear médico'
            });
        }
    },

    // Obtener todos los médicos
    obtenerTodos: async (req, res) => {
        try {
            const medicos = await Medico.findAll({
                where: { activo: true },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre', 'email']
                }]
            });

            res.json(medicos);
        } catch (error) {
            console.error('Error al obtener médicos:', error);
            res.status(500).json({
                msg: 'Error al obtener médicos'
            });
        }
    },

    // Obtener médico por ID
    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const medico = await Medico.findOne({
                where: { id, activo: true },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre', 'email']
                }]
            });

            if (!medico) {
                return res.status(404).json({
                    msg: 'Médico no encontrado'
                });
            }

            res.json(medico);
        } catch (error) {
            console.error('Error al obtener médico:', error);
            res.status(500).json({
                msg: 'Error al obtener médico'
            });
        }
    },

    // Actualizar médico
    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, especialidad, telefono, email } = req.body;

            const medico = await Medico.findOne({
                where: { id, activo: true }
            });

            if (!medico) {
                return res.status(404).json({
                    msg: 'Médico no encontrado'
                });
            }

            // Verificar si el email ya está en uso por otro médico
            if (email && email !== medico.email) {
                const emailExiste = await Medico.findOne({ 
                    where: { 
                        email,
                        id: { [Op.ne]: id }
                    } 
                });
                if (emailExiste) {
                    return res.status(400).json({
                        msg: 'El email ya está en uso'
                    });
                }
            }

            await medico.update({
                nombre,
                especialidad,
                telefono,
                email
            });

            res.json({
                msg: 'Médico actualizado exitosamente',
                medico
            });
        } catch (error) {
            console.error('Error al actualizar médico:', error);
            res.status(500).json({
                msg: 'Error al actualizar médico'
            });
        }
    },

    // Eliminar médico (soft delete)
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            
            const medico = await Medico.findOne({
                where: { id, activo: true }
            });

            if (!medico) {
                return res.status(404).json({
                    msg: 'Médico no encontrado'
                });
            }

            await medico.update({ activo: false });

            res.json({
                msg: 'Médico eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar médico:', error);
            res.status(500).json({
                msg: 'Error al eliminar médico'
            });
        }
    },

    // Obtener médicos por especialidad
    obtenerPorEspecialidad: async (req, res) => {
        try {
            const { especialidad } = req.params;
            
            const medicos = await Medico.findAll({
                where: { 
                    especialidad,
                    activo: true 
                },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre', 'email']
                }]
            });

            res.json(medicos);
        } catch (error) {
            console.error('Error al obtener médicos por especialidad:', error);
            res.status(500).json({
                msg: 'Error al obtener médicos'
            });
        }
    }
};

module.exports = medicosController;