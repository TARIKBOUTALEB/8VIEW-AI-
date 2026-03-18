# Étape 1 : Build de l'application React/Vite
FROM node:20-alpine as builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur Node.js pour exposer l'application
FROM node:20-alpine

WORKDIR /app

# Copier les dépendances et le build
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts

# Installer tsx pour exécuter server.ts
RUN npm install -g tsx

# Hugging Face Spaces utilise le port 7860 par défaut
EXPOSE 7860
ENV PORT=7860
ENV NODE_ENV=production

# Démarrer le serveur Node.js
CMD ["tsx", "server.ts"]
