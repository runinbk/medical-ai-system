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

También puedes generar migraciones para modificar tablas:

```bash
npx sequelize-cli migration:generate --name add-role-to-users
```

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
  }
};
```

## 4. Tipos de Cambios en Migraciones

Las migraciones pueden incluir:

- Crear tablas: `createTable`
- Modificar tablas: `addColumn`, `removeColumn`
- Crear índices: `addIndex`
- Crear restricciones: `addConstraint`
- Crear relaciones: Foreign Keys
- Modificar tipos de datos: `changeColumn`