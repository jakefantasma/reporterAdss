import React, { useEffect, useState } from "react";
import * as xlsx from "xlsx";
import PanelFilter from "../PanelFilter/PanelFilter";
import FileCsv from "./FileCsv/FileCsv";
import "./WithLicence.css";
export default function WithLicence() {
  const [fileList, setFileList] = useState([]);
  const [listado, setlistado] = useState([]);

  useEffect(() => {
    if (fileList.length > 0) {
    }
  }, [fileList]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const fileListArray = Array.from(files);
    const tmpList = [];

    await Promise.all(
      fileListArray.map(async (el) => {
        if (el) {
          const reader = new FileReader();

          const readerPromise = new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
          });

          reader.readAsBinaryString(el);
          const fileContent = await readerPromise;

          const workbook = await xlsx.read(fileContent, { type: "binary" });
          const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
          const sheet = workbook.Sheets[sheetName];
          const jsonData = await xlsx.utils.sheet_to_json(sheet);
          tmpList.push({ name: el.name, info: jsonData });
        }
      })
    );
    //console.log(tmpList);
    setFileList(fileListArray);
    setlistado(tmpList);
  };

  return (
    <div className="WithLicence">
      <h3>WithLicence</h3>
      <input type="file" multiple onChange={handleFileChange} />
      {fileList.map((el, key) => {
        let time = new Date(el.lastModifiedDate);
        // Extraer los componentes de la fecha y la hora
        const year = time.getFullYear();
        const month = time.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        const day = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const fecha = day + "/" + month + "/" + year;
        const hora = hours + ":" + minutes;
        let list = [];
        if (el != undefined) {
          //console.log(listado);
          list = listado.reduce((col, registros) => {
            if (el.name == registros.name) {
              col.push(registros);
            }
            return col;
          }, []);
          return (
            <div key={key}>
              <FileCsv NameFile={el.name} Time={hora} />
              <PanelFilter listado={list[0].info} />
            </div>
          );
        } else {
          return <div></div>;
        }
      })}
    </div>
  );
}
