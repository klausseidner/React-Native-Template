<p align="center">
  <img src="https://github.com/klausseidner/React-Native-Template/blob/main/logo.png" width="20%" alt="REACT-NATIVE-TEMPLATE-logo">
</p>
<p align="center">
    <h1 align="center">
        Projeto de Gerenciamento de Processos
    </h1>
</p>
<p align="center">
    <h3 align="center">
        ❯ Este projeto é um aplicativo de gerenciamento de processos desenvolvido utilizando <strong>React Native</strong> com <strong>Tailwind CSS</strong> no frontend e <strong>Node.js</strong> (Express) no backend. A autenticação é baseada em <strong>JSON Web Token</strong> (JWT), e o banco de dados utilizado é o <strong>MySQL</strong>. O objetivo é fornecer uma plataforma robusta para gerenciar processos de forma eficiente, com segurança garantida através de tokens JWT.
    </h3>
</p>
<br>
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

## 📂 Estrutura do Repositório

```sh
└── React-Native-Template/ # Raiz do projeto
    ├── App.js # Arquivo principal do aplicativo
    ├── LICENSE # Licença do projeto
    ├── README.md # Documentação do projeto
    ├── components # Componentes do aplicativo
    │   ├── Button.js # Botão customizado
    │   ├── Carrossel.js # Carrossel de imagens
    │   ├── Charts.js # Gráficos
    │   ├── Footer.js # Rodapé
    │   ├── Forms.js # Formulários
    │   ├── Header.js # Cabeçalho
    │   ├── Menu.js # Menu de navegação
    │   ├── Modal.js # Modal
    │   └── Table.js # Tabela
    ├── config # Configurações do aplicativo
    │   └── db.js # Configuração do banco de dados
    ├── context # Contextos do aplicativo
    │   └── AuthContext.js # Contexto de autenticação
    ├── controllers # Controladores do aplicativo
    │   ├── AuthController.js # Controlador de autenticação
    │   └── ProcessController.js # Controlador de processos
    ├── db.sql # Script SQL para criação do banco de dados
    ├── middleware # Middlewares do aplicativo
    │   └── authMiddleware.js # Middleware de autenticação
    ├── models # Modelos do aplicativo
    │   ├── ProcessModel.js # Modelo de processos
    │   └── UserModel.js # Modelo de usuários
    ├── package.json # Arquivo de configuração do npm
    ├── project.txt # Informações do projeto
    ├── routes # Rotas do aplicativo
    │   ├── authRoutes.js # Rotas de autenticação
    │   └── processRoutes.js # Rotas de processos
    ├── server.js # Arquivo principal do servidor
    ├── utils # Utilitários do aplicativo
    │   ├── api.js # Funções de requisição
    │   └── tokenUtils.js # Funções de token
    └── views # Telas do aplicativo
        ├── AdminDashboard.js # Painel de controle do administrador
        ├── AdminEditProcess.js # Edição de processos pelo administrador
        ├── CreateProcess.js # Criação de processos
        ├── CreateUser.js # Criação de usuários
        ├── EditProcess.js # Edição de processos
        ├── EditProfile.js # Edição de perfil
        ├── Login.js # Tela de login
        └── UserProcesses.js # Processos do usuário
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
   git clone https://github.com/klausseidner/React-Native-Template.git

5. Instale as dependências:
    ```bash
    npm install
    ```
    ou, se você preferir:
    ```bash
    npm install helmet cors express express-rate-limit bcryptjs jsonwebtoken mysql2 express-validator dotenv secure-store redis winston redis swagger-ui-express swagger-jsdoc react-native-vector-icons

6. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```env
    # Configurações do JWT
    JWT_SECRET=seu-segredo-jwt
    JWT_EXPIRATION=1h

    # Configurações do servidor
    PORT=5000
    CLIENT_URL=https://seu-dominio.com
    
    # Configurações do Redis
    REDIS_HOST=localhost
    REDIS_PORT=6379

    # Configurações do MySQL
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=nome_do_banco

7. Importe o arquivo `db.sql` para o MySQL para criar o banco de dados e as tabelas.

8. Inicie o servidor:
    ```bash
    npm start

## 🤝 Autor

- [@klausseidner](https://www.github.com/klausseidner) (Klaus Seidner)

## 🍺 Me Pague uma cerveja! 🍺

[![BTC Wallet](http://img.shields.io/badge/Bitcoin-000000?style=flat&logo=bitcoin&logoColor=white)](https://www.blockchain.com/btc/address/bc1qtfh4asd7jhyxxpnk0254c2tr6zy4p3aagr9lnc)
[![ETH Wallet](http://img.shields.io/badge/Ethereum-000000?style=flat&logo=ethereum&logoColor=white)](https://www.blockchain.com/eth/address/0x4bdebD8AA648a88f06Acc7944Ab852676eF059d1)
[![SOL Wallet](http://img.shields.io/badge/Solana-000000?style=flat&logo=solana&logoColor=white)](https://solscan.io/account/2NWJyYUx4YgdAWkr4pbjbqQvtSGCFH44mqJ1gHnfxu3L)

## 📌 Documentação

[Documentação (Em breve)](#)

## 🎗 Licença

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

