import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { AuthLoginContext } from "../../contexts/AuthLoginContext";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export function Acesso_paciente() {
  const { user, logout } = useContext(AuthLoginContext);
  const [pacienteId, setPacienteId] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [exames, setExames] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);

  // Buscar ID do paciente
  useEffect(() => {
    async function buscarPaciente() {
      const q = query(collection(db, "pacientes"), where("email", "==", user.email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setPacienteId(doc.id);
        setNomePaciente(doc.data().nome);
      }
    }

    if (user) buscarPaciente();
  }, [user]);

  // Buscar dados do paciente
  useEffect(() => {
    if (!pacienteId) return;

    const fetchData = async () => {
      // Exames
      const examesRef = collection(db, `pacientes/${pacienteId}/exames`);
      const examesSnapshot = await getDocs(examesRef);
      setExames(examesSnapshot.docs.map(doc => doc.data()));

      // Medicamentos
      const medicamentosRef = collection(db, `pacientes/${pacienteId}/medicamentos`);
      const medicamentosSnapshot = await getDocs(medicamentosRef);
      setMedicamentos(medicamentosSnapshot.docs.map(doc => doc.data()));

      // Diagnósticos
      const diagnosticosRef = collection(db, `pacientes/${pacienteId}/diagnosticos`);
      const diagnosticosSnapshot = await getDocs(diagnosticosRef);
      setDiagnosticos(diagnosticosSnapshot.docs.map(doc => doc.data()));
    };

    fetchData();
  }, [pacienteId]);

  return (
    <div className="container">

      <header className="header">
        <img src={logoImg} alt="Logo" className="pacienteImg" />
        <span>Bem-vindo, {nomePaciente}</span>
      </header>

      <section>
        <h3>📄 Exames</h3>
        <ul>
          {exames.map((exame, index) => (
            <li key={index}>
              <a href={exame.url} target="_blank" rel="noopener noreferrer">
                {exame.nomeArquivo}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>💊 Medicamentos</h3>
        <ul>
          {medicamentos.map((med, index) => (
            <li key={index}>{med.medicamento}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>🩺 Diagnósticos</h3>
        <ul>
          {diagnosticos.map((diag, index) => (
            <li key={index}>{diag.diagnostico}</li>
          ))}
        </ul>
      </section>
          <br/>
          <br/>
      <button onClick={logout}>Sair</button>

    </div>

  );
}
