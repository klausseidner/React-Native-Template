CREATE TABLE users ( # Tabela de usuários
  id INT AUTO_INCREMENT PRIMARY KEY, # ID do usuário
  name VARCHAR(100) NOT NULL, # Nome do usuário
  email VARCHAR(100) UNIQUE NOT NULL, # E-mail do usuário
  password VARCHAR(255) NOT NULL, # Senha do usuário
  rg VARCHAR(12) UNIQUE NOT NULL, # RG do usuário
  cpf VARCHAR(14) UNIQUE NOT NULL, # CPF do usuário
  role ENUM('comum', 'administrativo') DEFAULT 'comum', # Papel do usuário
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, # Data de criação do usuário
  INDEX (email), # Índice do e-mail
  INDEX (rg), # Índice do RG
  INDEX (cpf) # Índice do CPF
);

CREATE TABLE processes ( # Tabela de processos
  id INT AUTO_INCREMENT PRIMARY KEY, # ID do processo
  user_id INT NOT NULL, # ID do usuário
  title VARCHAR(255) NOT NULL, # Título do processo
  description TEXT, # Descrição do processo
  option INT CHECK(option BETWEEN 1 AND 6) DEFAULT 1,  # Valor padrão adicionado
  status ENUM('ativo', 'em processo', 'concluído', 'repugnado') DEFAULT 'ativo', # Status do processo
  version INT DEFAULT 1,  # Versão do processo 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, # Data de criação do processo
  FOREIGN KEY (user_id) REFERENCES users(id), # Chave estrangeira do usuário
  INDEX (user_id) # Índice do ID do usuário
); 
