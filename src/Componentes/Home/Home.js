import React, { useEffect, useState } from "react";
import * as xlsx from "xlsx";
import "./Home.css";
import DashBoard from "./DashBoard/DashBoard";
export default function Home() {
  const [estado, setestado] = useState({
    files: null, //ficheros abiertos
    workbooks: [], //xlsx reference by workbooks
    Adss: {
      byFile: [], //adds lista dividida por archivos
      unificado: [],
    },
    Roster: {
      byFile: [],
      unificado: [],
      byDepartmen: [],
    },
    Admanager: {
      byFile: [],
      unificado: [],
    },
    Cruce: {
      desabilitados: [],
    },
  });
  //-------------------------------ver cambios en el estado
  useEffect(() => {
    console.log("--------------");
    console.log(estado);
    console.log("--------------");
    return () => {};
  }, [estado]);
  //encargado del filtrado por typo
  useEffect(() => {
    //filtrado de la informacion
    if (estado.files != null) {
      const processWorkbooks = async () => {
        /**-----------------POR DEFECTO SE TOMA LA PRIMERA HOJA -------------------- */
        //admanager
        let admanager = await Promise.all(
          estado.workbooks.map(async (el) => {
            if (el.name.toUpperCase().includes("ADMANAGER")) {
              const workbook = el.workbook;
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              return await xlsx.utils.sheet_to_json(sheet);
            }
          })
        );
        admanager = [].concat(...admanager).filter((el) => el !== undefined);
        admanager.forEach((el) => {
          //el.codigo = parseInt(el["SAM Account Name"].replace(/\w+\.\w{2}/, ""));
          let customCode = el["SAM Account Name"].match(/\d+/);
          if (customCode != null) {
            customCode = parseInt(customCode[0]);
          } else {
            customCode = 0;
          }
          el.codigo = customCode;
          let custom_dom = el["Email Address"].match(/@(.+)$/);
          if (custom_dom != null) {
            custom_dom = custom_dom[1];
          }
          el.dominio = custom_dom;
        });
        //adss
        let adss = await Promise.all(
          estado.workbooks.map(async (el) => {
            if (el.name.toUpperCase().includes("ADSS")) {
              const workbook = el.workbook;
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              return await xlsx.utils.sheet_to_json(sheet);
            }
          })
        );
        adss = [].concat(...adss).filter((el) => el !== undefined);
        adss.forEach((el) => {
          //el.codigo = parseInt(el["SAM Account Name"].replace(/\w+\.\w{2}/, ""));
          let customCode = el["SAM Account Name"].match(/\d+/);
          if (customCode != null) {
            customCode = parseInt(customCode[0]);
          } else {
            customCode = 0;
          }
          el.codigo = customCode;
          el.dominio = el["OU Name"].match(/\w+(\.\w+)?\.\w+/)[0];
          el.name = el["Display Name"].toUpperCase();
        });
        let roster = await Promise.all(
          estado.workbooks.map(async (el) => {
            if (el.name.toUpperCase().includes("ROSTER")) {
              const workbook = el.workbook;
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              return await xlsx.utils.sheet_to_json(sheet);
            }
          })
        );
        roster = [].concat(...roster).filter((el) => el !== undefined);
        let bydepartament = roster.reduce((col, el) => {
          if (col[el["Departamento"]] == undefined) {
            col[el["Departamento"]] = {};
          }
          if (col[el["Departamento"]][el["Pais"]] == undefined) {
            col[el["Departamento"]][el["Pais"]] = [];
          }
          let encontrado = admanager.reduce((col_ad, el_ad) => {
            //es necesaria una excepcion para mapfre
            if (el_ad.codigo == el.codigo) {
              el_ad.Departamento = el_ad.Department.toUpperCase();
              col_ad.push(el_ad);
            }
            return col_ad;
          }, []);
          el.dominios = encontrado.reduce(
            (co_encontr, el_encontr) => {
              let blacklist = ["-"];
              if (
                !el_encontr["OU Name"].includes("Disabled") 
                //&& !blacklist.includes(el_encontr["Email Address"])
              ) {
                //tiene usuario dentro de un dominio

                //console.log(el_encontr["OU Name"]);
                let findByadss = adss.reduce((col_ads, el_ads) => {
                  if (el_ads.codigo == el_encontr.codigo) {
                    col_ads.push(el_ads);
                  }
                  return col_ads;
                }, []);

                if (findByadss.length > 0) {
                  co_encontr.find = findByadss[0];
                } else {
                  co_encontr.find = {
                    "Enroll Status": "Not Enrolled",
                    dominio: el_encontr.dominio,
                    "SAM Account Name": el_encontr["SAM Account Name"],
                  };
                }
              } else {
                co_encontr.desable = true;
              }
              return co_encontr;
            },
            { find: {}, desable: false }
          );

          if (el.dominios.desable == true) {
            el.dominios.status = "desable";
          } else if (
            el.dominios.desable == false &&
            Object.keys(el.dominios.find).length == 0
          ) {
            el.dominios.status = "roster";
          } else if (
            el.dominios.desable == false &&
            el.dominios.find.dominio != null
          ) {
            el.dominios.status = "enable";
          } else if (el.dominios.desable == false) {
            el.dominios.status = "enable";
          }

          if (el.dominios.status != "desable") {
            col[el["Departamento"]][el["Pais"]].push(el);
          }

          //need correccion validar posibles slidas
          if (false) {
          }
          //verificamos su estatus en admanager
          return col;
        }, {});
        bydepartament = Object.keys(bydepartament).reduce(
          (col, departamento) => {
            let byPaises = bydepartament[departamento];
            byPaises = Object.keys(byPaises).reduce((col, pais) => {
              let listado = byPaises[pais];
              let filtro = listado.reduce(
                (a, b) => {
                  if (b.dominios != undefined) {
                    if (b.dominios.status == "roster") {
                      a.notNeedEnrolled.push(b);
                    } else if (b.dominios.status == "enable") {
                      if (b.dominios.find["Enroll Status"] == "Enrolled") {
                        a.enrolled.push(b);
                      } else {
                        a.notEnrolled.push(b);
                      }
                    }
                  }
                  return a;
                },
                { enrolled: [], notEnrolled: [], notNeedEnrolled: [] }
              );
              let resumen = {
                total: listado.length - filtro.notNeedEnrolled.length,
                Enrolled: filtro.enrolled.length,
                NotEnrolled: filtro.notEnrolled.length,
                notNeedEnrolled: filtro.notNeedEnrolled.length,
              };
              col[pais] = {
                listado: filtro,
                resumen: resumen,
              };
              return col;
            }, {});
            col[departamento] = byPaises;
            return col;
          },
          {}
        );
        console.log("bydepartament");
        console.log(bydepartament);
        /**------------------------------------- */
        setestado({
          ...estado,
          Adss: {
            byFile: adss.filter((el) => el !== undefined),
            unificado: adss,
          },
          Roster: {
            byFile: roster.filter((el) => el !== undefined),
            unificado: roster,
            byDepartmen: bydepartament,
          },
          Admanager: {
            byFile: admanager.filter((el) => el !== undefined),
            unificado: admanager,
          },
          Cruce: {
            desabilitados: [],
          },
        });
      };
      processWorkbooks();
    }
  }, [estado.workbooks]);
  //carga de ficheros
  //set files, workbooks
  const handleFileChange = async (event) => {
    //alert("solo se tomara en cuenta la informacion de la primera hoja !")
    const files = event.target.files;
    const fileListArray = Array.from(files);
    let tmpbooks = [];
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
          //leemos y guardamos la referencia al woorkbook
          tmpbooks.push({ name: el.name, workbook: workbook });
        }
      })
    );
    setestado({ ...estado, workbooks: tmpbooks, files: fileListArray }); //ref list de archivos
  };
  return (
    <div className="HomeUpdate">
      <div className="Titulo">
        <h1>custom DashBoard</h1>
      </div>
      <div className="fileSelectorContainer">
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <DashBoard estado={estado} />
    </div>
  );
}
