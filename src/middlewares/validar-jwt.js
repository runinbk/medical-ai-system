
const jwt = require('jsonwebtoken');
const { Usuario, Role } = require('../models');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');

        // Leer el usuario que corresponde al id
        const usuario = await Usuario.findByPk(id, {
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['nombre'],
                through: { attributes: [] }
            }]
        });

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.activo) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inactivo'
            });
        }

        // Guardar el usuario en la request
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validateJWT
};