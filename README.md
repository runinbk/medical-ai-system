# medical-ai-system


## 📝 Estructura del proyecto

```
medical-ai-system/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── storage.js
│   │   └── auth.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── hce/
│   │   ├── sgd/
│   │   └── ai/
│   ├── shared/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── services/
│   ├── routes/
│   └── app.js
├── docs/
└── tests/
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
