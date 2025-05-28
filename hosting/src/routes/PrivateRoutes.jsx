import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthLoginContext } from "../contexts/authLoginContext";

export const PrivateRoutes = () => {
  const { signed } = useContext(AuthLoginContext);
  return signed ? <Outlet /> : <Navigate to="/" />;
};