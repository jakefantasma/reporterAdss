import React, { useEffect, useState } from "react";
import "./PanelFilter.css";
import Registro from "./Registro/Registro";
export default function PanelFilter({ listado }) {
  let [estado, setestado] = useState({
    listado: listado,
    enrolled: [],
    Notrolled: [],
    OuNames: [],
    OtherStatus: [],
  });
  useEffect(() => {
    //console.log("filtrando");
    let tmp_enrolled = estado.listado.reduce((col, el) => {
      if (el["Enroll Status"] == "Enrolled") {
        col.push(el);
      }
      return col;
    }, []);
    let tmp_notenrolled = estado.listado.reduce((col, el) => {
      if (el["Enroll Status"] != "Enrolled") {
        col.push(el);
      }
      return col;
    }, []);
    let tmp_ou = estado.listado.reduce((col, el) => {
      if (!col.includes(el["OU Name"])) {
        col.push(el["OU Name"]);
      }
      return col;
    }, []);
    setestado({
      ...estado,
      enrolled: tmp_enrolled,
      Notrolled: tmp_notenrolled,
      OuNames: tmp_ou,
      OtherStatus: tmp_notenrolled,
    });
  }, [estado.listado]);
  useEffect(() => {
  }, []);
  return (
    <div className="PanelFilter">
      <div className="information">
        <p>All:{estado.listado.length}</p>
        <p>Enrolled:{estado.enrolled.length}</p>
        <p>Notenrolled:{estado.Notrolled.length}</p>
      </div>
      <div className="OuName">
        {estado.OuNames.map((el, key) => {
          return (
            <p
              key={key}
              onClick={() => {
                alert("pendiente de agregar metodos ! ");
              }}
            >
              {el}
            </p>
          );
        })}
      </div>
      <div className="OtherStatus">
        <h3>OtherStatus</h3>
        {estado.OtherStatus.map((el, index) => {
          return <Registro key={index} registro={el} />;
        })}
      </div>
    </div>
  );
}
