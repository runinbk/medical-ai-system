
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('consultas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      medico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medicos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'),
        defaultValue: 'PENDIENTE'
      },
      sintomas: {
        type: Sequelize.TEXT
      },
      diagnostico_preliminar: {
        type: Sequelize.TEXT
      },
      tratamiento_prescrito: {
        type: Sequelize.TEXT
      },
      seguimiento: {
        type: Sequelize.TEXT
      },
      notas: {
        type: Sequelize.TEXT
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
    await queryInterface.addIndex('consultas', ['paciente_id']);
    await queryInterface.addIndex('consultas', ['medico_id']);
    await queryInterface.addIndex('consultas', ['fecha']);
    await queryInterface.addIndex('consultas', ['estado']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('consultas');
  }
};