import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./FiltradoController.css";
import { useEffect, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function FiltradoController({ resumen, handler }) {
  let [estado, setestado] = useState({
    resumen: resumen,
    titulo: "",
    show: {},
  });
  console.log(resumen.listado);
  useEffect(() => {
    console.log(estado);
  }, [estado]);
  function Controller({ resumen }) {
    return (
      <select
        onChange={(ev) => {
          let selected = ev.target.value;
          let valores = resumen[selected];
          setestado({ ...estado, show: valores, titulo: selected });
        }}
      >
        <option value={"todos"}>todos </option>
        {Object.keys(resumen).map((value, index) => {
          return <option value={value}>{value} </option>;
        })}
      </select>
    );
  }
  //<Graficador listado={filtrados.filtrado} />
  return <Controller resumen={resumen} />;
}
