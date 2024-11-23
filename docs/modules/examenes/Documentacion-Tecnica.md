# Módulo de Exámenes - Documentación Técnica

## Descripción
Módulo para la gestión completa de exámenes médicos, permitiendo crear, actualizar y dar seguimiento a los exámenes solicitados para los pacientes.

Revisemos lo que tenemos para el módulo de Exámenes:
  *  ✅ Migración con todas las relaciones necesarias
  *  ✅ Modelo con validaciones
  *  ✅ Controlador CRUD completo
  *  ✅ Rutas con validaciones y control de roles
  *  ✅ Documentación técnica
  *  ✅ Guía de pruebas
  *  ✅ Diagrama de rutas
  *  ✅ Funcionalidades específicas:
      -  Estados de exámenes (PENDIENTE, EN_PROCESO, COMPLETADO, CANCELADO)
      -  Relaciones con Pacientes, Médicos y Consultas
      -  Manejo de archivos (URL)
      -  Filtros por paciente

Lo único que podríamos añadir serían características adicionales como:
1. Búsqueda por tipo de examen
2. Filtros por fecha
3. Paginación
4. Notificaciones de resultados
5. Sistema de archivos más complejo

Estas son características que podríamos implementar después si son necesarias.

## Tecnologías Utilizadas
- **Sequelize**: ORM para manejo del modelo de exámenes
- **Express**: Routing y middleware
- **Express-validator**: Validación de datos de entrada
- **JWT**: Autenticación y autorización por roles

## Estructura de Base de Datos
### Tabla `examenes`
- `id`: INTEGER (PK, Auto-increment)
- `paciente_id`: INTEGER (FK -> pacientes.id)
- `medico_id`: INTEGER (FK -> medicos.id)
- `consulta_id`: INTEGER (FK -> consultas.id)
- `tipo_examen`: STRING (Not Null)
- `fecha`: DATE (Not Null)
- `estado`: ENUM ('PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO')
- `resultados`: TEXT
- `diagnostico_asociado`: TEXT
- `notas_medicas`: TEXT
- `archivo_url`: STRING
- `activo`: BOOLEAN (Default: true)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Relaciones
- **Paciente**: Relación con la tabla `pacientes` (N:1)
- **Médico**: Relación con la tabla `medicos` (N:1)
- **Consulta**: Relación con la tabla `consultas` (N:1)

## Seguridad y Permisos
### Roles y Accesos
- **ADMIN**: Acceso total
- **DOCTOR**: Crear, leer, actualizar exámenes
- **ENFERMERO**: Solo lectura
- **DEFAULT_USER**: Sin acceso

### Validaciones
- Tipo de examen obligatorio
- Verificación de existencia de paciente y médico
- Validación de estados permitidos
- Control de modificaciones según estado
- Token JWT requerido
- Verificación de roles

## Componentes del Sistema

### Modelo (examen.js)
- Definición del modelo Sequelize
- Validaciones de datos
- Relaciones con otros modelos
- Estados y transiciones permitidas

### Controlador (examenes.controller.js)
- **crear**: Nuevo examen
- **obtenerTodos**: Lista de exámenes
- **obtenerPorId**: Detalles de un examen
- **actualizar**: Modificar datos y estado
- **cancelar**: Cancelar examen
- **obtenerPorPaciente**: Exámenes por paciente

### Estados de Examen
- **PENDIENTE**: Examen solicitado
- **EN_PROCESO**: Examen en realización
- **COMPLETADO**: Examen finalizado con resultados
- **CANCELADO**: Examen cancelado