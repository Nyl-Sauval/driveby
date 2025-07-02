# Image node officielle (pour build + dev)
FROM node:18-alpine

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer http-server globalement pour servir l'app en dev
RUN npm install -g http-server

# Copier tout le code source AngularJS dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port sur lequel http-server écoutera
EXPOSE 4200

CMD ["npm", "run", "start"]

