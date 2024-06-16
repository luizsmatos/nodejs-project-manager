# Etapa de instalação das dependências
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --loglevel verbose

# Etapa final de execução
FROM dependencies AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Etapa final de execução
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 8080
CMD [ "npm", "run", "preview" ]