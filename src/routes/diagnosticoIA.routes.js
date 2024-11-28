
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { validarRoles } = require('../middlewares/validar-roles');
const { 
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizarDiagnosticoMedico,
    obtenerPorPaciente
} = require('../controllers/diagnosticoIA.controller');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validateJWT);

// Crear nuevo diagnóstico
router.post('/', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id_paciente', 'El ID del paciente es obligatorio').isInt(),
    check('diagnostico_ia', 'El diagnóstico IA es obligatorio').not().isEmpty(),
    check('imagen_original', 'La imagen original es obligatoria').not().isEmpty(),
    validarCampos
], crear);

// Obtener todos los diagnósticos
router.get('/', [
    validarRoles('ADMIN', 'DOCTOR')
], obtenerTodos);

// Obtener diagnóstico por ID
router.get('/:id', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    validarCampos
], obtenerPorId);

// Actualizar diagnóstico médico
router.put('/:id/diagnostico-medico', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id', 'El ID debe ser un número válido').isInt(),
    check('diagnostico_medico', 'El diagnóstico médico es obligatorio').not().isEmpty(),
    validarCampos
], actualizarDiagnosticoMedico);

// Obtener diagnósticos por paciente
router.get('/paciente/:id_paciente', [
    validarRoles('ADMIN', 'DOCTOR'),
    check('id_paciente', 'El ID del paciente debe ser un número válido').isInt(),
    validarCampos
], obtenerPorPaciente);

module.exports = router;