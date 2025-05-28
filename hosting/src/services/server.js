
import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
