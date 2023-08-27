import MatchList from "../MatchList/MatchList";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./Filtrador.css";
import { useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function FiltradoController({ filtrados, update }) {
  useEffect(() => {}, [filtrados]);
  function Controller({ listado }) {
    let departamentos = listado.reduce((col, el) => {
      if (!col.includes(el["Departamento"])) {
        col.push(el["Departamento"]);
      }
      return col;
    }, []);
    //generamos los filtros para contar los departamentos
    return (
      <select
        onChange={(ev) => {
          let newList = filtrados.sinOu.reduce((col, el) => {
            if (el["Departamento"] == ev.target.value) {
              col.push(el);
            }
            return col;
          }, []);
          //console.log("newList");
          //console.log(newList);
          update({ ...filtrados, filtrado: newList });
        }}
      >
        <option value={"todos"}>todos </option>
        {Object.keys(departamentos).map((value, index) => {
          let el = departamentos[index];
          return <option value={el}>{el} </option>;
        })}
      </select>
    );
  }
  function Grafica({ listado, titulo }) {
    if (listado.length > 0 && listado.length != filtrados.sinOu) {
      const refDepartamento = listado[0]["Departamento"];
      const refPais = listado[0]["Pais"];
      const allBySameCount = filtrados.master.reduce((col, el) => {
        if (el.Departamento == refDepartamento && el.Pais == refPais) {
          col.push(el);
        }
        return col;
      }, []);
      //console.log(allBySameCount);
      let totales = allBySameCount.length - listado.length;
      const data = {
        labels: ["Enrolled", "Not Enrolled"],
        datasets: [
          {
            data: [totales, listado.length],
            backgroundColor: ["green", "red"],
          },
        ],
      };

      return (
        <div className="contenedorgrafica">
          <h2>{refDepartamento + "-" + titulo}</h2>
          <Pie data={data} />
          <div className="listadoFiltrado">
            <MatchList
              listado={listado}
              title={
                "All:" +
                allBySameCount.length +
                " Enrolled:" +
                (allBySameCount.length - listado.length) +
                " Not Enrolled:" +
                listado.length
              }
            />
          </div>
        </div>
      );
    }
  }
  function Graficador({ listado }) {
    let paises = listado.reduce(
      (col, el) => {
        col[el.Pais.toUpperCase()].push(el);
        return col;
      },
      {
        ARG: [],
        BLZ: [],
        COL: [],
        SLV: [],
        US: [],
        PH: [],
        GT: [],
        NIC: [],
        SPS: [],
        TGU: [],
        VNZ: [],
      }
    );
    return (
      <div className="registros">
        {Object.keys(paises).map((pais, index) => {
          return <Grafica listado={paises[pais]} titulo={pais} />;
        })}
      </div>
    );
  }
  return (
    <div className="filter">
      <Controller listado={filtrados.sinOu} />
      <div className="infomation">
        <Graficador listado={filtrados.filtrado} />
      </div>
    </div>
  );
}
