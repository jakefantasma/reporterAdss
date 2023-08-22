import { useEffect, useState } from "react";
import MatchList from "./MatchList/MatchList";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./MatchRosterDomain.css";
import FiltradoController from "./Filtrador/Filtrador";
ChartJS.register(ArcElement, Tooltip, Legend);
export default function MatchRosterDomain({ roster, listado }) {
  let [filtrados, setfiltrados] = useState({
    master: [],
    conOu: [],
    sinOu: [],
    filtrado: [],
    asociatedOus: [],
  });
  useEffect(() => {
    validacion();
  }, [roster, listado]);

  function validacion() {
    if (roster.length > 0 && listado.length > 0) {
      let unificado = listado.reduce((col, el) => {
        col.push(...el.info);
        return col;
      }, []);
      //obtiene las ous asociadas
      let filterByRoster = roster[0].info.reduce((RosterCol, elRoster) => {
        let ous = unificado.reduce((col, el) => {
          if (elRoster.codigo == el.codigo) {
            col.push(el);
          }
          return col;
        }, []);
        elRoster.ous = ous;
        if (ous.length == 0) {
          elRoster.OuAssigned = false;
        } else {
          elRoster.OuAssigned = true;
        }
        RosterCol.push(elRoster);
        return RosterCol;
      }, []);
      let sinOu = filterByRoster.reduce((col, el) => {
        if (!el.OuAssigned) {
          col.push(el);
        }
        return col;
      }, []);
      let conOu = filterByRoster.reduce((col, el) => {
        if (el.OuAssigned) {
          col.push(el);
        }
        return col;
      }, []);
      setfiltrados({
        ...filtrados,
        master: roster[0].info,
        asociatedOus: filterByRoster,
        sinOu: sinOu,
        conOu: conOu,
        ver: sinOu,
      });
    }
  }

  if (roster.length > 0 && listado.length > 0) {
    return (
      <div className="MatchRosterDomain">
        <div className="MathcTitle">
          <h2>MatchRosterDomain {} </h2>
        </div>
        <div className="MachListsContainer">
          <MatchList listado={filtrados.sinOu} title={"Not ou match  "} />
          <MatchList listado={filtrados.conOu} title={"Ou match"} />
          <FiltradoController
            filtrados={filtrados}
            update={(valor) => {
              setfiltrados(valor);
            }}
          />
        </div>
      </div>
    );
  }
}
