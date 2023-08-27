import "./FileCsv.css";
export default function FileCsv({NameFile, Time}) {
  return (
    <div className="FileCsv">
      <p>{NameFile}</p>
      <p>{Time}</p>
    </div>
  );
}
