
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { login, registro, renewToken, adminDashboard } = require('../controllers/auth.controller');

const router = Router();

// Rutas públicas
router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], registro);

// Rutas protegidas
router.get('/renew', validateJWT, renewToken);

// Ruta que requiere rol específico
router.get('/admin', [
    validateJWT,
    validarRoles('ADMIN')
], adminDashboard);

module.exports = router;