# Comandos de Migración Sequelize - Explicación Detallada

## 1. Generar una Migración
```bash
npx sequelize-cli model:generate --name Usuario --attributes nombre:string,email:string
```

### ¿Qué hace?
1. Crea DOS archivos:
   - Un archivo de migración en `/src/database/migrations/YYYYMMDDHHMMSS-create-usuario.js`
   - Un archivo de modelo en `/src/models/usuario.js`
2. El timestamp (YYYYMMDDHHMMSS) en el nombre del archivo es crucial para el orden de ejecución
3. Genera un esqueleto básico para la migración y el modelo con los atributos especificados

## 2. Ejecutar Migraciones
```bash
npx sequelize-cli db:migrate
```

### ¿Qué hace?
1. Lee el archivo de configuración de la base de datos
2. Verifica la conexión a la base de datos
3. Busca la tabla `SequelizeMeta` (la crea si no existe)
   - Esta tabla mantiene un registro de qué migraciones se han ejecutado
4. Lee el directorio de migraciones
5. Identifica las migraciones que no se han ejecutado (comparando con SequelizeMeta)
6. Ejecuta las migraciones pendientes en orden cronológico
7. Por cada migración exitosa:
   - Ejecuta el código en el método `up()`
   - Registra la migración en SequelizeMeta
8. Si hay un error, detiene el proceso y hace rollback de la migración actual

## 3. Deshacer Última Migración
```bash
npx sequelize-cli db:migrate:undo
```

### ¿Qué hace?
1. Identifica la última migración ejecutada en SequelizeMeta
2. Ejecuta el método `down()` de esa migración
3. Elimina el registro de la migración de SequelizeMeta
4. No afecta a otras migraciones anteriores

## 4. Deshacer Todas las Migraciones
```bash
npx sequelize-cli db:migrate:undo:all
```

### ¿Qué hace?
1. Lee todas las migraciones registradas en SequelizeMeta
2. Ejecuta el método `down()` de cada migración en orden inverso
3. Vacía la tabla SequelizeMeta
4. Efectivamente "resetea" la base de datos a su estado inicial

## 5. Estado de Migraciones
```bash
npx sequelize-cli db:migrate:status
```

### ¿Qué hace?
1. Compara los archivos de migración con los registros en SequelizeMeta
2. Muestra qué migraciones están:
   - Up (ejecutadas)
   - Down (pendientes)
3. Útil para diagnosticar problemas de migración

## Flujo de Trabajo Típico

1. **Desarrollo Inicial**:
   ```bash
   npx sequelize-cli model:generate --name Modelo --attributes ...
   # Editar la migración según necesidades
   npx sequelize-cli db:migrate
   ```

2. **Modificar Tabla Existente**:
   ```bash
   npx sequelize-cli migration:generate --name add-campo-to-tabla
   # Editar la migración
   npx sequelize-cli db:migrate
   ```

3. **Corregir Error**:
   ```bash
   npx sequelize-cli db:migrate:undo
   # Corregir la migración
   npx sequelize-cli db:migrate
   ```

4. **Reset Completo**:
   ```bash
   npx sequelize-cli db:migrate:undo:all
   npx sequelize-cli db:migrate
   ```

## Buenas Prácticas

1. **Nombrado de Migraciones**:
   - Usar nombres descriptivos
   - Incluir acción y tabla: `create-usuarios`, `add-rol-to-usuarios`

2. **Método Up**:
   - Implementar los cambios deseados
   - Incluir índices necesarios
   - Considerar restricciones de clave foránea

3. **Método Down**:
   - Implementar la operación inversa exacta del up
   - Asegurar que sea reversible

4. **Validación**:
   - Verificar que both `up` y `down` funcionen
   - Probar en ambiente de desarrollo antes de producción

5. **Control de Versiones**:
   - Incluir migraciones en el control de versiones
   - No modificar migraciones ya ejecutadas en producción
   - Crear nuevas migraciones para cambios adicionales