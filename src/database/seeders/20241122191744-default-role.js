'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar si el rol DEFAULT_USER ya existe
    const [existingRoles] = await queryInterface.sequelize.query(
      `SELECT * FROM roles WHERE nombre = 'DEFAULT_USER'`
    );

    if (existingRoles.length === 0) {
      await queryInterface.bulkInsert('roles', [{
        nombre: 'DEFAULT_USER',
        descripcion: 'Usuario con acceso básico',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { nombre: 'DEFAULT_USER' }, {});
  }
};