import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  res.json({ message: 'Usuário registrado com sucesso', userId: user.id });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  res.json({ accessToken, refreshToken });
});

router.post('/logout', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email não informado.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await prisma.user.update({
      where: { email },
      data: { refreshToken: null }
    });

    res.json({ message: 'Logout realizado com sucesso.' });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar logout.' });
  }
});


// Rotas feitos pelo grupo Augusto César, Guilherme N., João Kaio e Rikelme R  ...

// Rota /refresh - Gerar novo access token a partir do refresh token
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token não informado' });
  }

  try {
    // Verificar se o refresh token é válido
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Buscar o usuário no banco e verificar se o refresh token corresponde
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id } 
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Refresh token inválido' });
    }

    // Gerar novo access token
    const newAccessToken = jwt.sign(
      { id: user.id }, 
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });

  } catch (error) {
    return res.status(403).json({ error: 'Refresh token inválido ou expirado' });
  }
});

// Rota /protected - Rota protegida que requer autenticação
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Você acessou uma rota protegida!',
    userId: req.user.id 
  });
});

export default router;
