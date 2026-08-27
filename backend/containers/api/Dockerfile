#====
# Dockerfile basado en:
#  - https://docs.docker.com/guides/nextjs/
#  - https://github.com/vercel/next.js/tree/canary/examples/with-docker
#===

#=====================================
#
# Etapa 1: Instalacion de dependencias
#
#=====================================

FROM node:26-alpine3.23 AS dependencies

WORKDIR /app

COPY package*.json ./

COPY package-lock.json* ./

# Dependencias se instalan con un lockfile "congelado" (frozen) para compilaciones reproducibles
RUN --mount=type=cache,target=/root/.npm \
    if [ -f package-lock.json ]; then \
        npm ci --no-audit --no-fund; \
    else \
        echo "No se encontro el package-lock.json." && exit 1; \
    fi


#=====================================
#
# Etapa 2: Compilacion (build) de API NextJS
#
#=====================================


FROM node:26-alpine3.23 AS builder

WORKDIR /app

# Se copian las dependencias de la etapa 'dependencies'
COPY --from=dependencies /app/node_modules ./node_modules

# Se copian el resto del codigo fuente de la API REST
COPY . .

# ENV NODE_ENV=production

RUN npm run build

#=====================================
#
# Etapa 3: Ejecucion (runner)
#
#=====================================

FROM node:26-alpine3.23 AS runner

WORKDIR /app

# Se crean carpetas y copian archivos con permisos non-root 'node:node'
RUN mkdir .next
RUN chown node:node .next

RUN mkdir prisma
RUN chown node:node prisma


COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Necesario por Prisma y por el seed de Prisma (aunque hara que la imagen sea mas pesada)
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/src ./src

# Archivos de Prisma
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/prisma.config.ts ./prisma.config.ts

COPY --from=builder --chown=node:node /app/docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x ./docker-entrypoint.sh

# Se cambia a usuario non-root 'node'
USER node

# Puerto
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]

