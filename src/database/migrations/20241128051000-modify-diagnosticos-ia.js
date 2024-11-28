'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero eliminamos la tabla existente
    await queryInterface.dropTable('diagnosticos_ia');
    
    // Creamos la tabla con la nueva estructura
    await queryInterface.createTable('diagnosticos_ia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      diagnostico_ia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      diagnostico_medico: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      imagen_original: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imagen_marcada_ia: {
        type: Sequelize.TEXT,
        allowNull: true
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

    // Añadimos índices para mejorar el rendimiento
    await queryInterface.addIndex('diagnosticos_ia', ['id_paciente']);
    await queryInterface.addIndex('diagnosticos_ia', ['id_user']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diagnosticos_ia');
  }
};