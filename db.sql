CREATE TABLE users ( 
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(100) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL, 
  rg VARCHAR(12) UNIQUE NOT NULL, 
  cpf VARCHAR(14) UNIQUE NOT NULL, 
  role ENUM('comum', 'administrativo') DEFAULT 'comum', 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  INDEX (email), 
  INDEX (rg), 
  INDEX (cpf)
);

CREATE TABLE processes (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  user_id INT NOT NULL, 
  title VARCHAR(255) NOT NULL, 
  description TEXT, 
  process_option INT DEFAULT 1,  -- Valor padrão para o campo
  status ENUM('ativo', 'em processo', 'concluído', 'repugnado') DEFAULT 'ativo', 
  version INT DEFAULT 1,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES users(id), 
  INDEX (user_id),
  CONSTRAINT chk_process_option CHECK (process_option BETWEEN 1 AND 6)  -- Correção da restrição CHECK
);
