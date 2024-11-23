// src/routes/diagnosticoIA.routes.js
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { 
    analizar,
    obtenerTodos,
    obtenerPorId,
    validar,
    obtenerPorPaciente
} = require('../controllers/diagnosticoIA.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Realizar análisis
router.post('/analizar', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('paciente_id', 'El ID del paciente es obligatorio').isInt(),
    check('tipo_analisis', 'El tipo de análisis es obligatorio').isIn([
        'RADIOGRAFIA',
        'TOMOGRAFIA',
        'RESONANCIA',
        'OTRO'
    ]),
    validarCampos
], analizar);

// Obtener todos los diagnósticos
router.get('/', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO')
], obtenerTodos);

// Obtener diagnóstico por ID
router.get('/:id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Validar diagnóstico
router.put('/:id/validar', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    check('estado', 'El estado debe ser VALIDADO o RECHAZADO').isIn(['VALIDADO', 'RECHAZADO']),
    validarCampos
], validar);

// Obtener diagnósticos por paciente
router.get('/paciente/:paciente_id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('paciente_id', 'El ID del paciente debe ser un número válido').isInt(),
    validarCampos
], obtenerPorPaciente);

module.exports = router;