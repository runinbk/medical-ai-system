const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const { dbConnection } = require('./database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Paths para cada módulo del sistema
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            patients: '/api/patients',
            doctors: '/api/doctors',
            appointments: '/api/appointments',
            documents: '/api/documents',
            examinations: '/api/examinations',
            prescriptions: '/api/prescriptions',
            ai: '/api/ai-analysis',
            search: '/api/search',
            uploads: '/api/uploads'
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        try {
            await dbConnection();
            console.log('Base de datos conectada');
        } catch (error) {
            console.error('Error al conectar la base de datos:', error);
            throw new Error('Error al iniciar la base de datos');
        }
    }

    middlewares() {
        // Seguridad
        this.app.use(helmet());

        // CORS
        this.app.use(cors());

        // Rate Limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100 // límite de 100 peticiones por ventana
        });
        this.app.use(limiter);

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Directorio público
        this.app.use(express.static('public'));

        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
            limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max-file-size
            abortOnLimit: true
        }));
    }

    routes() {
        // // Auth routes
        this.app.use(this.paths.auth, require('./routes/auth.routes'));
        // this.app.use(this.paths.users, require('../routes/users'));
        
        // // Medical records routes
        // this.app.use(this.paths.patients, require('../routes/patients'));
        // this.app.use(this.paths.doctors, require('../routes/doctors'));
        // this.app.use(this.paths.appointments, require('../routes/appointments'));
        
        // // Document management routes
        // this.app.use(this.paths.documents, require('../routes/documents'));
        // this.app.use(this.paths.examinations, require('../routes/examinations'));
        // this.app.use(this.paths.prescriptions, require('../routes/prescriptions'));
        
        // // AI and utilities routes
        // this.app.use(this.paths.ai, require('../routes/ai-analysis'));
        // this.app.use(this.paths.search, require('../routes/search'));
        // this.app.use(this.paths.uploads, require('../routes/uploads'));

        // 404 handler
        this.app.use((req, res) => {
            res.status(404).json({
                msg: 'Endpoint no encontrado'
            });
        });

        // Error handler
        this.app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).json({
                msg: 'Error interno del servidor',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;