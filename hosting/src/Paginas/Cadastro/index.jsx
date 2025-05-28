import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export function Cadastro() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("medico");
  const [hospitais, setHospitais] = useState([]); // lista completa
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [crm, setCrm] = useState("");
  const [hospitalSelecionado, setHospitalSelecionado] = useState(""); // apenas o ID
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  useEffect(() => {
    async function carregarHospitais() {
      try {
        const snapshot = await getDocs(collection(db, "hospitais"));
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          nome: doc.data().nome,
        }));
        setHospitais(lista);
      } catch (error) {
        console.error("Erro ao carregar hospitais:", error);
      }
    }

    carregarHospitais();
  }, []);

  async function handleCadastro(e) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await axios.post("http://localhost:3001/api/auth/saveProfile", {
        uid: user.uid,
        nome,
        cpf,
        email,
        hospitalId: hospitalSelecionado,
        tipo,
        ...(tipo === "medico" && { crm }),
      });

      console.log("Usuário criado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar o cadastro", error);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Workflow" className="cadImg" />
        <span>Por favor digite suas informações de cadastro</span>
      </header>

      <form onSubmit={handleCadastro}>
        <div class="cadastro">
          <label htmlFor="tipo">Sou:</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="medico">Médico</option>
            <option value="paciente">Paciente</option>
          </select>
          <label htmlFor="hospital">     Hospital </label>
          <select
            id="hospital"
            value={hospitalSelecionado}
            onChange={(e) => setHospitalSelecionado(e.target.value)}
          >
            <option value="">-- Selecione um hospital --</option>
            {hospitais.map((hosp) => (
              <option key={hosp.id} value={hosp.id}>
                {hosp.nome}
              </option>
            ))}
          </select>

          <form>
            <br/>
            <div class="inputWrapper">
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" onChange={(e) => setNome(e.target.value)} />
            </div>

            <div class="inputWrapper">
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" onChange={(e) => setCpf(e.target.value)} />
            </div>

            {tipo === "medico" && (
              <div class="inputWrapper">
                <label htmlFor="crm">CRM</label>
                <input type="text" id="crm" onChange={(e) => setCrm(e.target.value)} />
              </div>
            )}

            <div class="inputWrapper">
              <label htmlFor="email">E-mail</label>
              <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div class="inputWrapper">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </form>
        </div>

        <button type="submit" className="button-add">
          Cadastrar <img src={arrowImg} alt="->" />
        </button>

        <div className="footer">
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}
