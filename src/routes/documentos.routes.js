// src/routes/documentos.routes.js
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { 
    crear, 
    obtenerTodos, 
    obtenerPorId, 
    obtenerPorPaciente,
    descargar,
    actualizar, 
    eliminar 
} = require('../controllers/documentos.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Crear documento
router.post('/', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('paciente_id', 'El ID del paciente es obligatorio').isInt(),
    check('tipo_documento', 'El tipo de documento es obligatorio').isIn([
        'HISTORIA_CLINICA',
        'RESULTADO_EXAMEN',
        'RECETA_MEDICA',
        'INFORME_MEDICO',
        'CONSENTIMIENTO',
        'OTRO'
    ]),
    validarCampos
], crear);

// Obtener todos los documentos
router.get('/', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO')
], obtenerTodos);

// Obtener documento por ID
router.get('/:id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Descargar documento
router.get('/:id/descargar', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], descargar);

// Obtener documentos por paciente
router.get('/paciente/:paciente_id', [
    validarRoles('ADMIN', 'DOCTOR', 'ENFERMERO'),
    check('paciente_id', 'El ID del paciente debe ser un número válido').isInt(),
    validarCampos
], obtenerPorPaciente);

// Actualizar documento
router.put('/:id', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], actualizar);

// Eliminar documento
router.delete('/:id', [
    validarRoles('ADMIN'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], eliminar);

module.exports = router;