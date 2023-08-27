import { useState } from "react";
import "./Usuarios.css";
export default function Usuarios({ registro, index }) {
  let tmp_stilo = "Usuarios";
  if (index % 2 === 0) {
    tmp_stilo = tmp_stilo + " ResaltarPar";
  }
  let [estilo, setestilo] = useState(tmp_stilo);
  function handlerColor() {
    setestilo("Usuarios ResaltarRojo");
  }
  return (
    <div className={estilo} onClick={handlerColor}>
      <div className="lista">
        <p>{registro.codigo + " " + registro.Rol + " " + registro.Genero}</p>
        <p>{registro.Nombre}</p>
      </div>
      <div className="lista">
        <p>{registro.Departamento}</p>
        <p>{registro.Puesto}</p>
        <p>{registro.Cuenta}</p>
      </div>
      <div className="lista">
        <p>{registro.Pais + " - " + registro.Direccion}</p>
        <p>{registro.Site}</p>
      </div>
    </div>
  );
}
