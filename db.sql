CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  rg VARCHAR(12),
  cpf VARCHAR(14),
  role ENUM('comum', 'administrativo') DEFAULT 'comum',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE processes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  option INT CHECK(option BETWEEN 1 AND 6),
  status ENUM('ativo', 'em processo', 'concluído', 'repugnado') DEFAULT 'ativo',
  version INT DEFAULT 1,  # Versão do processo
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
