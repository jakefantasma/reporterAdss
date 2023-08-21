import React, { useEffect, useState } from "react";
import "./Registro.css";
export default function PanelFilter({ registro }) {
 // console.log(registro);
  return (
    <div className="Registro">
      <p>{registro["Display Name"]}</p>
      <p>{registro["Enroll Status"]}</p>
    </div>
  );
}
