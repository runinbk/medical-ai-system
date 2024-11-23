# Migracion y Rutas - Medicos

Vamos paso a paso:

Ahora ejecutamos la migración:
```bash
npx sequelize-cli db:migrate
```

Pruebas en Postman:

1. Crear un examen:
```http
POST http://localhost:3000/api/examenes
Content-Type: application/json
x-token: [tu-token]

{
    "paciente_id": 1,
    "medico_id": 1,
    "consulta_id": 1,
    "tipo_examen": "Radiografía de Tórax",
    "notas_medicas": "Paciente presenta molestias respiratorias"
}
```

2. Obtener todos los exámenes:
```http
GET http://localhost:3000/api/examenes
x-token: [tu-token]
```

3. Obtener examen por ID:
```http
GET http://localhost:3000/api/examenes/1
x-token: [tu-token]
```

4. Obtener exámenes por paciente:
```http
GET http://localhost:3000/api/examenes/paciente/1
x-token: [tu-token]
```

5. Actualizar examen:
```http
PUT http://localhost:3000/api/examenes/1
Content-Type: application/json
x-token: [tu-token]

{
    "estado": "EN_PROCESO",
    "resultados": "Se observa inflamación en zona superior derecha",
    "diagnostico_asociado": "Posible bronquitis",
    "notas_medicas": "Requiere seguimiento en 1 semana"
}
```

6. Cancelar examen:
```http
PUT http://localhost:3000/api/examenes/1/cancelar
x-token: [tu-token]
```

Puntos a verificar en las pruebas:
1. Validación de IDs existentes (paciente, médico, consulta)
2. Control de acceso según roles
3. Estados del examen (PENDIENTE, EN_PROCESO, COMPLETADO, CANCELADO)
4. Validaciones de campos obligatorios
5. Relaciones con otros modelos (paciente, médico, consulta)

