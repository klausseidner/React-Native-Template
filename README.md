# Projeto de Gerenciamento de Processos

## Visão Geral
Este projeto é um aplicativo de gerenciamento de processos desenvolvido utilizando **React Native** com **Tailwind CSS** no frontend e **Node.js** (Express) no backend. A autenticação é baseada em **JSON Web Token** (JWT), e o banco de dados utilizado é o **MySQL**. O objetivo é fornecer uma plataforma robusta para gerenciar processos de forma eficiente, com segurança garantida através de tokens JWT.

## Tecnologias Utilizadas
- **Frontend**: React Native, Tailwind CSS
- **Backend**: Node.js (Express)
- **Banco de Dados**: MySQL
- **Autenticação**: JSON Web Token (JWT)
- **Validação de Dados**: Express-validator
- **Segurança**: bcrypt (criptografia de senhas), cors (Cross-Origin Resource Sharing), express-rate-limit (limitação de requisições), helmet (proteção de cabeçalhos HTTP) e secure-store (armazenamento seguro de tokens)

## Instalação

### Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **MySQL** em execução localmente ou serviço em nuvem (ex: AWS RDS, Azure, Google Cloud SQL e etc.)
- **Git** para clonar o repositório

### Configurações
1. Instalar o **Node.js**:
   - [Node.js](https://nodejs.org/)

2. Instalar o **MySQL**:
    - [MySQL](https://www.mysql.com/)
    
3. Instalar o **Git**:
    - [Git](https://git-scm.com/)

4. Clone o repositório e navegue até a pasta do backend:
   ```bash
   git clone https://github.com/usuario/projeto.git
   cd backend

5. Instale as dependências:
    ```bash
    npm install

6. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    JWT_SECRET=seu-segredo-jwt
    JWT_EXPIRATION=1h
    PORT=5000
    CLIENT_URL=https://seu-dominio.com

    # Configurações do MySQL
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=nome_do_banco

7. Inicie o servidor:
    ```bash
    npm start

## Autor

- [@klausseidner](https://www.github.com/klausseidner)


## Documentação

[Documentação (Em breve)](#)


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

