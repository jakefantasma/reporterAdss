import MatchList from "../MatchList/MatchList";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./Filtrador.css";
import { useEffect, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function FiltradoController({ resumen }) {
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

  function Grafica({ show }) {
    useEffect(() => {}, [estado.show]);
    if (estado.titulo != "") {
      console.log("cargando ");
      Object.keys(show).map((el) => {
        const data = {
          labels: ["Enrolled", "Not Enrolled"],
          datasets: [
            {
              data: [10, 10],
              backgroundColor: ["green", "red"],
            },
          ],
        };

        return (
          <div className="contenedorgrafica">
            <h2>{"-"}</h2>
            <Pie data={data} />
          </div>
        );
      });
    }
  }

  //<Graficador listado={filtrados.filtrado} />
  return (
    <div className="filter">
      <Controller resumen={resumen} />
      <Grafica show={resumen} />
      <div className="infomation"></div>
    </div>
  );
}
