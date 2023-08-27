import MatchRosterDomain from "./MatchRosterDomain/MatchRosterDomain";
import "./DashBoard.css";
export default function DashBoard({ estado }) {
  //<ResumenGeneral resumen={estado.Roster.byDepartmen} />

  if (Object.keys(estado.Roster.byDepartmen).length > 0) {
    return (
      <div className="ContenedorMaster">
        <MatchRosterDomain state={estado}  />
      </div>
    );
  }
}
