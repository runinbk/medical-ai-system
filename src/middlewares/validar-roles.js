
const validarRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        
        const rolesUsuario = req.usuario.roles.map(role => role.nombre);
        const tieneRol = roles.some(rol => rolesUsuario.includes(rol));

        if (!tieneRol) {
            return res.status(403).json({
                msg: `El servicio requiere uno de estos roles: ${roles.join(', ')}`
            });
        }

        next();
    };
};

module.exports = {
    validarRoles
};