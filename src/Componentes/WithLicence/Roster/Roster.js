import "./Roster.css";
import Usuarios from "./Usuarios/Usuarios";
export default function Roster({ roster}) {
  //    "tomar en cuenta que la lista de roster debe de ser la priemra hoja para funcionar !"
  if (roster.length > 0) {
    //console.log("cargando roster !")
    console.log("!roster");
    return (
      <div className="Roster">
        <div className="TituloRoster">
          <h1>Roster Information</h1>
        </div>
        <div className="ListadoUsers">
          {Object.keys(roster[0].info).map((el, index) => {
            let elemento = roster[0].info[el];
            return <Usuarios registro={elemento} key={index} index={index} />;
          })}
        </div>
      </div>
    );
  }
}
