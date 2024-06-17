# Project Manager

Uma aplicação abrangente para gerenciamento de projetos e tarefas.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

- [Node.js v20 ou superior](https://nodejs.org/en/download)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração do Ambiente

Para executar este projeto, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env` localizado tanto na raiz do projeto backend quanto na raiz do projeto frontend:

### Backend

Crie um arquivo `.env` no diretório `backend` com as seguintes configurações:

```bash
# Configurações de Ambiente
NODE_ENV="development"
PORT=3333

# Configurações do Banco de Dados
POSTGRES_PRISMA_URL="postgresql://docker:docker@localhost:5432/project-manager"

# Configurações do JWT
JWT_SECRET="your-secret"
```

### Frontend

Crie um arquivo `.env` no diretório `frontend` com as seguintes configurações:

```bash
# Configurações da API
VITE_API_URL="http://localhost:3333"
VITE_ENABLE_API_DELAY=false
```

## Início Rápido

Siga os passos abaixo para configurar e executar o projeto localmente:

### Clonar o Repositório

```bash
git clone git@github.com:luizsmatos/project-manager.git
```

### Navegar até o Diretório do Projeto

```bash
cd project-manager
```

### Instalar Dependências do Backend

```bash
cd backend
npm install
```

### Executar Migrações do Prisma

Navegue até o diretório do backend e execute as migrações:

```bash
cd ../backend
npm run db:migrate
```

### Instalar Dependências do Frontend

```bash
cd ../frontend
npm install
```

## Executando o Servidor de Desenvolvimento

### Backend

Para iniciar o servidor backend em modo de desenvolvimento:

```bash
cd backend
npm run start:dev
```

### Documentação da API

A documentação da API está disponível via Swagger. Para acessá-la, execute o seguinte comando e visite o link fornecido:

```bash
http://localhost:3333/api/docs
```

### Frontend

Para iniciar o servidor de desenvolvimento do frontend:

```bash
cd ../frontend
npm run start:dev
```

## Testes

Para executar os testes unitários e de integração, utilize os seguintes comandos:

### Testes do Backend

```bash
# Executar todos os testes unitários
cd backend
npm test

# Executar testes unitários em modo de observação
npm run test:watch

# Executar testes de integração
npm run test:e2e
```

## Configuração do Docker

Este projeto inclui um arquivo `docker-compose.yml` para execução da aplicação em um ambiente Docker. Certifique-se de que o Docker esteja instalado e em execução no seu sistema, então use o seguinte comando para iniciar os serviços:

```bash
docker-compose up -d --build
```

Neste ponto, você deve ter uma instância funcional para brincar em `http://localhost:8080/` dentro de alguns instantes.

### Parando os Serviços Docker

Para parar os serviços em execução:

```bash
docker-compose down
```

Este comando irá parar e remover os containers, mas preservar os dados nos volumes especificados.