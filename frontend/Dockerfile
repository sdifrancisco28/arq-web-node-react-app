# Usa una imagen base de Node.js
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Establece la variable de entorno para el puerto
ENV PORT 3001

# Expose the port that the application listens on.
EXPOSE 3001

# Compila la aplicación React
RUN npm run build

CMD ["npm", "start"]