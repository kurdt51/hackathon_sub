import express from 'express';
import { db, admin } from '../services/firebaseAdmin.js';


const router = express.Router();

router.post('/saveProfile', async (req, res) => {
  const { uid, nome, cpf, crm, hospitalId, email, tipo } = req.body;

  try {
    const userData = {
      nome,
      cpf,
      email,
      hospitalId,
      ...(tipo === 'medico' && { crm })
    };

    await db.collection(tipo === 'medico' ? 'medicos' : 'pacientes')
            .doc(uid)
            .set(userData);

    // (opcional) definir permissões ou roles com claims
    await admin.auth().setCustomUserClaims(uid, { role: tipo });

    res.status(200).send({ message: 'Perfil salvo com sucesso' });
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
    res.status(500).send({ error: "Erro ao salvar perfil" });
  }
});

export default router;