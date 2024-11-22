# Módulo de Pacientes - Documentación Técnica

## Descripción
Módulo para la gestión completa de pacientes en el sistema médico, permitiendo el registro, consulta, actualización y eliminación de información de pacientes.

Cubrimos todo lo necesario para el módulo de Pacientes:

✅ Migración y Modelo
✅ Controlador con CRUD completo
✅ Rutas con validaciones
✅ Middlewares de autenticación y roles
✅ Documentación técnica
✅ Guía de pruebas
✅ Diagrama de rutas

Lo único que podríamos añadir serían funcionalidades adicionales como:
1. Búsqueda de pacientes (por nombre, email, etc.)
2. Paginación para la lista de pacientes
3. Filtros (por edad, sexo, etc.)
4. Exportación de datos de pacientes

## Tecnologías Utilizadas
- **Sequelize**: ORM para manejo del modelo de pacientes
- **Express**: Routing y middleware
- **Express-validator**: Validación de datos de entrada
- **JWT**: Autenticación y autorización por roles

## Estructura de Base de Datos
### Tabla `pacientes`
- `id`: INTEGER (PK, Auto-increment)
- `nombre`: STRING (Not Null)
- `edad`: INTEGER (Not Null)
- `sexo`: ENUM ('M', 'F', 'O')
- `direccion`: STRING
- `telefono`: STRING
- `email`: STRING (Unique)
- `alergias`: TEXT
- `condiciones_cronicas`: TEXT
- `cirugias_pasadas`: TEXT
- `usuario_id`: INTEGER (FK -> usuarios.id)
- `activo`: BOOLEAN (Default: true)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Relaciones
- **Usuario**: Relación con la tabla `usuarios` (1:N)
- **Consultas**: Preparado para futura relación con tabla `consultas`

## Seguridad y Permisos
### Roles y Accesos
- **ADMIN**: Acceso total
- **DOCTOR**: Crear, leer, actualizar
- **ENFERMERO**: Solo lectura
- **DEFAULT_USER**: Sin acceso

### Validaciones
- Nombre obligatorio
- Edad entre 0 y 150 años
- Sexo válido (M/F/O)
- Email único y válido
- Token JWT requerido
- Verificación de roles

## Componentes del Sistema

### Modelo (paciente.js)
- Definición del modelo Sequelize
- Validaciones de datos
- Relaciones con otros modelos

### Controlador (pacientes.controller.js)
- **crear**: Nuevo paciente
- **obtenerTodos**: Lista de pacientes activos
- **obtenerPorId**: Detalles de un paciente
- **actualizar**: Modificar datos
- **eliminar**: Eliminación lógica

### Rutas (pacientes.routes.js)
- Definición de endpoints
- Middleware de validación
- Control de acceso por roles

## Manejo de Errores
- Validación de datos de entrada
- Manejo de duplicados (email)
- Respuestas de error estandarizadas
- Logging de errores

## Arbol de Rutas

```mermaid
flowchart TD
    subgraph API_Routes
        A["/api/pacientes"] --> B1["POST /"]
        A --> B2["GET /"]
        A --> B3["GET /:id"]
        A --> B4["PUT /:id"]
        A --> B5["DELETE /:id"]

        B1 --> C1["Crear<br/>[ADMIN, DOCTOR]"]
        B2 --> C2["Listar<br/>[ADMIN, DOCTOR, ENFERMERO]"]
        B3 --> C3["Obtener<br/>[ADMIN, DOCTOR, ENFERMERO]"]
        B4 --> C4["Actualizar<br/>[ADMIN, DOCTOR]"]
        B5 --> C5["Eliminar<br/>[ADMIN]"]
    end
```