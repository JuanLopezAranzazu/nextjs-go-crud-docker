# ----------------------------
# Etapa base
# ----------------------------
FROM node:20-alpine AS base
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# ----------------------------
# Etapa deps: instalar todas las dependencias
# ----------------------------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# ----------------------------
# Etapa builder: compilar la app
# ----------------------------
FROM base AS builder
WORKDIR /app

# Copiar dependencias desde deps
COPY --from=deps /app/node_modules ./node_modules

# Copiar todo el código
COPY . .

# Construir Next.js (produce output standalone)
RUN pnpm build

# ----------------------------
# Etapa runner: producción
# ----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
EXPOSE 3000

# Copiar output standalone y public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Usuario no root (opcional pero recomendado)
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
USER nextjs

# Comando de inicio
CMD ["node", "server.js"]
