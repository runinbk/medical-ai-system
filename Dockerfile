FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias incluyendo las de desarrollo
RUN npm install

# Instalar sequelize-cli globalmente
RUN npm install -g sequelize-cli

# Copiar el código fuente
COPY . .

# Variables de entorno por defecto
ENV NODE_ENV=production \
    PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]