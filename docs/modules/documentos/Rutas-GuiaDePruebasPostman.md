# Guía de Pruebas en Postman - Módulo Documentos

## Árbol de Rutas

```mermaid
flowchart TD
    A["/api/documentos"] --> B1["POST /"]
    A --> B2["GET /"]
    A --> B3["GET /:id"]
    A --> B4["GET /:id/descargar"]
    A --> B5["GET /paciente/:paciente_id"]
    A --> B6["PUT /:id"]
    A --> B7["DELETE /:id"]

    subgraph Accesos
        B1 --> P1["ADMIN, DOCTOR"]
        B2 --> P2["ADMIN, DOCTOR, ENFERMERO"]
        B3 --> P3["ADMIN, DOCTOR, ENFERMERO"]
        B4 --> P4["ADMIN, DOCTOR, ENFERMERO"]
        B5 --> P5["ADMIN, DOCTOR, ENFERMERO"]
        B6 --> P6["ADMIN, DOCTOR"]
        B7 --> P7["ADMIN"]
    end

    subgraph Documentos
        D1["HISTORIA_CLINICA"]
        D2["RESULTADO_EXAMEN"]
        D3["RECETA_MEDICA"]
        D4["INFORME_MEDICO"]
        D5["CONSENTIMIENTO"]
        D6["OTRO"]
    end

    subgraph Validaciones
        V1["Token JWT"]
        V2["Roles"]
        V3["Tipo de archivo"]
        V4["Tamaño máximo"]
        V5["Relaciones válidas"]
    end

    style P1 fill:#FF9999,stroke:#333
    style P6 fill:#FF9999,stroke:#333
    style P7 fill:#FF9999,stroke:#333
    style P2,P3,P4,P5 fill:#90EE90,stroke:#333
```

## Prerequisitos
- Token JWT válido
- Rol adecuado
- IDs válidos de pacientes, consultas o exámenes
- Archivos para pruebas

## Endpoints

### 1. Crear Documento
```http
POST http://localhost:3000/api/documentos
Headers:
  x-token: [jwt-token]
Content-Type: multipart/form-data

Form Data:
- archivo: [file]
- paciente_id: 1
- consulta_id: 1 (opcional)
- examen_id: 1 (opcional)
- tipo_documento: RESULTADO_EXAMEN
- descripcion: "Descripción del documento"
```

### 2. Obtener Documentos
```http
GET http://localhost:3000/api/documentos
Headers:
  x-token: [jwt-token]
```

### 3. Descargar Documento
```http
GET http://localhost:3000/api/documentos/1/descargar
Headers:
  x-token: [jwt-token]
```

### 4. Actualizar Documento
```http
PUT http://localhost:3000/api/documentos/1
Headers:
  x-token: [jwt-token]
Content-Type: multipart/form-data

Form Data:
- archivo: [file] (opcional)
- descripcion: "Nueva descripción"
```

## Respuestas del API

### Éxito
```json
{
    "msg": "Documento creado exitosamente",
    "documento": {
        "id": 1,
        "nombre_archivo": "ejemplo.pdf",
        "tipo_documento": "RESULTADO_EXAMEN",
        ...
    }
}
```

### Error
```json
{
    "msg": "Error específico del problema"
}
```

## Códigos de Estado
- 201: Creación exitosa
- 200: Operación exitosa
- 400: Error de validación
- 401: No autorizado
- 403: Prohibido
- 404: No encontrado
- 500: Error del servidor