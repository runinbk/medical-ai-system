// src/controllers/documentos.controller.js
const { Documento, Paciente, Consulta, Examen, Usuario } = require('../models');
const path = require('path');
const fs = require('fs').promises;

const documentosController = {
    // Crear documento
    crear: async (req, res) => {
        try {
            const { 
                paciente_id, 
                consulta_id, 
                examen_id, 
                tipo_documento, 
                descripcion 
            } = req.body;

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    msg: 'No se ha subido ningún archivo'
                });
            }

            const archivo = req.files.archivo;
            const nombreArchivo = `${Date.now()}-${archivo.name}`;
            const uploadPath = path.join(__dirname, '../../uploads/documentos', nombreArchivo);

            // Verificar existencia de paciente
            const paciente = await Paciente.findByPk(paciente_id);
            if (!paciente) {
                return res.status(404).json({
                    msg: 'Paciente no encontrado'
                });
            }

            // Mover archivo
            await archivo.mv(uploadPath);

            // Crear documento
            const documento = await Documento.create({
                paciente_id,
                consulta_id,
                examen_id,
                tipo_documento,
                nombre_archivo: archivo.name,
                ubicacion_archivo: nombreArchivo,
                descripcion,
                mime_type: archivo.mimetype,
                tamanio: archivo.size,
                creado_por: req.usuario.id
            });

            res.status(201).json({
                msg: 'Documento creado exitosamente',
                documento
            });
        } catch (error) {
            console.error('Error al crear documento:', error);
            res.status(500).json({
                msg: 'Error al crear documento'
            });
        }
    },

    // Obtener todos los documentos
    obtenerTodos: async (req, res) => {
        try {
            const documentos = await Documento.findAll({
                where: { activo: true },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    },
                    {
                        model: Consulta,
                        as: 'consulta'
                    },
                    {
                        model: Examen,
                        as: 'examen'
                    },
                    {
                        model: Usuario,
                        as: 'creador',
                        attributes: ['nombre', 'email']
                    }
                ],
                order: [['fecha_documento', 'DESC']]
            });

            res.json(documentos);
        } catch (error) {
            console.error('Error al obtener documentos:', error);
            res.status(500).json({
                msg: 'Error al obtener documentos'
            });
        }
    },

    // Obtener documento por ID
    obtenerPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const documento = await Documento.findOne({
                where: { id, activo: true },
                include: [
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nombre', 'email']
                    },
                    {
                        model: Consulta,
                        as: 'consulta'
                    },
                    {
                        model: Examen,
                        as: 'examen'
                    },
                    {
                        model: Usuario,
                        as: 'creador',
                        attributes: ['nombre', 'email']
                    }
                ]
            });

            if (!documento) {
                return res.status(404).json({
                    msg: 'Documento no encontrado'
                });
            }

            res.json(documento);
        } catch (error) {
            console.error('Error al obtener documento:', error);
            res.status(500).json({
                msg: 'Error al obtener documento'
            });
        }
    },

    // Descargar documento
    descargar: async (req, res) => {
        try {
            const { id } = req.params;
            const documento = await Documento.findOne({
                where: { id, activo: true }
            });

            if (!documento) {
                return res.status(404).json({
                    msg: 'Documento no encontrado'
                });
            }

            const filePath = path.join(__dirname, '../../uploads/documentos', documento.ubicacion_archivo);
            res.download(filePath, documento.nombre_archivo);
        } catch (error) {
            console.error('Error al descargar documento:', error);
            res.status(500).json({
                msg: 'Error al descargar documento'
            });
        }
    },

    // Actualizar documento
    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion } = req.body;

            const documento = await Documento.findOne({
                where: { id, activo: true }
            });

            if (!documento) {
                return res.status(404).json({
                    msg: 'Documento no encontrado'
                });
            }

            // Si hay nuevo archivo
            if (req.files && Object.keys(req.files).length > 0) {
                const archivo = req.files.archivo;
                const nombreArchivo = `${Date.now()}-${archivo.name}`;
                const uploadPath = path.join(__dirname, '../../uploads/documentos', nombreArchivo);

                // Eliminar archivo anterior
                const oldPath = path.join(__dirname, '../../uploads/documentos', documento.ubicacion_archivo);
                try {
                    await fs.unlink(oldPath);
                } catch (error) {
                    console.error('Error al eliminar archivo anterior:', error);
                }

                // Mover nuevo archivo
                await archivo.mv(uploadPath);

                await documento.update({
                    nombre_archivo: archivo.name,
                    ubicacion_archivo: nombreArchivo,
                    descripcion,
                    mime_type: archivo.mimetype,
                    tamanio: archivo.size,
                    modificado_por: req.usuario.id
                });
            } else {
                await documento.update({
                    descripcion,
                    modificado_por: req.usuario.id
                });
            }

            res.json({
                msg: 'Documento actualizado exitosamente',
                documento
            });
        } catch (error) {
            console.error('Error al actualizar documento:', error);
            res.status(500).json({
                msg: 'Error al actualizar documento'
            });
        }
    },

    // Eliminar documento (soft delete)
    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            
            const documento = await Documento.findOne({
                where: { id, activo: true }
            });

            if (!documento) {
                return res.status(404).json({
                    msg: 'Documento no encontrado'
                });
            }

            await documento.update({
                activo: false,
                modificado_por: req.usuario.id
            });

            res.json({
                msg: 'Documento eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar documento:', error);
            res.status(500).json({
                msg: 'Error al eliminar documento'
            });
        }
    },

   // Obtener documentos por paciente
   obtenerPorPaciente: async (req, res) => {
    try {
        const { paciente_id } = req.params;
        
        const documentos = await Documento.findAll({
            where: { 
                paciente_id,
                activo: true 
            },
            include: [
                {
                    model: Consulta,
                    as: 'consulta'
                },
                {
                    model: Examen,
                    as: 'examen'
                },
                {
                    model: Usuario,
                    as: 'creador',
                    attributes: ['nombre']
                }
            ],
            order: [['fecha_documento', 'DESC']]
        });

        res.json(documentos);
    } catch (error) {
        console.error('Error al obtener documentos del paciente:', error);
        res.status(500).json({
            msg: 'Error al obtener documentos'
        });
    }
}
};

module.exports = documentosController;