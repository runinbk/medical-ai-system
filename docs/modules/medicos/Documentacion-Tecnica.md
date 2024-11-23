# Módulo de Médicos - Documentación Técnica

## Descripción
Módulo para la gestión integral de médicos en el sistema, permitiendo el registro, consulta, actualización y eliminación de información de profesionales médicos.

Cubrimos todo lo necesario para el módulo de Pacientes:

  *  ✅ Migración y Modelo
  *  ✅ Controlador con CRUD completo
  *  ✅ Rutas con validaciones
  *  ✅ Middlewares de autenticación y roles
  *  ✅ Documentación técnica
  *  ✅ Guía de pruebas
  *  ✅ Diagrama de rutas

Lo que podríamos añadir al módulo de Médicos serían características avanzadas como:
1. Búsqueda avanzada (filtros múltiples)
2. Paginación
3. Horarios de atención
4. Estadísticas de pacientes atendidos
5. Sistema de calificaciones

## Tecnologías Utilizadas
- **Sequelize**: ORM para manejo del modelo de médicos
- **Express**: Routing y middleware
- **Express-validator**: Validación de datos de entrada
- **JWT**: Autenticación y autorización por roles

## Estructura de Base de Datos
### Tabla `medicos`
- `id`: INTEGER (PK, Auto-increment)
- `nombre`: STRING (Not Null)
- `especialidad`: STRING (Not Null)
- `telefono`: STRING
- `email`: STRING (Unique)
- `usuario_id`: INTEGER (FK -> usuarios.id)
- `activo`: BOOLEAN (Default: true)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Relaciones
- **Usuario**: Relación con la tabla `usuarios` (1:1)
- **Consultas**: Preparado para futura relación con tabla `consultas`

## Seguridad y Permisos
### Roles y Accesos
- **ADMIN**: Acceso total (crear, leer, actualizar, eliminar)
- **DOCTOR**: Acceso de lectura
- **ENFERMERO**: Acceso de lectura
- **DEFAULT_USER**: Sin acceso

### Validaciones
- Nombre obligatorio
- Especialidad obligatoria
- Email único y válido
- Token JWT requerido
- Verificación de roles

## Componentes del Sistema

### Modelo (medico.js)
- Definición del modelo Sequelize
- Validaciones de datos
- Relaciones con otros modelos

### Controlador (medicos.controller.js)
- **crear**: Nuevo médico
- **obtenerTodos**: Lista de médicos activos
- **obtenerPorId**: Detalles de un médico
- **obtenerPorEspecialidad**: Filtrado por especialidad
- **actualizar**: Modificar datos
- **eliminar**: Eliminación lógica

### Rutas (medicos.routes.js)
- Definición de endpoints
- Middleware de validación
- Control de acceso por roles