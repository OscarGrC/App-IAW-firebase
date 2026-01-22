import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminPanel() {
  const [inscripciones, setInscripciones] = useState([]);
  const [total, setTotal] = useState(0);
  const [claseTop, setClaseTop] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Torneo"));
        const data = querySnapshot.docs.map(doc => doc.data());
        setInscripciones(data);
        setTotal(data.length);

        // Contar cuántos por clase
        const contadorClases = {};
        data.forEach(item => {
          if (item.tipo === "alumno") {
            contadorClases[item.clase] = (contadorClases[item.clase] || 0) + 1;
          }
        });

        // Clase con más inscritos
        let topClase = "";
        let max = 0;
        for (const clase in contadorClases) {
          if (contadorClases[clase] > max) {
            max = contadorClases[clase];
            topClase = clase;
          }
        }
        setClaseTop(topClase || "N/A");

      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Panel de Administración</h2>
      <p>Total inscritos: {total}</p>
      <p>Clase con más inscritos: {claseTop}</p>

      <h3>Listado de inscritos</h3>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Clase</th>
            <th>Tipo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripcion, index) => (
            <tr key={index}>
              <td>{inscripcion.nombre}</td>
              <td>{inscripcion.tipo === "alumno" ? inscripcion.clase : "Profesor"}</td>
              <td>{inscripcion.tipo}</td>
              <td>{inscripcion.fecha?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
