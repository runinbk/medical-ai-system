# Dockerfile
FROM node:20-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Instalar dependencias del sistema
RUN apk add --no-cache \
    postgresql-client \
    python3 \
    make \
    g++

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el código fuente
COPY . .

# Crear directorios necesarios
RUN mkdir -p uploads/documentos uploads/imagenes

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]