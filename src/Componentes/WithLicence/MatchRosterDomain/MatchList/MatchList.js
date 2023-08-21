import CardMatch from "./CardMatch/CardMatch";
import "./MatchList.css";
export default function MatchList({ listado, title }) {
  return (
    <div className="MatchList">
      <div>
        <h2>{title + " " + listado.length} </h2>
      </div>

      {Object.keys(listado).map((index) => {
        return (
          <CardMatch registro={listado[index]} key={index} index={index} />
        );
      }, [])}
    </div>
  );
}
