
const { Usuario, Role } = require('../models');
const { generateJWT } = require('../helpers/generate-jwt');

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Buscar usuario
            const usuario = await Usuario.findOne({
                where: { email },
                include: [{
                    model: Role,
                    as: 'roles',
                    attributes: ['nombre'],
                    through: { attributes: [] }
                }]
            });

            if (!usuario) {
                return res.status(401).json({
                    msg: 'Credenciales inválidas'
                });
            }

            // Verificar contraseña
            const passwordValido = await usuario.comparePassword(password);
            if (!passwordValido) {
                return res.status(401).json({
                    msg: 'Credenciales inválidas'
                });
            }

            // Generar JWT
            const token = await generateJWT(usuario.id);

            // Actualizar último login
            await usuario.update({ ultimo_login: new Date() });

            res.json({
                msg: 'Login exitoso',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    roles: usuario.roles.map(role => role.nombre)
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                msg: 'Error en el servidor'
            });
        }
    },

    registro: async (req, res) => {
        try {
            const { nombre, email, password } = req.body;

            // Verificar si el usuario existe
            const usuarioExiste = await Usuario.findOne({ where: { email } });
            if (usuarioExiste) {
                return res.status(400).json({
                    msg: 'El email ya está registrado'
                });
            }

            // Crear usuario
            const usuario = await Usuario.create({
                nombre,
                email,
                password
            });

            // Buscar rol USER
            const rolUser = await Role.findOne({ where: { nombre: 'USER' } });
            if (rolUser) {
                await usuario.addRole(rolUser);
            }

            // Generar JWT
            const token = await generateJWT(usuario.id);

            res.status(201).json({
                msg: 'Usuario registrado exitosamente',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({
                msg: 'Error en el servidor'
            });
        }
    },

    renewToken: async (req, res) => {
        try {
            const usuario = req.usuario;
            
            // Generar nuevo JWT
            const token = await generateJWT(usuario.id);

            res.json({
                ok: true,
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    roles: usuario.roles.map(role => role.nombre)
                }
            });
        } catch (error) {
            console.error('Error al renovar token:', error);
            res.status(500).json({
                msg: 'Error en el servidor'
            });
        }
    },

    adminDashboard: async (req, res) => {
        try {
            res.json({
                msg: 'Acceso autorizado al dashboard de admin',
                usuario: {
                    id: req.usuario.id,
                    nombre: req.usuario.nombre,
                    email: req.usuario.email,
                    roles: req.usuario.roles.map(role => role.nombre)
                }
            });
        } catch (error) {
            console.error('Error en dashboard:', error);
            res.status(500).json({
                msg: 'Error en el servidor'
            });
        }
    }
};

module.exports = authController;