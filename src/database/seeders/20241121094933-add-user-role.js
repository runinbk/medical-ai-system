
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar si el rol USER ya existe
    const [roles] = await queryInterface.sequelize.query(
      `SELECT nombre FROM roles WHERE nombre = 'USER'`
    );

    if (roles.length === 0) {
      await queryInterface.bulkInsert('roles', [{
        nombre: 'USER',
        descripcion: 'Usuario básico del sistema',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { nombre: 'USER' }, {});
  }
};