import "./Roster.css";
import { useEffect, useState } from "react";
import Usuarios from "./Usuarios/Usuarios";
import PanelFiltro from "./PanelFiltro/PanelFiltro";
export default function Roster({ roster }) {
  let [estado, setestado] = useState({
    roster: [],
    totalida: [],
    filtrado: [],
    defa: [
      {
        info: [],
      },
    ],
  });
  function updateFiltrado(lista) {
    setestado({ ...estado, filtrado: lista });
  }

  //como primera carga del componente
  useEffect(() => {
    console.log("update");
    if (roster != undefined && roster.length >= 1) {
      setestado({
        ...estado,
        roster: roster,
        totalida: roster[0].info,
        filtrado: roster[0].info,
      });
    }
  }, [roster]);
  //console.log("!roster --------------------------");
  if (estado.filtrado.length > 0) {
    return (
      <div className="Roster">
        <div className="TituloRoster">
          <h1>Roster Information</h1>
        </div>
        <div className="ListadoUsers">
          <PanelFiltro
            listado={estado.totalida}
            handlerUpdate={updateFiltrado}
          />
          {Object.keys(roster[0].info).map((el, index) => {
            let elemento = roster[0].info[el];
            return <Usuarios registro={elemento} key={index} index={index} />;
          })}
        </div>
      </div>
    );
  }
}
