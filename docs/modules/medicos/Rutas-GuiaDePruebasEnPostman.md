# Guía de Pruebas en Postman - Módulo Médicos

## Árbol de Rutas

```mermaid
flowchart TD
    A["/api/medicos"] --> B1["POST /"]
    A --> B2["GET /"]
    A --> B3["GET /:id"]
    A --> B4["GET /especialidad/:especialidad"]
    A --> B5["PUT /:id"]
    A --> B6["DELETE /:id"]

    subgraph Permisos
        B1 --> P1["ADMIN"]
        B2 --> P2["Todos los roles"]
        B3 --> P3["Todos los roles"]
        B4 --> P4["Todos los roles"]
        B5 --> P5["ADMIN"]
        B6 --> P6["ADMIN"]
    end

    subgraph Validaciones
        V1["Token JWT"] --> V2["Validación de Roles"]
        V2 --> V3["Validación de Campos"]
    end

    style P1 fill:#FF9999,stroke:#333
    style P5 fill:#FF9999,stroke:#333
    style P6 fill:#FF9999,stroke:#333
    style P2 fill:#90EE90,stroke:#333
    style P3 fill:#90EE90,stroke:#333
    style P4 fill:#90EE90,stroke:#333
```

## Prerequisitos
- Token JWT válido (requiere login previo)
- Rol adecuado (ADMIN para operaciones de escritura)

## Endpoints

### 1. Crear Médico
```http
POST http://localhost:3000/api/medicos
Headers:
  Content-Type: application/json
  x-token: [jwt-token]

Body:
{
    "nombre": "Dr. Juan Pérez",
    "especialidad": "Cardiología",
    "telefono": "123-456-7890",
    "email": "dr.perez@hospital.com"
}
```
**Respuesta Exitosa**: Status 201
```json
{
    "msg": "Médico creado exitosamente",
    "medico": {
        "id": 1,
        "nombre": "Dr. Juan Pérez",
        ...
    }
}
```

### 2. Obtener Médicos
```http
GET http://localhost:3000/api/medicos
Headers:
  x-token: [jwt-token]
```

### 3. Obtener por Especialidad
```http
GET http://localhost:3000/api/medicos/especialidad/Cardiología
Headers:
  x-token: [jwt-token]
```

### 4. Actualizar Médico
```http
PUT http://localhost:3000/api/medicos/1
Headers:
  Content-Type: application/json
  x-token: [jwt-token]

Body:
{
    "nombre": "Dr. Juan Pablo Pérez",
    "telefono": "123-456-7899"
}
```

### 5. Eliminar Médico
```http
DELETE http://localhost:3000/api/medicos/1
Headers:
  x-token: [jwt-token]
```

## Códigos de Estado
- 200: Operación exitosa
- 201: Creación exitosa
- 400: Error en los datos enviados
- 401: No autorizado
- 403: Prohibido (rol inadecuado)
- 404: Médico no encontrado
- 500: Error del servidor