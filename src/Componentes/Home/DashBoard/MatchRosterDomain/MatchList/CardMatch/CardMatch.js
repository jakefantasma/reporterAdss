import "./CardMatch.css";
export default function CardMatch({ registro, index }) {
  let estilo = "CardMatch";
  let nameOus = registro.ous.reduce((col, el) => {
    const regex = /\w+(\.\w+){1,2}/g;
    const name = el["OU Name"].match(regex);
    col.push(name);
    return col;
  }, []);
  if (index % 2 === 0) {
    estilo += " reslta";
  }
  return (
    <div className={estilo}>
      <div className="codigo">
        <p>{registro.codigo}</p>
      </div>
      <div className="name">
        <p>{registro.Nombre}</p>
      </div>
      <div>
        <p>{registro.Departamento}</p>
        <p>{registro.Rol}</p>
        <p>{registro.Pais}</p>
      </div>
      <p>{nameOus.join("/")}</p>
    </div>
  );
}
