# Módulo de Documentos - Documentación Técnica

## Descripción
Módulo para la gestión integral de documentos médicos, permitiendo el almacenamiento, recuperación y gestión de archivos relacionados con pacientes, consultas y exámenes.

Revisemos lo que tenemos para el módulo de Documentos:
 * ✅ Migración con todas las relaciones
 * ✅ Modelo con validaciones
 * ✅ Controlador CRUD completo
 * ✅ Sistema de archivos configurado
 * ✅ Manejo de versiones de documentos
 * ✅ Rutas con validaciones y control de roles
 * ✅ Tipos de documentos definidos
 * ✅ Sistema de almacenamiento
 * ✅ Documentación técnica
 * ✅ Guía de pruebas
 * ✅ Diagrama de rutas

Lo único que podríamos añadir serían características adicionales como:
1. Compresión de archivos
2. Preview de documentos
3. OCR para documentos escaneados
4. Búsqueda por contenido
5. Sistema de etiquetas
6. Historial de visualizaciones

Pero estas son características que podrían implementarse después según las necesidades.

## Tecnologías Utilizadas
- **Sequelize**: ORM para manejo del modelo de documentos
- **Express**: Routing y middleware
- **Express-fileupload**: Manejo de subida de archivos
- **JWT**: Autenticación y autorización por roles
- **File System**: Manejo de archivos locales

## Estructura de Base de Datos
### Tabla `documentos`
- `id`: INTEGER (PK, Auto-increment)
- `paciente_id`: INTEGER (FK -> pacientes.id)
- `consulta_id`: INTEGER (FK -> consultas.id)
- `examen_id`: INTEGER (FK -> examenes.id)
- `tipo_documento`: ENUM
  - HISTORIA_CLINICA
  - RESULTADO_EXAMEN
  - RECETA_MEDICA
  - INFORME_MEDICO
  - CONSENTIMIENTO
  - OTRO
- `nombre_archivo`: STRING
- `ubicacion_archivo`: STRING
- `fecha_documento`: DATE
- `descripcion`: TEXT
- `mime_type`: STRING
- `tamanio`: INTEGER
- `version`: INTEGER
- `creado_por`: INTEGER (FK -> usuarios.id)
- `modificado_por`: INTEGER (FK -> usuarios.id)
- `activo`: BOOLEAN
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Relaciones
- **Paciente**: (N:1)
- **Consulta**: (N:1)
- **Examen**: (N:1)
- **Usuario Creador**: (N:1)
- **Usuario Modificador**: (N:1)

## Características Principales
- Control de versiones de documentos
- Registro de creación y modificación
- Gestión de tipos de documentos
- Sistema de almacenamiento de archivos
- Trazabilidad de cambios

## Seguridad y Permisos
### Roles y Accesos
- **ADMIN**: Acceso total
- **DOCTOR**: Crear, leer, actualizar
- **ENFERMERO**: Solo lectura
- **DEFAULT_USER**: Sin acceso

### Validaciones
- Verificación de tipos de archivo
- Control de tamaño de archivos
- Validación de relaciones
- Control de acceso basado en roles
- Verificación de permisos por documento

## Estructura de Directorios
```
uploads/
└── documentos/
    └── [archivos almacenados]
```