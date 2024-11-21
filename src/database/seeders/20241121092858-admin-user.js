
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Crear usuario admin
    const adminUser = await queryInterface.bulkInsert('usuarios', [{
      nombre: 'Administrador',
      email: 'admin@medical.com',
      password: await bcrypt.hash('admin123', 10),
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true });

    // 2. Obtener el ID del rol ADMIN
    const [adminRole] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE nombre = 'ADMIN'`
    );
    
    // 3. Asignar rol admin al usuario admin
    await queryInterface.bulkInsert('usuario_roles', [{
      usuario_id: adminUser[0].id,
      role_id: adminRole[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar el usuario admin
    await queryInterface.bulkDelete('usuarios', { email: 'admin@medical.com' }, {});
  }
};