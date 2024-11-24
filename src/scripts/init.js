
const { execSync } = require('child_process');

const waitForDB = () => {
  console.log('Esperando a que la base de datos esté lista...');
  let retries = 5;
  while (retries) {
    try {
      execSync('npx sequelize-cli db:authenticate');
      console.log('Base de datos conectada!');
      return true;
    } catch (err) {
      console.log('Esperando conexión a la base de datos...');
      retries -= 1;
      // Esperar 5 segundos antes de reintentar
      execSync('sleep 5');
    }
  }
  return false;
};

const init = async () => {
  try {
    // Esperar a que la base de datos esté lista
    if (!waitForDB()) {
      console.error('No se pudo conectar a la base de datos');
      process.exit(1);
    }

    // Ejecutar migraciones
    console.log('Ejecutando migraciones...');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
    console.log('Migraciones completadas');

    // Ejecutar seeders en producción si es necesario
    if (process.env.SEED_DB === 'true') {
      console.log('Ejecutando seeders...');
      execSync('npx sequelize-cli db:seed:all', { stdio: 'inherit' });
      console.log('Seeders completados');
    }

    // Iniciar la aplicación
    require('../app.js');
  } catch (error) {
    console.error('Error durante la inicialización:', error);
    process.exit(1);
  }
};

init();