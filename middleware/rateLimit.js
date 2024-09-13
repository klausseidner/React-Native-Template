////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware de rate limiting
////////////////////////////////////////////////////////////////////////////////////////////////////
import rateLimit from 'express-rate-limit'; // Importa o módulo express-rate-limit

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições
    message: "Muitas requisições feitas pelo mesmo IP, tente novamente mais tarde.", // Mensagem de erro
  });

export default limiter; // Exporta o middleware de rate limiting
