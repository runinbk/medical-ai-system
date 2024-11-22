# Migracion y Rutas - Pacientes

Primero ejecutemos la migración:

```bash
npx sequelize-cli db:migrate
```

Ahora, vamos a probar cada ruta en Postman. Te guío paso a paso:

1. Primero, necesitamos un token de un usuario con rol DOCTOR o ADMIN. Vamos a hacer login:
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "123456"
}
```

2. Crear un paciente (usar el token obtenido):
```http
POST http://localhost:3000/api/pacientes
Content-Type: application/json
x-token: [token-del-paso-1]

{
    "nombre": "Juan Pérez",
    "edad": 35,
    "sexo": "M",
    "direccion": "Av. Principal 123",
    "telefono": "123-456-7890",
    "email": "juan@example.com",
    "alergias": "Penicilina",
    "condiciones_cronicas": "Hipertensión",
    "cirugias_pasadas": "Apendicectomía 2018"
}
```

3. Obtener todos los pacientes:
```http
GET http://localhost:3000/api/pacientes
x-token: [token-del-paso-1]
```

4. Obtener paciente por ID:
```http
GET http://localhost:3000/api/pacientes/1
x-token: [token-del-paso-1]
```

5. Actualizar paciente:
```http
PUT http://localhost:3000/api/pacientes/1
Content-Type: application/json
x-token: [token-del-paso-1]

{
    "nombre": "Juan Pablo Pérez",
    "telefono": "123-456-7899"
}
```

6. Eliminar paciente (solo ADMIN):
```http
DELETE http://localhost:3000/api/pacientes/1
x-token: [token-del-paso-1]
```
