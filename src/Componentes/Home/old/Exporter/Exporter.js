import "./Exporter.css";
import * as xlsx from "xlsx";
export default function Exporter({ roster, unificado }) {
  if (roster[0] != undefined) {
    roster = roster[0].info;
  }
  //general del roster
  unificado = unificado.reduce((col, el) => {
    col.push(...el.info);
    return col;
  }, []);
  unificado = unificado.reduce((col, el) => {
    el.codigo = parseInt(el.codigo);
    col.push(el);
    return col;
  }, []);
  function exportToExcel(resu) {
    let info = [
      {
        name: "unificado",
        data: unificado,
      },
      {
        name: "roster",
        data: roster,
      },
      {
        name: "resumen",
        data: resu,
      },
    ];

    //resumen por cuenta
    let workbook = xlsx.utils.book_new();
    Object.keys(info).map((key) => {
      const el = info[key];
      let worksheet = xlsx.utils.json_to_sheet(el.data);
      xlsx.utils.book_append_sheet(workbook, worksheet, el.name);
    });
    xlsx.writeFile(workbook, "result.xlsx");
  }

  return (
    <div
      className=""
      onClick={() => {
        let ByAccounts = roster.reduce((col, el) => {
          if (col[el.Departamento] == undefined) {
            col[el.Departamento] = [];
          }
          col[el.Departamento].push(el);
          return col;
        }, {});

        let ByContries = Object.keys(ByAccounts).reduce((col, el) => {
          let elemento = ByAccounts[el];
          console.log("elemento");
          let pais = elemento.reduce(
            (c, e) => {
              e.Nombre = e.Nombre.toUpperCase();
              c[e.Pais.toUpperCase()].push(e);
              //validamos si estan enrollados
              return c;
            },
            {
              ARG: [],
              BLZ: [],
              COL: [],
              SLV: [],
              US: [],
              PH: [],
              GT: [],
              NIC: [],
              SPS: [],
              TGU: [],
              VNZ: [],
            }
          );
          //col[elemento.Pais.toUpperCase()].push(el);
          col[el] = pais;
          return col;
        }, {});

        //validamos las listas con referencia al master rostar
        let resuemen = Object.keys(ByContries).reduce((col, departamento) => {
          let paises = ByContries[departamento];
          paises = Object.keys(paises).reduce((c, e) => {
            let pais = paises[e];
            if (pais.length > 0) {
              //c[e] = pais;
              let enrolled = pais.reduce((co_, el_) => {
                if (el_.status == true) {
                  co_.push(el_);
                }
                return co_;
              }, []);
              c.push({
                departamento: departamento,
                pais: e,
                total: pais.length,
                Enrolled: enrolled.length,
                "Not Enrolled": pais.length - enrolled.length,
              });
            }
            return c;
          }, []);
          col.push(...paises);
          return col;
        }, []);

        console.log(resuemen);

        //console.log(resuemen)
        exportToExcel(resuemen);
      }}
    >
      <h2>descargar estado </h2>
    </div>
  );
}
