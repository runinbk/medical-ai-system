# Módulo de Consultas - Documentación Técnica

## Descripción
Módulo para la gestión integral de consultas médicas, permitiendo agendar, actualizar y dar seguimiento a las consultas entre médicos y pacientes.

Revisemos lo que tenemos para el módulo de Consultas:

 * ✅ Migración con todas las relaciones necesarias
 * ✅ Modelo con validaciones y hooks
 * ✅ Controlador CRUD completo
 * ✅ Rutas con validaciones y control de roles
 * ✅ Funcionalidades específicas:
    - Consultas por médico
    - Consultas por paciente
    - Estados de consulta (PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA)
    - Validación de disponibilidad del médico

Lo único que podríamos añadir serían características adicionales como:
1. Paginación de resultados
2. Filtros por fecha/estado
3. Notificaciones de consultas
4. Sistema de recordatorios
Pero estas son características que podríamos implementar después si son necesarias.

## Tecnologías Utilizadas
- **Sequelize**: ORM para manejo del modelo de consultas
- **Express**: Routing y middleware
- **Express-validator**: Validación de datos de entrada
- **JWT**: Autenticación y autorización por roles

## Estructura de Base de Datos
### Tabla `consultas`
- `id`: INTEGER (PK, Auto-increment)
- `paciente_id`: INTEGER (FK -> pacientes.id)
- `medico_id`: INTEGER (FK -> medicos.id)
- `fecha`: DATE (Not Null)
- `estado`: ENUM ('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA')
- `sintomas`: TEXT
- `diagnostico_preliminar`: TEXT
- `tratamiento_prescrito`: TEXT
- `seguimiento`: TEXT
- `notas`: TEXT
- `activo`: BOOLEAN (Default: true)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Relaciones
- **Paciente**: Relación con la tabla `pacientes` (N:1)
- **Médico**: Relación con la tabla `medicos` (N:1)

## Seguridad y Permisos
### Roles y Accesos
- **ADMIN**: Acceso total
- **DOCTOR**: Crear, leer, actualizar consultas
- **ENFERMERO**: Solo lectura
- **DEFAULT_USER**: Sin acceso

### Validaciones
- Fecha obligatoria y futura
- Verificación de disponibilidad del médico
- Validación de estados permitidos
- Verificación de existencia de paciente y médico
- Token JWT requerido
- Verificación de roles

## Componentes del Sistema

### Modelo (consulta.js)
- Definición del modelo Sequelize
- Validaciones de datos
- Hooks para verificar disponibilidad
- Relaciones con otros modelos

### Controlador (consultas.controller.js)
- **crear**: Nueva consulta
- **obtenerTodas**: Lista de consultas
- **obtenerPorId**: Detalles de una consulta
- **actualizar**: Modificar datos
- **cancelar**: Cancelar consulta
- **obtenerPorMedico**: Consultas por médico
- **obtenerPorPaciente**: Consultas por paciente

### Estados de Consulta
- **PENDIENTE**: Consulta agendada sin confirmar
- **CONFIRMADA**: Consulta confirmada por el médico
- **COMPLETADA**: Consulta realizada
- **CANCELADA**: Consulta cancelada