# Módulo de Autenticación - Documentación Técnica

## Descripcion basica del modulo

Sistema completo de administración de usuarios, que incluye:

1. Registro con rol por defecto
2. Login con JWT
3. Validación de roles
4. Asignación de roles
5. Middleware de protección de rutas

## Tecnologías Utilizadas
- **JWT (jsonwebtoken)**: Generación y validación de tokens de autenticación
- **bcryptjs**: Encriptación de contraseñas
- **express-validator**: Validación de datos de entrada
- **Sequelize**: ORM para manejo de base de datos
- **PostgreSQL**: Sistema de gestión de base de datos

## Estructura de Base de Datos
- Tabla `usuarios`: Almacenamiento de información de usuarios
- Tabla `roles`: Definición de roles del sistema
- Tabla `usuario_roles`: Relación muchos a muchos entre usuarios y roles

## Componentes Principales

### Models
- **Usuario**: Modelo principal con hooks para encriptación de contraseña
- **Role**: Modelo para gestión de roles
- **UsuarioRol**: Modelo de relación entre usuarios y roles

### Middlewares
- **validarJWT**: Verifica token de autenticación
- **validarRoles**: Verifica roles de usuario
- **validarCampos**: Valida datos de entrada

### Helpers
- **generateJWT**: Genera tokens JWT para autenticación

### Controllers
- **auth.controller.js**:
  - `registro`: Crea nuevo usuario con rol por defecto
  - `login`: Autentica usuario y genera token
  - `asignarRol`: Asigna roles adicionales a usuarios

## Seguridad
- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración de 4 horas
- Validación de roles para rutas protegidas
- Validación de campos obligatorios