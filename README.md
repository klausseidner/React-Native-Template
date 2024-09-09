<p align="center">
  <img src="https://img.icons8.com/?size=512&id=55494&format=png" width="20%" alt="REACT-NATIVE-TEMPLATE-logo">
</p>
<p align="center">
    <h1 align="center">
        Projeto de Gerenciamento de Processos
    </h1>
</p>
<p align="center">
    <h3 align="center">
        ❯ Este projeto é um aplicativo de gerenciamento de processos desenvolvido utilizando **React Native** com **Tailwind CSS** no frontend e **Node.js** (Express) no backend. A autenticação é baseada em **JSON Web Token** (JWT), e o banco de dados utilizado é o **MySQL**. O objetivo é fornecer uma plataforma robusta para gerenciar processos de forma eficiente, com segurança garantida através de tokens JWT.
    </h3>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/klausseidner/React-Native-Template?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/klausseidner/React-Native-Template?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/klausseidner/React-Native-Template?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/klausseidner/React-Native-Template?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>

<br>

## 🧩 Tecnologias Utilizadas
- **Frontend**: React Native, Tailwind CSS
- **Backend**: Node.js (Express)
- **Banco de Dados**: MySQL
- **Autenticação**: JSON Web Token (JWT)
- **Validação de Dados**: Express-validator
- **Segurança**: bcrypt (criptografia de senhas), cors (Cross-Origin Resource Sharing), express-rate-limit (limitação de requisições), helmet (proteção de cabeçalhos HTTP) e secure-store (armazenamento seguro de tokens)

## 📂 Repository Structure

```sh
└── React-Native-Template/
    ├── App.js
    ├── LICENSE
    ├── README.md
    ├── components
    │   ├── Button.js
    │   ├── Carrossel.js
    │   ├── Charts.js
    │   ├── Footer.js
    │   ├── Forms.js
    │   ├── Header.js
    │   ├── Menu.js
    │   ├── Modal.js
    │   └── Table.js
    ├── config
    │   └── db.js
    ├── context
    │   └── AuthContext.js
    ├── controllers
    │   ├── AuthController.js
    │   └── ProcessController.js
    ├── db.sql
    ├── middleware
    │   └── authMiddleware.js
    ├── models
    │   ├── ProcessModel.js
    │   └── UserModel.js
    ├── package.json
    ├── project.txt
    ├── routes
    │   ├── authRoutes.js
    │   └── processRoutes.js
    ├── server.js
    ├── utils
    │   ├── api.js
    │   └── tokenUtils.js
    └── views
        ├── AdminDashboard.js
        ├── AdminEditProcess.js
        ├── CreateProcess.js
        ├── CreateUser.js
        ├── EditProcess.js
        ├── EditProfile.js
        ├── Login.js
        └── UserProcesses.js
```

---

## 🚀 Instalação

### 🔖 Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **MySQL** em execução localmente ou serviço em nuvem (ex: AWS RDS, Azure, Google Cloud SQL e etc.)
- **Git** para clonar o repositório

### 📦 Configurações
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

## 🤝 Autor

- [@klausseidner](https://www.github.com/klausseidner) (Klaus Seidner)

## 🍺 Me Pague uma cerveja! 🍺

[![BTC Wallet](https://en.cryptobadges.io/badge/big/0x0)](https://en.cryptobadges.io/donate/0x0)
[![ETH Wallet](https://en.cryptobadges.io/badge/big/0x0)](https://en.cryptobadges.io/donate/0x0)
[![SOL Wallet](https://en.cryptobadges.io/badge/big/0x0)](https://en.cryptobadges.io/donate/0x0)

## 📌 Documentação

[Documentação (Em breve)](#)

## 🎗 Licença

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

