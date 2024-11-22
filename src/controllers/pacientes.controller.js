
const { Paciente, Usuario } = require('../models');

const pacientesController = {
    // Crear nuevo paciente
    crear: async (req, res) => {
        try {
            const { nombre, edad, sexo, direccion, telefono, email, alergias, condiciones_cronicas, cirugias_pasadas } = req.body;

            // Verificar si ya existe un paciente con ese email
            const pacienteExiste = await Paciente.findOne({ where: { email } });
            if (pacienteExiste) {
                return res.status(400).json({
                    msg: 'Ya existe un paciente con ese email'
                });
            }

            // Crear paciente
            const paciente = await Paciente.create({
                nombre,
                edad,
                sexo,
                direccion,
                telefono,
                email,
                alergias,
                condiciones_cronicas,
                cirugias_pasadas,
                usuario_id: req.usuario.id // Usuario que crea el paciente
            });

            res.status(201).json({
                msg: 'Paciente creado exitosamente',
                paciente
            });
        } catch (error) {
            console.error('Error al crear paciente:', error);
            res.status(500).json({
                msg: 'Error al crear paciente'
            });
        }
    },

    // Obtener todos los pacientes
    obtenerTodos: async (req, res) => {
        try {
            const pacientes = await Paciente.findAll({
                where: { activo: true },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre', 'email']
                }]
            });

            res.json(pacientes);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            res.status(500).json({
                msg: 'Error al obtener pacientes'
            });
        }
    },

    // Obtener paciente por ID
    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = await Paciente.findOne({
                where: { id, activo: true },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre', 'email']
                }]
            });

            if (!paciente) {
                return res.status(404).json({
                    msg: 'Paciente no encontrado'
                });
            }

            res.json(paciente);
        } catch (error) {
            console.error('Error al obtener paciente:', error);
            res.status(500).json({
                msg: 'Error al obtener paciente'
            });
        }
    },

    // Actualizar paciente
    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, edad, sexo, direccion, telefono, email, alergias, condiciones_cronicas, cirugias_pasadas } = req.body;

            const paciente = await Paciente.findOne({
                where: { id, activo: true }
            });

            if (!paciente) {
                return res.status(404).json({
                    msg: 'Paciente no encontrado'
                });
            }

            await paciente.update({
                nombre,
                edad,
                sexo,
                direccion,
                telefono,
                email,
                alergias,
                condiciones_cronicas,
                cirugias_pasadas
            });

            res.json({
                msg: 'Paciente actualizado exitosamente',
                paciente
            });
        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            res.status(500).json({
                msg: 'Error al actualizar paciente'
            });
        }
    },

    // Eliminar paciente (soft delete)
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            
            const paciente = await Paciente.findOne({
                where: { id, activo: true }
            });

            if (!paciente) {
                return res.status(404).json({
                    msg: 'Paciente no encontrado'
                });
            }

            await paciente.update({ activo: false });

            res.json({
                msg: 'Paciente eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            res.status(500).json({
                msg: 'Error al eliminar paciente'
            });
        }
    }
};

module.exports = pacientesController;