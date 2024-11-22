// src/routes/pacientes.routes.js
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
    eliminar 
} = require('../controllers/pacientes.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Crear paciente - solo médicos y admin
router.post('/', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria y debe ser un número').isInt({ min: 0, max: 150 }),
    check('sexo', 'El sexo debe ser M, F u O').isIn(['M', 'F', 'O']),
    check('email', 'El email no es válido').optional().isEmail(),
    validarCampos
], crear);

// Obtener todos los pacientes - personal médico
router.get('/', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO')
], obtenerTodos);

// Obtener paciente por ID - personal médico
router.get('/:id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Actualizar paciente - solo médicos y admin
router.put('/:id', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
    check('edad', 'La edad debe ser un número válido').optional().isInt({ min: 0, max: 150 }),
    check('sexo', 'El sexo debe ser M, F u O').optional().isIn(['M', 'F', 'O']),
    check('email', 'El email no es válido').optional().isEmail(),
    validarCampos
], actualizar);

// Eliminar paciente - solo admin
router.delete('/:id', [
    validarRoles('ADMIN'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], eliminar);

module.exports = router;