# Guía de Pruebas en Postman - Módulo Diagnósticos IA

## Árbol de Rutas

```mermaid
flowchart TD
    A["/api/diagnosticos-ia"] --> B1["POST /analizar"]
    A --> B2["GET /"]
    A --> B3["GET /:id"]
    A --> B4["PUT /:id/validar"]
    A --> B5["GET /paciente/:paciente_id"]

    subgraph Accesos
        B1 --> P1["ADMIN, DOCTOR"]
        B2 --> P2["ADMIN, DOCTOR, ENFERMERO"]
        B3 --> P3["ADMIN, DOCTOR, ENFERMERO"]
        B4 --> P4["ADMIN, DOCTOR"]
        B5 --> P5["ADMIN, DOCTOR, ENFERMERO"]
    end

    subgraph Estados["Estados de Diagnóstico"]
        E1["PENDIENTE"] --> E2["VALIDADO"]
        E1 --> E3["RECHAZADO"]
    end

    subgraph Gravedad
        G1["BAJA"]
        G2["MEDIA"]
        G3["ALTA"]
        G4["CRITICA"]
    end

    subgraph Validaciones["Validaciones"]
        V1["Token JWT"]
        V2["Roles"]
        V3["Tipo de archivo"]
        V4["Tipo de análisis"]
        V5["Relaciones válidas"]
    end

    style P1 fill:#FF9999,stroke:#333
    style P4 fill:#FF9999,stroke:#333
    style P2,P3,P5 fill:#90EE90,stroke:#333
    
    style E2 fill:#90EE90
    style E3 fill:#FFB6C1
```

## Prerequisitos
- Token JWT válido (rol DOCTOR o ADMIN)
- IDs válidos de pacientes y exámenes
- Imágenes médicas para pruebas

## Endpoints

### 1. Realizar Análisis
```http
POST http://localhost:3000/api/diagnosticos-ia/analizar
Headers:
  x-token: [jwt-token]
Content-Type: multipart/form-data

Form Data:
- imagen: [archivo de imagen]
- paciente_id: 1
- examen_id: 1 (opcional)
- tipo_analisis: "RADIOGRAFIA"
```
**Respuesta Exitosa**: Status 201
```json
{
    "msg": "Análisis completado exitosamente",
    "diagnostico": {
        "id": 1,
        "anomalia_detectada": "posible neumonía",
        "gravedad": "ALTA",
        "confianza": 0.85,
        ...
    }
}
```

### 2. Obtener Diagnósticos
```http
GET http://localhost:3000/api/diagnosticos-ia
Headers:
  x-token: [jwt-token]
```

### 3. Obtener Diagnóstico por ID
```http
GET http://localhost:3000/api/diagnosticos-ia/1
Headers:
  x-token: [jwt-token]
```

### 4. Validar Diagnóstico
```http
PUT http://localhost:3000/api/diagnosticos-ia/1/validar
Headers:
  x-token: [jwt-token]
Content-Type: application/json

{
    "estado": "VALIDADO",
    "comentarios_medico": "Diagnóstico preciso, iniciar tratamiento"
}
```

### 5. Obtener Diagnósticos por Paciente
```http
GET http://localhost:3000/api/diagnosticos-ia/paciente/1
Headers:
  x-token: [jwt-token]
```

## Códigos de Estado
- 201: Creación exitosa
- 200: Operación exitosa
- 400: Error en datos proporcionados
- 401: No autorizado
- 403: Prohibido
- 404: No encontrado
- 500: Error del servidor