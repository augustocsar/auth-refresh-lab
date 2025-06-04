import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
