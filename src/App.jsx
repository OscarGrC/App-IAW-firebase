import { useState } from "react";
import InscripcionForm from "./components/InscripcionForm";
import Login from "./components/login";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Torneo de Pádel IAW</h1>

      {!isAdmin ? (
        <>
          <InscripcionForm />
          <Login setIsAdmin={setIsAdmin} />
        </>
      ) : (
        <AdminPanel />
      )}
    </div>
  );
}

export default App;
