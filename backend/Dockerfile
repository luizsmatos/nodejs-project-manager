# Etapa de instalação das dependências
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
COPY ./prisma prisma
RUN npm ci

# Etapa de construção do código
FROM dependencies AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Etapa final de execução
FROM node:20-alpine AS runner
WORKDIR /app
COPY ./prisma prisma
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist/ ./dist/

EXPOSE 3333
CMD ["npm", "start"]