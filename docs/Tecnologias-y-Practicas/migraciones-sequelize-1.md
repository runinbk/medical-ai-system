# Configuración y Uso de Migraciones Sequelize

## 1. Configuración Inicial

1. Instalar Sequelize CLI globalmente (opcional):
```bash
npm install -g sequelize-cli
```

2. Instalar dependencias necesarias en el proyecto:
```bash
npm install --save sequelize pg pg-hstore
npm install --save-dev sequelize-cli
```

3. Crear archivo `.sequelizerc` en la raíz del proyecto:
```javascript
const path = require('path');

module.exports = {
  'config': path.resolve('src/config', 'database.js'),
  'models-path': path.resolve('src/models'),
  'seeders-path': path.resolve('src/database/seeders'),
  'migrations-path': path.resolve('src/database/migrations')
};
```

## 2. Inicialización

1. Inicializar Sequelize en el proyecto:
```bash
npx sequelize-cli init
```
Esto creará las carpetas necesarias según la configuración de `.sequelizerc`

## 3. Generación de Migraciones

Para generar una nueva migración:
```bash
npx sequelize-cli migration:generate --name create-roles
```

Esto generará automáticamente un archivo con timestamp en `/src/database/migrations` con esta estructura:
```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
```

## 4. Scripts en package.json

```json
{
  "scripts": {
    "migrate:generate": "sequelize-cli migration:generate --name",
    "migrate:run": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "migrate:undo:all": "sequelize-cli db:migrate:undo:all",
    "seed:generate": "sequelize-cli seed:generate --name",
    "seed:run": "sequelize-cli db:seed:all",
    "seed:undo": "sequelize-cli db:seed:undo",
    "seed:undo:all": "sequelize-cli db:seed:undo:all"
  }
}
```

## 5. Uso

1. Generar una nueva migración:
```bash
npm run migrate:generate create-roles
```

2. Editar la migración generada en /src/database/migrations
3. Ejecutar la migración:
```bash
npm run migrate:run
```

# Generación de Migraciones en Sequelize

## 1. Generación Manual de Migración

```bash
npx sequelize-cli migration:generate --name create-users
```

Genera:
```javascript
// YYYYMMDDHHMMSS-create-users.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Aquí debes escribir manualmente la estructura
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // ... otros campos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
```

## 2. Generación basada en Modelo

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,email:string
```

Esto genera DOS archivos:

1. El Modelo:
```javascript
// models/user.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  return User;
};
```

2. La Migración correspondiente:
```javascript
// migrations/YYYYMMDDHHMMSS-create-user.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

## 3. Modificación de Tablas Existentes

Te ayudo a añadir el campo descripción a tu tabla Prueba manteniendo los datos existentes.

1. Primero, genera una nueva migración:

```bash
npx sequelize-cli migration:generate --name add_descripcion_to_prueba
```

2. En la nueva migración que se generó, añade el código para agregar la columna:

```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pruebas', 'descripcion', {
      type: Sequelize.STRING,
      allowNull: true // permite nulos para los registros existentes
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pruebas', 'descripcion');
  }
};
```

3. Actualiza el modelo Prueba (`models/prueba.js`):

```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prueba extends Model {
    static associate(models) {
      // define association here
    }
  }
  Prueba.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    descripcion: DataTypes.STRING  // Añadimos el nuevo campo
  }, {
    sequelize,
    modelName: 'Prueba',
  });
  return Prueba;
};
```

4. Ejecuta la migración:

```bash
npx sequelize-cli db:migrate
```

Esto añadirá la columna 'descripcion' a tu tabla manteniendo todos los datos existentes. La columna se creará permitiendo valores nulos (allowNull: true) para que los registros existentes no causen problemas.

Si necesitas revertir el cambio en algún momento, puedes usar:

```bash
npx sequelize-cli db:migrate:undo
```

¿Necesitas hacer algún otro cambio en la tabla?

## 4. Tipos de Cambios en Migraciones

Las migraciones pueden incluir:

- Crear tablas: `createTable`
- Modificar tablas: `addColumn`, `removeColumn`
- Crear índices: `addIndex`
- Crear restricciones: `addConstraint`
- Crear relaciones: Foreign Keys
- Modificar tipos de datos: `changeColumn`