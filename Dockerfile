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

# Étape 2 : Serveur Nginx pour exposer l'application
FROM nginx:alpine

# Hugging Face Spaces utilise le port 7860 par défaut
EXPOSE 7860

# Configurer Nginx pour écouter sur le port 7860 et gérer le routage SPA (Single Page Application)
RUN echo 'server { \
    listen 7860; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copier les fichiers construits depuis l'étape 1 vers le dossier Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
