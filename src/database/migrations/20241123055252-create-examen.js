
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examenes', {
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
      consulta_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'consultas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tipo_examen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      estado: {
        type: Sequelize.ENUM('PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO'),
        defaultValue: 'PENDIENTE'
      },
      resultados: {
        type: Sequelize.TEXT
      },
      diagnostico_asociado: {
        type: Sequelize.TEXT
      },
      notas_medicas: {
        type: Sequelize.TEXT
      },
      archivo_url: {
        type: Sequelize.STRING
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
    await queryInterface.addIndex('examenes', ['paciente_id']);
    await queryInterface.addIndex('examenes', ['medico_id']);
    await queryInterface.addIndex('examenes', ['consulta_id']);
    await queryInterface.addIndex('examenes', ['tipo_examen']);
    await queryInterface.addIndex('examenes', ['estado']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('examenes');
  }
};