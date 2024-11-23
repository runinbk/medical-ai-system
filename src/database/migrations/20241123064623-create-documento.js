
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documentos', {
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
      consulta_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'consultas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      examen_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'examenes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tipo_documento: {
        type: Sequelize.ENUM(
          'HISTORIA_CLINICA',
          'RESULTADO_EXAMEN',
          'RECETA_MEDICA',
          'INFORME_MEDICO',
          'CONSENTIMIENTO',
          'OTRO'
        ),
        allowNull: false
      },
      nombre_archivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ubicacion_archivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha_documento: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      mime_type: {
        type: Sequelize.STRING
      },
      tamanio: {
        type: Sequelize.INTEGER
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      creado_por: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      modificado_por: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        }
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
    await queryInterface.addIndex('documentos', ['paciente_id']);
    await queryInterface.addIndex('documentos', ['consulta_id']);
    await queryInterface.addIndex('documentos', ['examen_id']);
    await queryInterface.addIndex('documentos', ['tipo_documento']);
    await queryInterface.addIndex('documentos', ['fecha_documento']);
    await queryInterface.addIndex('documentos', ['creado_por']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documentos');
  }
};