import CardMatch from "./CardMatch/CardMatch";
import "./MatchList.css";
export default function MatchList({ listado, title }) {
  return (
    <div className="MatchList">
      <h2>{title}</h2>
      {Object.keys(listado).map((index) => {
        return (
          <CardMatch registro={listado[index]} key={index} index={index} />
        );
      }, [])}
    </div>
  );
}
