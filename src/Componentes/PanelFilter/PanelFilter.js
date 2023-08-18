import React, { useEffect, useState } from "react";
import "./PanelFilter.css";
export default function PanelFilter({ listado }) {
  let [estado, setestado] = useState({
    listado: [],
    enrolled: [],
    Notrolled: [],
  });

  useEffect(() => {
    console.log("filtrando");

    


    let tmp_enrolled = estado.listado.reduce((col, el) => {
      if (el["Enrollment Status"] == "Enrolled") {
        col.push(el);
      }
      return col;
    }, []);

    let tmp_notenrolled = estado.listado.reduce((col, el) => {
      if (el["Enrollment Status"] != "Enrolled") {
        col.push(el);
      }
      return col;
    }, []);

    setestado({
      ...estado,
      enrolled: tmp_enrolled,
      Notrolled: tmp_notenrolled,
    });
  }, [estado.listado]);

  //valida y llena el estado de listado
  useEffect(() => {
    console.log("friom panel listado");
    console.log(listado);
    let filtrado = listado.reduce((col, el) => {
      let mod = el;
      let tmp = el["SAM Account Name"];
      tmp = tmp.replace(/\w+\.\w/, "");
      mod.codigo = tmp;
      col.push(mod);
      return col;
    }, []);
    //acomodamos la info en el orden
    setestado({ ...estado, listado: filtrado });
    //agregamos campo de codigo a los datos obtenidos
  }, []);

  return (
    <div className="PanelFilter">
      <div className="information">
        <p>All:{estado.listado.length}</p>
        <p>Enrolled:{estado.enrolled.length}</p>
        <p>Notenrolled:{estado.Notrolled.length}</p>
      </div>
      <div className="NotEnrolled"></div>
    </div>
  );
}
