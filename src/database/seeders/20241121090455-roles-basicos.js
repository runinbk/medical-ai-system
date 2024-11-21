'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'ADMIN',
        descripcion: 'Administrador del sistema',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'DOCTOR',
        descripcion: 'Médico',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'ENFERMERO',
        descripcion: 'Enfermero',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'RECEPCIONISTA',
        descripcion: 'Recepcionista',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};