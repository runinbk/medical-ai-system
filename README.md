# Medical AI System

## 📋 Descripción
Sistema médico integral que combina gestión de historiales clínicos con análisis automatizado de imágenes médicas mediante IA. Diseñado para facilitar la administración de pacientes, consultas, exámenes y diagnósticos asistidos por inteligencia artificial.

## 🚀 Características Principales
- Gestión de usuarios con roles (Admin, Doctor, Enfermero)
- Administración de pacientes y historiales clínicos
- Gestión de consultas médicas
- Control de exámenes médicos
- Sistema de documentación médica
- Análisis de imágenes mediante IA
- API RESTful con autenticación JWT

## 🛠 Tecnologías
- **Backend**: Node.js, Express.js
- **Base de Datos**: PostgreSQL
- **ORM**: Sequelize
- **Autenticación**: JWT
- **Validación**: Express-validator
- **Manejo de Archivos**: Express-fileupload
- **Servicios Externos**: Axios

## 📋 Prerrequisitos
- Node.js (v20 o superior)
- PostgreSQL (v17 o superior)
- npm o yarn

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/runinbk/medical-ai-system.git #url-del-repositorio
cd medical-ai-system
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp example.env .env
```
Editar `.env` con tus configuraciones:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medical_ai_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

4. **Crear la base de datos**
```bash
createdb medical_ai_db
```
O usar pgAdmin para crear la base de datos.

5. **Ejecutar migraciones**
```bash
npx sequelize-cli db:migrate
```

6. **Ejecutar seeders (datos iniciales)**
```bash
npx sequelize-cli db:seed:all
```

7. **Iniciar el servidor**
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 📁 Estructura del Proyecto
```
medical-system/
├── src/
│   ├── config/         # Configuraciones
│   ├── controllers/    # Controladores
│   ├── database/       # Migraciones y seeders
│   ├── middlewares/    # Middlewares
│   ├── models/         # Modelos Sequelize
│   ├── routes/         # Rutas API
│   ├── services/       # Servicios
│   └── utils/          # Utilidades
├── uploads/            # Archivos subidos
└── tests/             # Tests
```

## 🔑 Usuarios por Defecto
```json
{
    "admin": {
        "email": "admin@medical.com",
        "password": "admin123"
    },
    "doctor": {
        "email": "doctor@medical.com",
        "password": "doctor123"
    }
}
```

## 📚 Módulos Principales

### 1. Autenticación y Usuarios
- Registro y login
- Gestión de roles
- Tokens JWT
- Middleware de autenticación

### 2. Pacientes
- Gestión de información personal
- Historial médico
- Seguimiento de consultas

### 3. Médicos
- Perfiles profesionales
- Especialidades
- Gestión de consultas

### 4. Consultas
- Agendamiento
- Seguimiento
- Historiales

### 5. Exámenes
- Registro de exámenes
- Resultados
- Seguimiento

### 6. Documentos
- Gestión documental
- Almacenamiento seguro
- Control de acceso

### 7. Diagnósticos IA
- Análisis de imágenes
- Interpretación automática
- Validación médica

## 🔒 Seguridad
- Autenticación JWT
- Encriptación de contraseñas
- Validación de roles
- Control de acceso por rutas
- Rate limiting
- Protección contra ataques comunes

## 🚀 Uso del API
La documentación detallada de la API está disponible en:
[Link a la documentación de la API o Postman Collection]

## 👥 Roles y Permisos
- **ADMIN**: Acceso total al sistema
- **DOCTOR**: Gestión de pacientes, consultas y diagnósticos
- **ENFERMERO**: Acceso de lectura y actualizaciones limitadas

## 📝 Scripts Disponibles
```bash
# Desarrollo
npm run dev

# Producción
npm start

# Migraciones
npm run migrate
npm run migrate:undo

# Seeders
npm run seed
npm run seed:undo

# Tests
npm test
```

## 💻 Arquitectura

```mermaid
graph TB
    subgraph Frontend
        WebApp[Web Application]
    end

    subgraph Backend Monolítico
        APILayer[API Layer]
        
        subgraph Core Modules
            Auth[Authentication Module]
            HCE[HCE Module]
            SGD[SGD Module]
            AI[AI Analysis Module]
        end
        
        subgraph Shared Services
            FileHandler[File Management]
            ImageProcessor[Image Processing]
            NotificationService[Notifications]
        end
    end

    subgraph Storage
        PostgreSQL[(PostgreSQL)]
        FileStorage[(File Storage)]
    end

    WebApp --> APILayer
    APILayer --> Auth
    APILayer --> HCE
    APILayer --> SGD
    APILayer --> AI
    
    HCE --> PostgreSQL
    SGD --> PostgreSQL
    Auth --> PostgreSQL
    
    SGD --> FileStorage
    AI --> FileStorage
    
    SGD --> FileHandler
    AI --> ImageProcessor
    HCE --> NotificationService
```

## 💽 Base de Datos

```mermaid
erDiagram
    Usuarios ||--o{ Acceso_Documento : tiene
    Usuarios ||--o{ Historial_Cambios : registra
    Usuarios ||--o{ Interacciones_IA : realiza
    Usuarios {
        int id PK
        string nombre
        string email
        string password_hash
        enum rol
        timestamp created_at
        timestamp updated_at
    }

    Pacientes ||--o{ Consultas : tiene
    Pacientes ||--o{ Examenes : tiene
    Pacientes ||--o{ Recetas : tiene
    Pacientes ||--o{ Alertas : tiene
    Pacientes ||--o{ Citas : agenda
    Pacientes ||--o{ Documentos : posee
    Pacientes {
        int id PK
        string nombre
        int edad
        enum sexo
        string direccion
        string telefono
        string email
        text alergias
        text condiciones_cronicas
        text cirugias_pasadas
        timestamp created_at
        timestamp updated_at
    }

    Medicos ||--o{ Consultas : realiza
    Medicos ||--o{ Examenes : supervisa
    Medicos ||--o{ Citas : atiende
    Medicos {
        int id PK
        string nombre
        string especialidad
        string telefono
        string email
        timestamp created_at
        timestamp updated_at
    }

    Consultas ||--o{ Examenes : genera
    Consultas ||--|{ Diagnosticos_IA : tiene
    Consultas {
        int id PK
        int paciente_id FK
        int medico_id FK
        date fecha
        text sintomas
        text diagnostico_preliminar
        text tratamiento_prescrito
        text seguimiento
        int diagnostico_ia_id FK
        timestamp created_at
        timestamp updated_at
    }

    Examenes ||--o{ Documentos : genera
    Examenes {
        int id PK
        int paciente_id FK
        int medico_id FK
        date fecha
        string tipo_examen
        text resultados
        text diagnostico_asociado
        text notas_medicas
        timestamp created_at
        timestamp updated_at
    }

    Recetas {
        int id PK
        int paciente_id FK
        int consulta_id FK
        date fecha
        string medicamento
        string dosis
        string duracion
        string farmacia
        timestamp created_at
        timestamp updated_at
    }

    Alertas {
        int id PK
        int paciente_id FK
        enum tipo_alerta
        text mensaje
        date fecha
        boolean activa
        timestamp created_at
        timestamp updated_at
    }

    Citas {
        int id PK
        int paciente_id FK
        int medico_id FK
        date fecha
        time hora
        enum estado
        text notas
        timestamp created_at
        timestamp updated_at
    }

    Documentos ||--|{ Versiones_Documento : tiene
    Documentos ||--o{ Acceso_Documento : registra
    Documentos ||--o{ Permisos_Documento : tiene
    Documentos ||--o{ Indexacion_Inteligente : posee
    Documentos {
        int id PK
        int paciente_id FK
        enum tipo_documento
        string nombre_archivo
        string ubicacion_archivo
        date fecha_documento
        text descripcion
        int version
        int creado_por FK
        int modificado_por FK
        int diagnostico_ia_id FK
        timestamp created_at
        timestamp updated_at
    }

    Versiones_Documento {
        int id PK
        int documento_id FK
        int version
        string ubicacion_archivo
        text descripcion
        int creado_por FK
        timestamp created_at
    }

    Diagnosticos_IA {
        int id PK
        int paciente_id FK
        date fecha
        text resultado
        text anomalia_detectada
        enum gravedad
        text recomendaciones
        int modelo_id FK
        float confianza
        timestamp created_at
        timestamp updated_at
    }

    IA_Modelos ||--o{ Diagnosticos_IA : genera
    IA_Modelos ||--o{ IA_Entrenamiento : tiene
    IA_Modelos {
        int id PK
        string nombre_modelo
        string version_modelo
        text descripcion
        date fecha_entrenamiento
        decimal precision
        timestamp created_at
        timestamp updated_at
    }

    IA_Entrenamiento {
        int id PK
        int modelo_id FK
        date fecha_entrenamiento
        string dataset_utilizado
        text resultados
        timestamp created_at
    }

    Historial_Cambios {
        int id PK
        enum entidad
        int entidad_id
        date fecha_cambio
        int usuario_id FK
        text descripcion
        timestamp created_at
    }

    Acceso_Documento {
        int id PK
        int documento_id FK
        int usuario_id FK
        timestamp fecha_acceso
        enum tipo_acceso
        timestamp created_at
    }

    Permisos_Documento {
        int id PK
        int documento_id FK
        int usuario_id FK
        enum permiso
        timestamp created_at
        timestamp updated_at
    }

    Indexacion_Inteligente {
        int id PK
        int documento_id FK
        string palabra_clave
        text anomalia_detectada
        timestamp fecha_indexacion
        timestamp created_at
    }

    Comparticion_Documento {
        int id PK
        int documento_id FK
        string destinatario
        timestamp fecha_comparticion
        text descripcion
        enum tipo_comparticion
        timestamp created_at
    }

    Auditoria_Sistema {
        int id PK
        enum sistema
        enum accion
        text descripcion
        int usuario_id FK
        timestamp fecha
        int entidad_id
        timestamp created_at
    }
```

## 🤝 Contribución
1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## ✍️ Autor

- **Kevin B. Gomoez R.** - *Software Developer* - [runinbk💻🔥](https://github.com/runinbk)

## 🎁 Agradecimientos

- Al esplendido equipo con el que trabajo ❤