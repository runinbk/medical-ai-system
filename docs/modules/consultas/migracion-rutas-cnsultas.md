# Migracion y Rutas - Consultas

Vamos paso a paso:

Ejecutemos la migración:
```bash
npx sequelize-cli db:migrate
```

Ahora vamos a probar todas las rutas:

1. Crear una consulta:
```http
POST http://localhost:3000/api/consultas
Content-Type: application/json
x-token: [tu-token]

{
    "paciente_id": 1,
    "medico_id": 1,
    "fecha": "2024-11-25T10:00:00",
    "sintomas": "Dolor de cabeza y mareos",
    "notas": "Primera consulta del paciente"
}
```

2. Obtener todas las consultas:
```http
GET http://localhost:3000/api/consultas
x-token: [tu-token]
```

3. Obtener consulta por ID:
```http
GET http://localhost:3000/api/consultas/1
x-token: [tu-token]
```

4. Obtener consultas por médico:
```http
GET http://localhost:3000/api/consultas/medico/1
x-token: [tu-token]
```

5. Obtener consultas por paciente:
```http
GET http://localhost:3000/api/consultas/paciente/1
x-token: [tu-token]
```

6. Actualizar consulta:
```http
PUT http://localhost:3000/api/consultas/1
Content-Type: application/json
x-token: [tu-token]

{
    "estado": "CONFIRMADA",
    "notas": "Consulta confirmada con el paciente"
}
```

7. Cancelar consulta:
```http
PUT http://localhost:3000/api/consultas/1/cancelar
x-token: [tu-token]
```

Puntos importantes a verificar en las pruebas:
1. Validación de fechas futuras
2. Verificación de disponibilidad del médico
3. Permisos por rol
4. Estados de la consulta
5. Relaciones con pacientes y médicos

¿Procedemos con las pruebas? ¿Tienes un token válido o necesitas crear uno nuevo?