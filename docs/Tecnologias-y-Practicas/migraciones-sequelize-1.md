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

## 4. Modificación de Tablas Existentes - Creando una llave Foranea

1. Primero, genera una nueva migración para añadir la columna de llave foránea:

```bash
npx sequelize-cli migration:generate --name add_usuario_id_to_prueba
```

2. En la nueva migración, añade el código para crear la relación:

```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pruebas', 'usuario_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Usuarios', // nombre de la tabla referenciada
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true // permite nulos para los registros existentes
    });

    // Opcionalmente, añadir un índice para mejorar el rendimiento
    await queryInterface.addIndex('Pruebas', ['usuario_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pruebas', 'usuario_id');
  }
};
```

3. Actualiza los modelos para definir la asociación:

En el modelo Prueba (`models/prueba.js`):
```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prueba extends Model {
    static associate(models) {
      // Define la relación con Usuario
      Prueba.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
    }
  }
  Prueba.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Prueba',
  });
  return Prueba;
};
```

En el modelo Usuario (`models/usuario.js`), añade la relación inversa:
```javascript
static associate(models) {
  // Define la relación con Prueba
  Usuario.hasMany(models.Prueba, {
    foreignKey: 'usuario_id',
    as: 'pruebas'
  });
}
```

4. Ejecuta la migración:

```bash
npx sequelize-cli db:migrate
```

Ahora puedes usar la relación en tus consultas, por ejemplo:

```javascript
// Obtener una prueba con su usuario
const prueba = await Prueba.findOne({
  include: [{
    model: Usuario,
    as: 'usuario'
  }]
});

// Obtener un usuario con sus pruebas
const usuario = await Usuario.findOne({
  include: [{
    model: Prueba,
    as: 'pruebas'
  }]
});
```

Importante:
- Asegúrate de que la tabla 'Usuarios' existe y tiene la estructura correcta
- La columna usuario_id se crea como nullable (allowNull: true) para mantener la compatibilidad con registros existentes
- El nombre de la tabla referenciada ('Usuarios') debe coincidir exactamente con el nombre en tu base de datos
- Las opciones onUpdate y onDelete definen qué sucede cuando se actualiza o elimina un usuario

## 5. Tipos de Cambios en Migraciones

Las migraciones pueden incluir:

- Crear tablas: `createTable`
- Modificar tablas: `addColumn`, `removeColumn`
- Crear índices: `addIndex`
- Crear restricciones: `addConstraint`
- Crear relaciones: Foreign Keys
- Modificar tipos de datos: `changeColumn`