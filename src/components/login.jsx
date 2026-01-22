import { useState } from "react";

export default function Login({ setIsAdmin }) {
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "pepino") {
      setIsAdmin(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div>
      <h2>Acceso administración</h2>
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Entrar</button>
    </div>
  );
}
