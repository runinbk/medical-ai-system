
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { 
    crear, 
    obtenerTodos, 
    obtenerPorId, 
    actualizar, 
    eliminar,
    obtenerPorEspecialidad 
} = require('../controllers/medicos.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Crear médico - solo admin
router.post('/', [
    validarRoles('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    validarCampos
], crear);

// Obtener todos los médicos
router.get('/', obtenerTodos);

// Obtener médico por ID
router.get('/:id', [
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Obtener médicos por especialidad
router.get('/especialidad/:especialidad', obtenerPorEspecialidad);

// Actualizar médico - solo admin
router.put('/:id', [
    validarRoles('ADMIN'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], actualizar);

// Eliminar médico - solo admin
router.delete('/:id', [
    validarRoles('ADMIN'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], eliminar);

module.exports = router;