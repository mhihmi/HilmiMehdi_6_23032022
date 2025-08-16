# Utiliser l'image officielle Node.js (version LTS recommandée)
FROM node:20-alpine

# Installer les outils nécessaires pour les packages natifs (bcrypt, etc.)
RUN apk add --no-cache python3 make g++

# Créer le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances (npm ci avec --omit=dev remplace --only=production)
# Utilisation de --legacy-peer-deps pour résoudre le conflit mongoose/mongoose-unique-validator
# Inclusion des devDependencies car morgan est utilisé en production
RUN npm ci --legacy-peer-deps

# Copier le reste du code de l'application
COPY . .

# Créer le dossier images s'il n'existe pas
RUN mkdir -p images

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001 -G nodejs

# Changer la propriété du répertoire /app et du dossier images
RUN chown -R nodejs:nodejs /app /app/images

# Passer à l'utilisateur non-root
USER nodejs

# Commande pour démarrer l'application
CMD ["npm", "start"]
