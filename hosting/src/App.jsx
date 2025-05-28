//import "./css/global.css";
import { AuthEmailSenha } from "./contexts/AuthLoginContext";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
    return (

        <AuthEmailSenha>
            <AppRoutes />
        </AuthEmailSenha >
    );
};