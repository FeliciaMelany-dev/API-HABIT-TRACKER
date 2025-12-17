# 🎯 API HABIT TRACKER

[![GitHub language count](https://img.shields.io/github/languages/count/FeliciaMelany-dev/API-HABIT-TRACKER?style=flat-square)](https://github.com/FeliciaMelany-dev/API-HABIT-TRACKER)
[![GitHub top language](https://img.shields.io/github/languages/top/FeliciaMelany-dev/API-HABIT-TRACKER?style=flat-square)](https://github.com/FeliciaMelany-dev/API-HABIT-TRACKER)

## 📖 Visão Geral (Overview)

A **API Habit Tracker** é um serviço RESTful robusto e escalável projetado para ser o *backend* de uma aplicação de gerenciamento de hábitos. Ela permite que usuários criem, acompanhem e analisem seu progresso na construção de rotinas e metas diárias.

Este projeto visa fornecer uma base sólida para qualquer cliente (Web, Mobile, Desktop) que precise de uma solução eficiente para rastreamento de consistência.


## 🛠️ Tecnologias Utilizadas

A estrutura da API foi desenvolvida utilizando as seguintes tecnologias e ferramentas:

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Linguagem** | [Node.js](https://nodejs.org/) | Ambiente de execução para o JavaScript no lado do servidor. |
| **Framework** | [Express / Fastify / NestJS](https://expressjs.com/) | Framework para construção da API REST. |
| **Banco de Dados** | [PostgreSQL / SQLite](https://www.postgresql.org/) | Banco de dados relacional para persistência de dados (hábitos e registros). |
| **ORM** | [Prisma / TypeORM](https://www.prisma.io/) | Gerenciamento de schema, migrações e consultas ao banco de dados. |
| **Autenticação** | JWT (JSON Web Tokens) | Geração de tokens para sessões seguras e stateless. |

## 🚀 Começando (Getting Started)

Siga estas etapas para configurar e executar a API localmente.

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados em seu ambiente:
* [Node.js](https://nodejs.org/en/download/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/get-npm) ou [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
* [Docker e Docker Compose](https://www.docker.com/get-started) (Opcional, para ambiente de desenvolvimento)

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/FeliciaMelany-dev/API-HABIT-TRACKER.git](https://github.com/FeliciaMelany-dev/API-HABIT-TRACKER.git)
    cd API-HABIT-TRACKER
    ```

2.  **Instale as dependências:**
    ```bash
    npm install  # ou yarn install
    ```

3.  **Crie o arquivo de variáveis de ambiente (`.env`):**
    Copie o arquivo de exemplo e configure suas variáveis de ambiente, especialmente a string de conexão com o banco de dados e o segredo JWT.
    ```bash
    cp .env.example .env
    ```

4.  **Configure o Banco de Dados:**
    Execute as migrações para criar o schema no seu banco de dados:
    ```bash
    npx prisma migrate dev 
    ```

5.  **Execute a API:**
    ```bash
    npm run dev # Inicia o servidor em modo de desenvolvimento
    ```

A API estará acessível na porta configurada no seu `.env`.

## ⚙️ Documentação da API (Endpoints)

A API segue o padrão RESTful. Abaixo estão alguns dos endpoints principais:

### 👤 Endpoints para Usuários (USER)

Estes são os *endpoints* básicos para o gerenciamento pessoal de hábitos.

| Recurso | Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Autenticação** | `POST` | `/register` | Cria uma nova conta de usuário. |
| | `POST` | `/login` | Autentica o usuário e retorna o token JWT. |
| **usuário** | `GET` | `/me` | Retorna o  usuário. (Requer Auth) |
| | `PUT` | `/me` | Atualiza as informações do usuário. (Requer Auth) |
| | `DELETE` | `/me` | Deleta o usuário. (Requer Auth) |

#### Gerenciamento de Hábitos (CRUD)

| Recurso | Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Criação** | `POST` | `/` | Cria um novo hábito para o usuário. (Requer Auth) |
| **Leitura** | `GET` | `/` | Lista **todos** os hábitos criados pelo usuário. (Requer Auth) |
| | `GET` | `/:id` | Retorna detalhes de um hábito específico. (Requer Auth) |
| **Atualização** | `PUT` | `/:id` | Atualiza completamente os detalhes de um hábito (título, recorrência). (Requer Auth) |
| **Remoção** | `DELETE` | `/:id` | Remove permanentemente um hábito e seus registros. (Requer Auth) |

### 👑 Endpoints para Administração (ADMIN)

Estes *endpoints* são restritos a usuários com a função de `ADMIN` para operações de gestão e manutenção do sistema.

| Recurso | Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Usuários** | `GET` | `/users` | Lista todos os usuários cadastrados no sistema. |
| | `GET` | `/users/:id` | Retorna um usuário específico. |
| | `DELETE` | `/users/:id` | Remove um usuário e todos os seus dados. |
| | `PATCH` | `/users/:id/restore` | Restaura um usuário e todos os seus dados. |
| **Hábitos** | `GET` | `/habits` | Retorna todos os hábitos. |
| | `GET` | `/users/:id/habits` | Retorna uma lista de hábitos de um usuário específico. |

A documentação completa dos endpoints (Swagger) pode ser encontrada em `/docs` .
