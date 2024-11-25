# Estándares de Código Implementados

## 1. Estándares Globales y Especificaciones

### JavaScript/Node.js
- **CommonJS** - Sistema de módulos (`require/module.exports`)
  - [Documentación CommonJS](https://nodejs.org/api/modules.html)
- **ECMAScript 2015+ (ES6+)**
  - [Especificación ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
- **Node.js Best Practices**
  - [Guía Oficial Node.js](https://nodejs.org/en/docs/guides/)

### Patrones y Arquitectura
- **RESTful API** - Arquitectura REST
  - [REST API Tutorial](https://restfulapi.net/)
- **MVC (Model-View-Controller)**
  - [Documentación MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)
- **Middleware Pattern**
  - [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)

### Seguridad
- **OWASP Top 10**
  - [OWASP Standards](https://owasp.org/www-project-top-ten/)
- **JWT (JSON Web Tokens)**
  - [JWT.io](https://jwt.io/introduction)
- **bcrypt** - Estándar de hashing
  - [bcrypt NPM](https://www.npmjs.com/package/bcrypt)

### Base de Datos
- **Sequelize ORM Standards**
  - [Documentación Sequelize](https://sequelize.org/)
- **PostgreSQL Guidelines**
  - [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 2. Arquitectura en Capas
- **Models**: Capa de datos y validaciones
- **Controllers**: Lógica de negocio
- **Routes**: Endpoints y validaciones de entrada
- **Middlewares**: Funcionalidades transversales

## 3. Convenciones de Nomenclatura
- **Archivos**: snake_case para archivos de configuración, camelCase para código
- **Variables y Funciones**: camelCase
- **Clases**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE
- **Tablas DB**: plural, snake_case (ej: medicos, usuario_roles)

## 4. RESTful API
- **GET**: Obtener recursos
- **POST**: Crear recursos
- **PUT**: Actualizar recursos
- **DELETE**: Eliminar recursos
- **Uso de códigos HTTP estándar**: 200, 201, 400, 401, 403, 404, 500

## 5. Clean Code Principles
- Nombres descriptivos y significativos
- Funciones con responsabilidad única
- DRY (Don't Repeat Yourself)
- SOLID Principles
  - Single Responsibility
  - Open/Closed
  - Liskov Substitution
  - Interface Segregation
  - Dependency Inversion

## 6. Manejo de Errores
- Try/Catch en operaciones asíncronas
- Mensajes de error descriptivos
- Logging de errores
- Respuestas de error estandarizadas

## 7. Seguridad
- Validación de entrada
- Sanitización de datos
- Control de acceso basado en roles
- JWT para autenticación

## 8. Documentación
- Comentarios explicativos
- Documentación de API
- Guías de prueba
- Diagramas de estructura

## 9. Control de Versiones
- Migraciones para cambios en DB
- Versionado de modelos
- Semantic Versioning para releases

## 10. Paquetes y Herramientas Estándar
- **Express.js**
  - [Express Documentation](https://expressjs.com/)
- **Helmet** (Seguridad HTTP)
  - [Helmet Documentation](https://helmetjs.github.io/)
- **CORS**
  - [CORS NPM](https://www.npmjs.com/package/cors)
- **Rate Limiting**
  - [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- **Express Validator**
  - [Express Validator Documentation](https://express-validator.github.io/)

## 11. Testing Standards
- **Jest**
  - [Jest Documentation](https://jestjs.io/)
- **Supertest** para pruebas de API
  - [Supertest NPM](https://www.npmjs.com/package/supertest)

## 12. Estándares de Formato
- **ESLint** para linting
  - [ESLint Rules](https://eslint.org/docs/rules/)
- **Prettier** para formateo de código
  - [Prettier Documentation](https://prettier.io/docs/en/)