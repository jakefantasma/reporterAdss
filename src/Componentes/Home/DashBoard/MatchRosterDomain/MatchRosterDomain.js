import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea, Pie, Doughnut  } from "react-chartjs-2";
import "./MatchRosterDomain.css";
import Exporter from "../Exporter/Exporter";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export default function MatchRosterDomain({ state }) {
  let resumen = state.Roster.byDepartmen;
  let [estado, setestado] = useState({
    resumen: resumen,
    show: null,
    departamento: "",
    pais: "",
  });
  useEffect(() => {
    console.log(estado);
  }, [estado]);

  function SelectController() {
    return (
      <select
        onChange={(ev) => {
          let selected = ev.target.value;
          let valores = resumen[selected];
          setestado({
            ...estado,
            show: valores,
            departamento: selected,
            pais: "",
          });
        }}
        value={"asdasdasd"}
      >
        <option value={"todos"}>todos </option>
        {Object.keys(resumen).map((value, index) => {
          return <option value={value}>{value} </option>;
        })}
      </select>
    );
  }
  function Grafica({ resumen }) {
    //useEffect(() => {}, [estado.show]);
    console.log(resumen);
    const data = {
      labels: ["Enrolled", "Not Enrolled"],
      datasets: [
        {
          data: [resumen.Enrolled, resumen.NotEnrolled],
          backgroundColor: ["rgba(0, 255, 0, 0.43)", "rgba(255, 0, 0, 0.43)"],
        },
      ],
    };
    return (
      <div className="contenedorgrafica">
        <Doughnut data={data} />
      </div>
    );
  }
  function Resumen({ datalist }) {
    useEffect(() => {}, [datalist]);
    if (datalist != null) {
      return (
        <div className="ResumenContainer">
          <div className="departamento">
            <h2>{estado.departamento}</h2>
          </div>
          <Exporter state={state} />
          <div className="contenedorInfo">
            {Object.keys(estado.show).map((pais, index) => {
              let data = estado.show[pais];
              console.log("cargando listado ");
              console.log(data);
              return (
                <div className="resumen">
                  <div className="tituloresumen">
                    <h3>{pais}</h3>
                  </div>
                  <p>All: {data.resumen.total}</p>
                  <p>Enrolled: {data.resumen.Enrolled}</p>
                  <p>Not Enrolled:{data.resumen.NotEnrolled}</p>
                  <p>othros:{data.resumen.notNeedEnrolled}</p>
                  <Grafica resumen={data.resumen} />
                  <div className="listaContainer">
                    {Object.keys(data.listado.notEnrolled).map((v, i) => {
                      let valor = data.listado.notEnrolled[v];
                      console.log("valor");
                      console.log(valor);
                      return (
                        <div className="tarjeta">
                          <div className="codigoDo">
                            <p>{valor.dominios.find.dominio}</p>
                            <p>{valor.codigo}</p>
                          </div>
                          <p>{valor.Nombre}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="MatchRosterDomain">
      <SelectController />
      <Resumen datalist={estado.show} />
    </div>
  );
}
