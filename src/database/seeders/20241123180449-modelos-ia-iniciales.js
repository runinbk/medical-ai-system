
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modelos_ia', [
      {
        nombre: 'RadiografiaChestAI',
        version: '1.0.0',
        descripcion: 'Modelo para análisis de radiografías de tórax',
        tipo_analisis: 'RADIOGRAFIA',
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'TomografiaAI',
        version: '1.0.0',
        descripcion: 'Modelo para análisis de tomografías',
        tipo_analisis: 'TOMOGRAFIA',
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'ResonanciaBrainAI',
        version: '1.0.0',
        descripcion: 'Modelo para análisis de resonancias cerebrales',
        tipo_analisis: 'RESONANCIA',
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modelos_ia', null, {});
  }
};