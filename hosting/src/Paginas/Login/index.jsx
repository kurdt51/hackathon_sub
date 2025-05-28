import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import "./style.css";
import { AuthLoginContext } from "../../contexts/AuthLoginContext";

export const Login = () => {
  const {
    handleSignIn,
    signed,
    loading,
    error,
    email,
    setEmail,
    password,
    setPassword,
    tipo,
    isAdmin,
    resetPassword,
  } = useContext(AuthLoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      if (isAdmin) {
        navigate("/hospital");
      } else if (tipo === "medico") {
        navigate("/acesso_medico");
      } else if (tipo === "paciente") {
        navigate("/acesso_paciente");
      }
    }
  }, [signed, tipo, navigate, isAdmin]);



  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Workflow" className="logoImg-login" />
        <span>Por favor digite suas informações de login</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="exemplo@healthtrack.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>Erro: {error.message}</p>}

        <button type="button" className="link-login-button" onClick={resetPassword}>Esqueceu sua senha?</button>
        <br/>
        <button type="button" className="button-login" onClick={handleSignIn}>Entrar <img src={arrowImg} alt="->" /></button>

        <div className="footer">
          <p>Você não tem uma conta?</p>
          <Link to="/cadastro">Nova conta</Link>
        </div>
      </form>
    </div>
  );
};