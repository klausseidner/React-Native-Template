////////////////////////////////////////////////////////////////////////////////////////////////////
// Rotas de autenticação
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'; // Importa o módulo express
import { check } from 'express-validator'; // Importa a função de validação de entrada
import AuthController from '../controllers/AuthController.js'; // Importa o controlador de autenticação

const router = express.Router(); // Cria um roteador

////////////////////////////////////////////////////////////////////////////////////////////////////
// Rotas de autenticação com validação de entrada
////////////////////////////////////////////////////////////////////////////////////////////////////
router.post( // Rota de registro de usuário
  '/register',
  [
    check('email').isEmail().withMessage('Insira um e-mail válido'), // Valida o e-mail
    check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'), // Valida a senha
    check('name').notEmpty().withMessage('O nome é obrigatório'), // Valida o nome
  ],
  AuthController.register // Controlador de registro de usuário
);

router.post( // Rota de login de usuário
  '/login',
  [
    check('email').isEmail().withMessage('Insira um e-mail válido'), // Valida o e-mail
    check('password').notEmpty().withMessage('A senha é obrigatória'), // Valida a senha
  ],
  AuthController.login // Controlador de login de usuário
);

export default router; // Exporta o roteador

////////////////////////////////////////////////////////////////////////////////////////////////////