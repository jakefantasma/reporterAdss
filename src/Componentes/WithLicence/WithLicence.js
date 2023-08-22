import React, { useEffect, useState } from "react";
import * as xlsx from "xlsx";
import Ficheros from "./Ficheros/Ficheros";
import Roster from "./Roster/Roster";
import MatchRosterDomain from "./MatchRosterDomain/MatchRosterDomain";
import ResumenGeneral from "./ResumenGeneral/ResumenGeneral";
import "./WithLicence.css";
export default function WithLicence() {
  const [fileList, setFileList] = useState([]);
  const [listado, setlistado] = useState([]);
  const [roster, setroster] = useState([]);
  useEffect(() => {
    if (fileList.length > 0) {
    }
  }, [fileList]);
  const handleFileChange = async (event) => {
    const files = event.target.files;
    const fileListArray = Array.from(files);
    const tmpList = [];
    const tmpRoster = [];
    await Promise.all(
      fileListArray.map(async (el) => {
        if (el) {
          const reader = new FileReader();
          const readerPromise = new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
          });
          reader.readAsBinaryString(el);
          //todo it need to save reference to file to future request to other books
          const fileContent = await readerPromise;
          const workbook = await xlsx.read(fileContent, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          let jsonData = await xlsx.utils.sheet_to_json(sheet);
          //console.log(el.name);
          if (!el.name.includes("Roster")) {
            console.log("dominio registro");
            jsonData = jsonData.reduce((col, el) => {
              let mod = el;
              let tmp = el["SAM Account Name"];
              tmp = tmp.replace(/\w+\.\w/, "");
              mod.codigo = tmp;
              col.push(mod);
              return col;
            }, []);
            tmpList.push({ name: el.name, info: jsonData });
          } else if (el.name.includes("Roster")) {
            //filtramos la info del resoter pare eliminar las abreviaturas del final
            let rosterfiltrado = jsonData.reduce((col, el) => {
              el.codigo = el.codigo + "";
              el.codigo = parseInt(el.codigo);
              if (el.codigo > 0) {
                col.push(el);
              }
              return col;
            }, []);
            tmpRoster.push({ name: el.name, info: rosterfiltrado });
          }
        }
      })
    );
    setFileList(fileListArray); //ref list de archivos
    setlistado(tmpList); // ref mod list usercode added
    setroster(tmpRoster); // ref filter roster list
    //todo ser remuev roster por tiempos de carga
  };
  return (
    <div className="WithLicence">
      <h3>WithLicence</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <Ficheros fileList={fileList} listado={listado} />
      <ResumenGeneral roster={roster} listado={listado} />
      <div className="juntos">
        <MatchRosterDomain roster={roster} listado={listado} />
      </div>
    </div>
  );
}
