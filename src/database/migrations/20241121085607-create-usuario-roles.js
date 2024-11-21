'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Añadir índices
    await queryInterface.addIndex('usuario_roles', ['usuario_id']);
    await queryInterface.addIndex('usuario_roles', ['role_id']);
    await queryInterface.addIndex('usuario_roles', ['usuario_id', 'role_id'], {
      unique: true,
      name: 'usuario_role_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario_roles');
  }
};