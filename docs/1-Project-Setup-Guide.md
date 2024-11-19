# Medical AI System - Project Setup Guide

## Prerequisites
- Node.js (v20 or higher)
- PostgreSQL
- npm or yarn

## Initial Setup

### 1. Project Initialization
```bash
mkdir medical-ai-system
cd medical-ai-system
npm init -y
```

### 2. Dependencies Installation
```bash
# Core dependencies
npm install express pg pg-hstore sequelize dotenv cors helmet express-validator bcryptjs jsonwebtoken multer winston morgan

# Development dependencies
npm install --save-dev nodemon jest supertest prettier eslint @types/jest globals @eslint/js
```

### 3. Project Structure
Create the following directory structure:
```
medical-ai-system/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── storage.js
│   │   ├── logger.js
│   │   └── auth.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── hce/
│   │   ├── sgd/
│   │   └── ai/
│   ├── shared/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── services/
│   ├── routes/
│   └── app.js
├── docs/
└── tests/
```

### 4. Environment Configuration
Create `.env` file in the root directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug

# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=medical_ai_db

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here

# File Upload Configuration
UPLOAD_PATH=uploads
MAX_FILE_SIZE=10485760
```

### 5. ESLint Configuration
Initialize ESLint:
```bash
npx eslint --init
```

Answer the prompts:
- Use ESLint for: Finding problems
- Type of modules: JavaScript modules (import/export)
- Framework: None
- TypeScript: No
- Code runs in: Browser
- Config file format: JavaScript
- Install dependencies: Yes
- Package manager: npm

The generated `eslint.config.mjs` should be modified to:
```javascript
import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    },
    env: {
      node: true,
      jest: true
    }
  }
];
```

### 6. Git Configuration
Create `.gitignore`:
```gitignore
# Dependencies
node_modules/

# Environment variables
.env
.env.*

# Logs
logs/
*.log
npm-debug.log*

# Runtime data
uploads/
dist/
build/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Project Architecture Overview

The project follows a modular monolithic architecture with four main components:

1. **Authentication Module (Auth)**
   - User management
   - Authentication & Authorization
   - Session handling

2. **Electronic Health Record Module (HCE)**
   - Patient records
   - Medical consultations
   - Clinical history

3. **Document Management System Module (SGD)**
   - Document storage
   - Version control
   - Access management

4. **AI Analysis Module**
   - Image processing
   - Diagnostic assistance
   - Integration with HCE/SGD

## Next Steps

After completing this setup, you can proceed with:
1. Setting up the database models
2. Implementing authentication
3. Creating the core modules
4. Setting up unit tests

## Running the Project

To start the development server:
```bash
npm run dev
```

To run tests:
```bash
npm test
```

## Additional Notes

- The project uses a modular monolithic architecture for rapid development
- All sensitive information is stored in environment variables
- Logging is configured for both development and production environments
- File uploads are restricted to specific types and sizes
- ESLint ensures code quality and consistency