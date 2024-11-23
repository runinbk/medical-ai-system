// src/routes/examenes.routes.js
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
    cancelar,
    obtenerPorPaciente
} = require('../controllers/examenes.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Crear examen
router.post('/', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('paciente_id', 'El ID del paciente es obligatorio').isInt(),
    check('medico_id', 'El ID del médico es obligatorio').isInt(),
    check('tipo_examen', 'El tipo de examen es obligatorio').not().isEmpty(),
    validarCampos
], crear);

// Obtener todos los exámenes
router.get('/', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO')
], obtenerTodos);

// Obtener examen por ID
router.get('/:id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Obtener exámenes por paciente
router.get('/paciente/:paciente_id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('paciente_id', 'El ID del paciente debe ser un número válido').isInt(),
    validarCampos
], obtenerPorPaciente);

// Actualizar examen
router.put('/:id', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], actualizar);

// Cancelar examen
router.put('/:id/cancelar', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], cancelar);

module.exports = router;