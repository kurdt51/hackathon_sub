import { useState, useContext } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { AuthLoginContext } from '../../contexts/authLoginContext';
import './styles.css';

export function Hospital() {
  const { logout } = useContext(AuthLoginContext);
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'hospitais'), {
        nome,
        localizacao,
      });
      setNome('');
      setLocalizacao('');
      setErro('');
      alert('Hospital cadastrado com sucesso!');
    } catch (error) {
      setErro('Erro ao cadastrar hospital: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Novo Hospital</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="nome">Nome do Hospital</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="localizacao">Localização</label>
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
          />
        </div>
        {erro && <p className="erro">{erro}</p>}
        <button type="submit">Cadastrar Hospital</button>
      </form>
      <br/>
      <br/>
      <button onClick={logout}>Sair</button>
    </div>
    
  );
}
