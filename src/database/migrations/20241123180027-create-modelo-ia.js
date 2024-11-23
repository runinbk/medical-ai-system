
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modelos_ia', {
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
      version: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: Sequelize.TEXT,
      tipo_analisis: {
        type: Sequelize.ENUM('RADIOGRAFIA', 'TOMOGRAFIA', 'RESONANCIA', 'OTRO'),
        allowNull: false
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
    await queryInterface.addIndex('modelos_ia', ['tipo_analisis']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modelos_ia');
  }
};