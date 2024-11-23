# Módulo de Diagnósticos IA - Documentación Técnica

## Descripción
Módulo para la gestión de diagnósticos asistidos por IA, permitiendo el análisis automático de imágenes médicas y la validación por profesionales médicos.

## Tecnologías Utilizadas
- **Sequelize**: ORM para manejo de modelos
- **Express**: Routing y middleware
- **Axios**: Comunicación con servicio IA
- **Express-fileupload**: Manejo de subida de imágenes
- **JWT**: Autenticación y autorización

## Estructura de Base de Datos

### Tabla `modelos_ia`
- `id`: INTEGER (PK, Auto-increment)
- `nombre`: STRING (Not Null)
- `version`: STRING (Not Null)
- `descripcion`: TEXT
- `tipo_analisis`: ENUM ('RADIOGRAFIA', 'TOMOGRAFIA', 'RESONANCIA', 'OTRO')
- `activo`: BOOLEAN
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Tabla `diagnosticos_ia`
- `id`: INTEGER (PK, Auto-increment)
- `paciente_id`: INTEGER (FK -> pacientes.id)
- `examen_id`: INTEGER (FK -> examenes.id)
- `modelo_id`: INTEGER (FK -> modelos_ia.id)
- `fecha`: DATE
- `imagen_url`: STRING
- `resultado`: JSON
- `anomalia_detectada`: TEXT
- `gravedad`: ENUM ('BAJA', 'MEDIA', 'ALTA', 'CRITICA')
- `confianza`: FLOAT
- `recomendaciones`: TEXT
- `validado_por`: INTEGER (FK -> usuarios.id)
- `estado`: ENUM ('PENDIENTE', 'VALIDADO', 'RECHAZADO')
- `comentarios_medico`: TEXT
- `activo`: BOOLEAN

## Estados del Diagnóstico
- **PENDIENTE**: Análisis realizado, pendiente de validación
- **VALIDADO**: Diagnóstico validado por un médico
- **RECHAZADO**: Diagnóstico rechazado por impreciso

## Niveles de Gravedad
- **BAJA**: Requiere seguimiento rutinario
- **MEDIA**: Requiere atención
- **ALTA**: Requiere atención prioritaria
- **CRITICA**: Requiere atención inmediata

## Seguridad y Permisos
### Roles y Accesos
- **ADMIN**: Acceso total
- **DOCTOR**: Crear análisis, validar resultados
- **ENFERMERO**: Solo lectura
- **DEFAULT_USER**: Sin acceso

## Servicios
### IAService
- **analizarImagen**: Procesa imagen con IA
- **interpretarResultados**: Interpreta respuestas del modelo
- **validarResultados**: Registra validación médica

## Estructura de Archivos
```
uploads/
└── imagenes/
    └── [archivos de diagnóstico]
```