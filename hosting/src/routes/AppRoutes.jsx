import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "../routes/PrivateRoutes";
import { Acesso_medico } from "../Paginas/Acesso_medico";
import { Acesso_paciente } from "../Paginas/Acesso_paciente";
import { Cadastro } from "../Paginas/Cadastro";
import { Hospital } from "../Paginas/Hospital";
import { Login } from "../Paginas/Login";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route element={<PrivateRoutes />} >
          <Route path="/acesso_medico" element={<Acesso_medico />} />
        </Route>
        <Route element={<PrivateRoutes />} >
          <Route path="/acesso_paciente" element={<Acesso_paciente />} />
        </Route>
        <Route element={<PrivateRoutes />} >
          <Route path="/Hospital" element={<Hospital />} />
        </Route>
        </Routes>
    </BrowserRouter>
  );
}