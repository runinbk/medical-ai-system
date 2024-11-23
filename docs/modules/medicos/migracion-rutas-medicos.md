# Migracion y Rutas - Medicos

Vamos paso a paso:

1. Primero ejecutamos la migración:
```bash
npx sequelize-cli db:migrate
```

Ahora vamos a probar cada ruta con Postman. Necesitaremos un token de administrador para la mayoría de las operaciones.

2. Probar creación de médico:
```http
POST http://localhost:3000/api/medicos
Content-Type: application/json
x-token: [tu-token-admin]

{
    "nombre": "Dr. Juan Pérez",
    "especialidad": "Cardiología",
    "telefono": "123-456-7890",
    "email": "dr.perez@hospital.com"
}
```

3. Obtener todos los médicos:
```http
GET http://localhost:3000/api/medicos
x-token: [tu-token-admin]
```

4. Obtener médico por ID:
```http
GET http://localhost:3000/api/medicos/1
x-token: [tu-token-admin]
```

5. Obtener médicos por especialidad:
```http
GET http://localhost:3000/api/medicos/especialidad/Cardiología
x-token: [tu-token-admin]
```

6. Actualizar médico:
```http
PUT http://localhost:3000/api/medicos/1
Content-Type: application/json
x-token: [tu-token-admin]

{
    "nombre": "Dr. Juan Pablo Pérez",
    "telefono": "123-456-7899"
}
```

7. Eliminar médico:
```http
DELETE http://localhost:3000/api/medicos/1
x-token: [tu-token-admin]
```
