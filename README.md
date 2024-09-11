<p align="center">
  <img src="https://github.com/klausseidner/React-Native-Template/blob/main/logo.png" width="30%" alt="REACT-NATIVE-TEMPLATE-logo">
</p>
<p align="center">
    <h1 align="center">
        Projeto de Gerenciamento de Processos
    </h1>
</p>
<p align="center">
    <h3 align="center">
        ❯ Este projeto é um aplicativo de gerenciamento de processos desenvolvido utilizando <strong>React Native</strong> com <strong>Tailwind CSS</strong> no frontend e <strong>Node.js</strong> (Express) no backend. A autenticação é baseada em <strong>JSON Web Token</strong> (JWT), e o banco de dados utilizado é o <strong>MySQL</strong>. O objetivo é fornecer uma plataforma robusta para gerenciar processos de forma eficiente, com segurança garantida através de tokens JWT dentre outras medidas de segurança. ❮
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
    ├── db.sql # Script SQL para criação do banco de dados
    ├── LICENSE # Licença do projeto
    ├── logo.png # Logo do projeto
    ├── package.json # Arquivo de configuração do npm
    ├── project.txt # Informações do projeto
    ├── README.md # Documentação do projeto
    ├── server.js # Arquivo principal do servidor
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
    │   ├── db.js # Configuração do banco de dados
    │   └── redis.js # Configuração do Redis
    ├── context # Contextos do aplicativo
    │   └── AuthContext.js # Contexto de autenticação
    ├── controllers # Controladores do aplicativo
    │   ├── AuthController.js # Controlador de autenticação
    │   └── ProcessController.js # Controlador de processos
    ├── logs # Logs do aplicativo
    │   ├── error.log # Log de erros
    │   └── combined.log # Log de atividades
    ├── middleware # Middlewares do aplicativo
    │   └── authMiddleware.js # Middleware de autenticação
    ├── models # Modelos do aplicativo
    │   ├── ProcessModel.js # Modelo de processos
    │   └── UserModel.js # Modelo de usuários
    ├── routes # Rotas do aplicativo
    │   ├── authRoutes.js # Rotas de autenticação
    │   └── processRoutes.js # Rotas de processos
    ├── utils # Utilitários do aplicativo
    │   ├── api.js # Funções de requisição
    │   ├── logger.js # Funções de log
    │   └── tokenUtils.js # Funções de token
    └── views # Telas do aplicativo
        ├── AdminDashboard.js # Painel de controle do administrador
        ├── Dashboard.js # Painel de controle do usuário
        ├── AdminEditProcess.js # Edição de processos pelo administrador
        ├── CreateProcess.js # Criação de processos
        ├── CreateUser.js # Criação de usuários
        ├── DetailsProcess.js # Detalhes de processos
        ├── EditProcess.js # Edição de processos
        ├── EditProfile.js # Edição de perfil
        ├── Login.js # Tela de login
        ├── Profile.js # Perfil do usuário
        └── UserProcesses.js # Processos do usuário
```

---

## 🚀 Instalação

### 🔖 Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **MySQL** em execução localmente ou serviço em nuvem (ex: AWS RDS, Azure, Google Cloud SQL e etc.)
- **Git** para clonar o repositório

### 📦 Configurações

1. Instalar o **Node.js** e o **NPM** (**🐧 Ubuntu**): 
   ```bash
    sudo apt update
    sudo apt install nodejs
    sudo apt install npm
    ```
    ou, se você preferir:
    ```bash
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
    Instalar o **Node.js** e o **NPM** (**🟦 Windows**):
    - Acesse o site oficial do [Node.js](https://nodejs.org/en/download/) e baixe o instalador.
    - Execute o instalador e siga as instruções.

2. Instalar o **MySQL** (**🐧 Ubuntu**):
    ```bash	
    sudo apt update
    sudo apt install mysql-server
    sudo mysql_secure_installation
    ```
    ou, se você preferir:
    ```bash
    sudo apt update
    sudo apt install mariadb-server
    sudo mysql_secure_installation
    ```
    Instalar o **MySQL** (**🟦 Windows**):
    - Acesse o site oficial do [MySQL](https://dev.mysql.com/downloads/installer/) e baixe o instalador.
    - Execute o instalador e siga as instruções.

3. Instalar o **Git** (**🐧 Ubuntu**):
    ```bash
    sudo apt update
    sudo apt install git
    ```
    Instalar o **Git** (**🟦 Windows**):
    - Acesse o site oficial do [Git](https://git-scm.com/downloads) e baixe o instalador.
    - Execute o instalador e siga as instruções.

4. Instalar o **React Native CLI**:
    ```bash
    npm install -g react-native-cli
    ```

5. Criação de um novo projeto:
    ```bash
    npx react-native init MeuApp
    ```

6. Navegue até a pasta do projeto:
    ```bash
    cd MeuApp
    ```

7. Instale as dependências:
    ```bash
    npm install react-native-config react-native-snap-carousel react-native-chart-kit react-native-vector-icons tailwind-rn express express-validator express-rate-limit cors body-parser morgan helmet mysql2 redis bcrypt jsonwebtoken axios winston
    ```
    ou, se você preferir:
    ```bash
    npm install
    ```

8. Clone o repositório e navegue até a pasta do backend:
   ```bash
   git clone https://github.com/klausseidner/React-Native-Template.git
   ```

9. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
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

10. Importe o arquivo `db.sql` para o MySQL para criar o banco de dados e as tabelas.

11. Inicie o servidor:
    ```bash
    npm start
    ```

### 📱👾 Gerar APK (Android)

1. Instale o **Android Studio** e o **SDK**.
    - **Android Studio**: [Download](https://developer.android.com/studio)
    - **SDK**: Configure o SDK no Android Studio.
2. Execute o comando:
    ```bash
    npx react-native run-android
    ```
3. Para gerar o APK, execute o comando:
    ```bash
    cd android
    ./gradlew assembleRelease
    ```
4. O APK gerado estará na pasta `android/app/build/outputs/apk/release/app-release.apk`.

### 📱🍏 Gerar IPA (IOS)

1. Instale o **Xcode**.
2. Execute o comando:
    ```bash
    npx react-native run-ios
    ```
3. Para gerar o arquivo `.ipa`, abra o projeto no Xcode e siga as instruções.

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

