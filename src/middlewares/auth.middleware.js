
const jwt = require('jsonwebtoken');
const { Usuario, Role } = require('../models');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        // Leer el usuario
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

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        const rolesUsuario = req.usuario.roles.map(role => role.nombre);
        
        if (!roles.some(rol => rolesUsuario.includes(rol))) {
            return res.status(403).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    };
};

module.exports = {
    validarJWT,
    tieneRol
};