import PanelFilter from "./PanelFilter/PanelFilter";
import FileCsv from "./FileCsv/FileCsv";
import "./Ficheros.css";
import { useState } from "react";

export default function Ficheros({ fileList, listado, show }) {
  let [status, setstatus] = useState({
    estilo: "",
  });

  return (
    <div className="Ficheros">
      {fileList.map((el, key) => {
        let time = new Date(el.lastModifiedDate);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const fecha = day + "/" + month + "/" + year;
        const hora = hours + ":" + minutes;
        let list = [];
        if (el != undefined) {
          //todo add funcion to save reference
          //busca su listado de referencia
          list = listado.reduce((col, registros) => {
            if (el.name == registros.name) {
              col.push(registros);
            }
            return col;
          }, []);
          if (list.length > 0) {
            return (
              <div key={key} onClick={() => {}}>
                <FileCsv NameFile={el.name} Time={hora} />
                <PanelFilter listado={list[0].info} />
              </div>
            );
          }
        }
      })}
    </div>
  );
}
