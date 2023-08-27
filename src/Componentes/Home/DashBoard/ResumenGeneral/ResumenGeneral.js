import "./ResumenGeneral.css";
export default function ResumenGeneral({ roster, admanager, adss }) {
  if (roster.length > 0 && admanager.length > 0 && adss.length > 0) {
    return (
      <div>
        <h1>Hola</h1>
      </div>
    );
  }
}
