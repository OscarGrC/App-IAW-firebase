import { useState } from "react";

export default function InscripcionForm() {
  const [form, setForm] = useState({
    nombre: "",
    clase: "",
    tipo: "alumno"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    alert("Inscripción enviada");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscripción</h2>

      <input
        name="nombre"
        placeholder="Nombre"
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
            value="empleado"
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
