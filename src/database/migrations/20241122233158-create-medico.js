
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      especialidad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.addIndex('medicos', ['email']);
    await queryInterface.addIndex('medicos', ['especialidad']);
    await queryInterface.addIndex('medicos', ['usuario_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medicos');
  }
};