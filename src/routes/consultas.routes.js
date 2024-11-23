// src/routes/consultas.routes.js
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { 
    crear, 
    obtenerTodas, 
    obtenerPorId, 
    actualizar, 
    cancelar,
    obtenerPorMedico,
    obtenerPorPaciente
} = require('../controllers/consultas.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Crear consulta
router.post('/', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('paciente_id', 'El ID del paciente es obligatorio').isInt(),
    check('medico_id', 'El ID del médico es obligatorio').isInt(),
    check('fecha', 'La fecha es obligatoria').isISO8601(),
    validarCampos
], crear);

// Obtener todas las consultas
router.get('/', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO')
], obtenerTodas);

// Obtener consulta por ID
router.get('/:id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Obtener consultas por médico
router.get('/medico/:medico_id', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('medico_id', 'El ID del médico debe ser un número válido').isInt(),
    validarCampos
], obtenerPorMedico);

// Obtener consultas por paciente
router.get('/paciente/:paciente_id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('paciente_id', 'El ID del paciente debe ser un número válido').isInt(),
    validarCampos
], obtenerPorPaciente);

// Actualizar consulta
router.put('/:id', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], actualizar);

// Cancelar consulta
router.put('/:id/cancelar', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], cancelar);

module.exports = router;