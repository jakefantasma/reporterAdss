import "./PanelFiltro.css";
export default function PanelFiltro({ listado, handlerUpdate }) {
  let headerNames = Object.keys(listado[0]);
  let filtros = headerNames.reduce((h_col, h_el) => {
    h_col[h_el] = listado.reduce((col, el) => {
      if (!col.includes(el[h_el])) {
        col.push(el[h_el]);
      }
      return col;
    }, []);
    return h_col;
  }, {});
  function CustomSelect({ name }) {
    return (
      <select name={name} className="selectPanel" onChange={(ev)=>{
        console.log(ev)
        console.log(ev.target.value)
      }}>
        {Object.keys(filtros[name]).map((e, index) => {
          let el = filtros[name][e];
          return <option key={index}>{el} </option>;
        })}
      </select>
    );
  }
  let omitir = ["codigo", "Nombre", "INGRESO"];
  return (
    <div className="PanelFiltro">
      <div className="PanelTitulo">
        <h3>filtros disponibles</h3>
      </div>
      <div className="PanelFiltros">
        {Object.keys(headerNames).map((e, index) => {
          let el = headerNames[e];
          if (!omitir.includes(el)) {
            return <CustomSelect name={el} key={index} />;
          }
        })}
      </div>
    </div>
  );
}
