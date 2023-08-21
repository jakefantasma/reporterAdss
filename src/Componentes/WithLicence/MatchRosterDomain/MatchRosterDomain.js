import MatchList from "./MatchList/MatchList";
import "./MatchRosterDomain.css";
export default function MatchRosterDomain({ roster, listado }) {
  if (roster.length > 0 && listado.length > 0) {
    let unificado = listado.reduce((col, el) => {
      col.push(...el.info);
      return col;
    }, []);
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

    //console.log("filterByRoster");
    //console.log(filterByRoster);
    return (
      <div className="MatchRosterDomain">
        <div className="MathcTitle">
          <h2>MatchRosterDomain {filterByRoster.length} </h2>
        </div>
        <div className="MachListsContainer">
          <MatchList listado={sinOu} title={"Not ou match  "} />
          <MatchList listado={conOu} title={"Ou match"} />
        </div>
      </div>
    );
  }
}
