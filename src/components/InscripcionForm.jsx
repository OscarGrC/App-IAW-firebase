import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase"; 


export default function InscripcionForm() {
  const [form, setForm] = useState({
    nombre: "",
    clase: "",
    tipo: "alumno"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "Torneo"), {
      nombre: form.nombre,
      clase: form.tipo === "Alumno" ? form.clase : "Empleado",
      tipo: form.tipo,
      fecha: Timestamp.now()
    });

    alert("Inscripción guardada en Firebase");

    setForm({
      nombre: "",
      clase: "",
      tipo: "alumno"
    });

  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Error al guardar la inscripción");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscripción</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      

      {form.tipo === "alumno" && (
        <input
          name="clase"
          placeholder="Clase"
          onChange={handleChange}
          required
        />
      )}

      <div>
        <label>
          <input
            type="radio"
            name="tipo"
            value="alumno"
            checked={form.tipo === "alumno"}
            onChange={handleChange}
          />
          Alumno
        </label>

        <label>
          <input
            type="radio"
            name="tipo"
            value="Empleado"
            checked={form.tipo === "empleado"}
            onChange={handleChange}
          />
          Empleado
        </label>
      </div>

      <button type="submit">Inscribirse</button>
    </form>
  );
}
