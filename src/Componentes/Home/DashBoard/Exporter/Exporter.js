import { useEffect } from "react";
import * as xlsx from "xlsx";

export default function Exporter({ state }) {
  useEffect(() => {
    console.log("roster");
    console.log(state);
  }, [state]);
  function exportToExcel() {
    let resumido = Object.keys(state.Roster.byDepartmen).reduce((col, depa) => {
      let departamento = state.Roster.byDepartmen[depa];
      let Bypais = Object.keys(departamento).reduce((col, el) => {
        let registros = departamento[el].resumen;
        registros.departamento = depa;
        registros.pais = el;
        col.push(registros);
        return col;
      }, []);
      col.push(...Bypais);
      return col;
    }, []);

    let info = [
      {
        name: "adss",
        data: state.Adss.unificado,
      },
      {
        name: "roster",
        data: state.Roster.unificado,
      },
      {
        name: "resumen",
        data: resumido,
      },
    ];

    //resumen por cuenta
    let workbook = xlsx.utils.book_new();
    console.log("info")
    console.log(info)
    Object.keys(info).map((key) => {
      const el = info[key];
      let worksheet;
      console.log("key");
      console.log(key);
      if (key == "resumen") {
        worksheet = xlsx.utils.json_to_sheet(el.data);
      } else {
        worksheet = xlsx.utils.json_to_sheet(el.data);
      }

      xlsx.utils.book_append_sheet(workbook, worksheet, el.name);
    });
    xlsx.writeFile(workbook, "result.xlsx");
  }

  return (
    <div
      className=""
      onClick={() => {
        exportToExcel();
      }}
    >
      <h2>Descargar </h2>
    </div>
  );
}
