FROM node:20-alpine

WORKDIR /app

# Instalar dependencias primero para aprovechar la caché de capas de Docker
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]