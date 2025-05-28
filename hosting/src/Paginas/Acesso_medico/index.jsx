import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../services/firebaseConfig";
import { AuthLoginContext } from "../../contexts/AuthLoginContext";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export function Acesso_medico() {
  const { user, logout } = useContext(AuthLoginContext);
  const [nomeMedico, setNomeMedico] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");

  const [exames, setExames] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);

  const [arquivo, setArquivo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imgURL, setImgURL] = useState("");

  const [medicamento, setMedicamento] = useState("");
  const [diagnostico, setDiagnostico] = useState("");

  // Buscar hospitalId do médico logado
  useEffect(() => {
    async function buscarHospital() {
      const q = query(collection(db, "medicos"), where("email", "==", user.email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setHospitalId(doc.data().hospitalId);
        setNomeMedico(doc.data().nome);
      }
    }

    if (user) buscarHospital();
  }, [user]);

  // Buscar pacientes vinculados ao hospital
  useEffect(() => {
    async function buscarPacientes() {
      if (!hospitalId) return;

      const q = query(collection(db, "pacientes"), where("hospitalId", "==", hospitalId));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPacientes(lista);
    }

    buscarPacientes();
  }, [hospitalId]);

  // Buscar dados do paciente selecionado
  useEffect(() => {
    if (!pacienteSelecionado) return;

    const fetchData = async () => {
      const examesRef = collection(db, `pacientes/${pacienteSelecionado}/exames`);
      const medicamentosRef = collection(db, `pacientes/${pacienteSelecionado}/medicamentos`);
      const diagnosticosRef = collection(db, `pacientes/${pacienteSelecionado}/diagnosticos`);

      const [examesSnap, medicamentosSnap, diagnosticosSnap] = await Promise.all([
        getDocs(examesRef),
        getDocs(medicamentosRef),
        getDocs(diagnosticosRef),
      ]);

      setExames(examesSnap.docs.map(doc => doc.data()));
      setMedicamentos(medicamentosSnap.docs.map(doc => doc.data()));
      setDiagnosticos(diagnosticosSnap.docs.map(doc => doc.data()));
    };

    fetchData();
  }, [pacienteSelecionado]);

  // Upload de exame
  const handleUploadExame = async (e) => {
    e.preventDefault();
    if (!arquivo || !pacienteSelecionado) return;

    const nomeArquivo = arquivo.name;
    const storageRef = ref(storage, `exames/${pacienteSelecionado}/${nomeArquivo}`);
    const uploadTask = uploadBytesResumable(storageRef, arquivo);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      error => alert("Erro ao enviar:", error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, `pacientes/${pacienteSelecionado}/exames`), {
          url,
          nomeArquivo,
          medicoId: auth.currentUser.uid,
          data: new Date().toISOString(),
        });
        setImgURL(url);
        setArquivo(null);
        setProgress(0);
        // Atualizar lista
        setExames(prev => [...prev, { url, nomeArquivo }]);
      }
    );
  };

  // Adicionar medicamento
  const handleMedicamento = async (e) => {
    e.preventDefault();
    if (!medicamento || !pacienteSelecionado) return;

    const dados = {
      medicamento,
      medicoId: auth.currentUser.uid,
      data: new Date().toISOString(),
    };

    await addDoc(collection(db, `pacientes/${pacienteSelecionado}/medicamentos`), dados);
    setMedicamentos(prev => [...prev, dados]);
    setMedicamento("");
  };

  // Adicionar diagnóstico
  const handleDiagnostico = async (e) => {
    e.preventDefault();
    if (!diagnostico || !pacienteSelecionado) return;

    const dados = {
      diagnostico,
      medicoId: auth.currentUser.uid,
      data: new Date().toISOString(),
    };

    await addDoc(collection(db, `pacientes/${pacienteSelecionado}/diagnosticos`), dados);
    setDiagnosticos(prev => [...prev, dados]);
    setDiagnostico("");
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Logo" className="logoImg" />
        <span>Bem-vindo, Dr(a). {nomeMedico}</span>
      </header>

      <section>
        <label>Selecionar paciente:</label>
        <select
          value={pacienteSelecionado}
          onChange={(e) => setPacienteSelecionado(e.target.value)}
        >
          <option value="">-- Selecione --</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </section>

      {pacienteSelecionado && (
  <>
    <div className="dados-container">
      {/* EXAMES */}
      <div className="bloco">
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
        <br/>
        <form onSubmit={handleUploadExame}>
          <input type="file" onChange={(e) => setArquivo(e.target.files[0])} />
          <br/>
          <button type="submit" className="button-add">Enviar Exame</button>
          {progress > 0 && !imgURL && <progress value={progress} max="100" />}
        </form>
      </div>

      {/* MEDICAMENTOS */}
      <div className="bloco">
        <h3>💊 Medicamentos</h3>
        <ul>
          {medicamentos.map((med, index) => (
            <li key={index}>{med.medicamento}</li>
          ))}
        </ul>
        <form onSubmit={handleMedicamento}>
          <input
            type="text"
            placeholder="Nome do medicamento"
            value={medicamento}
            onChange={(e) => setMedicamento(e.target.value)}
          />
          <br/>
          <br/>
          <button type="submit" className="button-add">Prescrever</button>
        </form>
      </div>

      {/* DIAGNÓSTICOS */}
      <div className="bloco">
        <h3>🩺 Diagnósticos</h3>
        <ul>
          {diagnosticos.map((diag, index) => (
            <li key={index}>{diag.diagnostico}</li>
          ))}
        </ul>
        <form onSubmit={handleDiagnostico}>
          <textarea
            placeholder="Descreva o diagnóstico"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          />
          <br/>
          <button type="submit" className="button-add">Registrar</button>
        </form>
      </div>
    </div>
  </>
)}

      <br/>
      <br/>
      <button type="button" className="button-logout" onClick={logout}>Sair</button>
    </div>
  );
}