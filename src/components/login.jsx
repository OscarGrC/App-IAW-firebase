import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const auth = getAuth(); // Obtenemos la instancia de Firebase Auth

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Si llega aquí, login OK
      setIsAdmin(true);
      console.log("Usuario logueado:", userCredential.user);
    } catch (error) {
      console.error("Error login:", error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div>
      <h2>Acceso administración</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button onClick={login}>Entrar</button>
    </div>
  );
}
