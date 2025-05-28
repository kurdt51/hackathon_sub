
import { app } from "../services/firebaseConfig";
import { db } from "../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { sendPasswordResetEmail } from "firebase/auth";


export const AuthLoginContext = createContext({});

export const AuthEmailSenha = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signInWithEmailAndPasswordFn, userCredential, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPasswordFn(email, password);
            const user = result.user;
            setUser(user);

            const idTokenResult = await user.getIdTokenResult();

            // Define isAdmin corretamente
            const isAdminClaim = idTokenResult.claims?.isAdmin === true;
            setIsAdmin(isAdminClaim);

            let userData = null;
            let tipoUsuario = null;

            for (const tipoColl of ["medicos", "pacientes"]) {
                const pesquisa = query(collection(db, tipoColl), where("email", "==", email));
                const snapshot = await getDocs(pesquisa);
                if (!snapshot.empty) {
                    userData = snapshot.docs[0].data();
                    tipoUsuario = tipoColl.slice(0, -1); // transforma "medicos" => "medico"
                    break;
                }
            }

            if (userData || isAdminClaim) {
                setTipo(tipoUsuario);
                sessionStorage.setItem("@AuthFirebase:tipo", tipoUsuario);
                sessionStorage.setItem("@AuthFirebase:isAdmin", isAdminClaim);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(userData || {}));
                sessionStorage.setItem("@AuthFirebase:token", idTokenResult.token);
            }
            else {
                console.error("Usuário não encontraro");
            }
        } catch (err) {
            console.error("Erro no login:", err);
        }
    };

    useEffect(() => {
        if (userCredential) {
            const user = userCredential.user;
            setUser(user);
            user.getIdToken().then((token) => {
                sessionStorage.setItem("@AuthFirebase:token", token);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
                console.log("Usuário logado com sucesso", user);
            });
        }
    }, [userCredential]);

    // Dentro do componente AuthEmailSenha:
    const resetPassword = async () => {
        if (!email) {
            alert("Por favor, preencha seu e-mail para que possa redefinir a senha.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Um e-mail de redefinição de senha foi enviado.");
        } catch (err) {
            console.error("Erro ao enviar e-mail de redefinição:", err);
            alert("Erro ao enviar e-mail de redefinição. Verifique se o e-mail está correto.");
        }
    };


    const logout = () => {
        signOut(auth)
            .then(() => {
                sessionStorage.clear();
                setTipo(null);
                setUser(null);
                setPassword(null);
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
            });
    };

    return (
        <AuthLoginContext.Provider
            value={{
                user,
                tipo,
                email,
                setEmail,
                password,
                setPassword,
                handleSignIn,
                logout,
                signed: !!user,
                loading,
                error,
                userCredential,
                isAdmin,
                resetPassword,
            }}>
            {children}

        </AuthLoginContext.Provider>
    );

}
