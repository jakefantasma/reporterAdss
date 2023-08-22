import "./ResumenGeneral.css";

export default function ResumenGeneral({ roster, listado }) {
  if (roster != undefined && roster[0] != undefined) {
    let unificado = listado.reduce((col, el) => {
      col.push(...el.info);
      return col;
    }, []);

    let dataroster = roster[0].info;
    let filtradoByAccount = dataroster.reduce((col, el) => {
      if (col[el.Departamento] == undefined) {
        col[el.Departamento] = [];
      }
      let enrolled = unificado.reduce((col_en, el_en) => {
        if (el_en.codigo == el.codigo) {
          col_en.push(el_en);
        }
        return col_en;
      }, []);

      el.status = false;
      if (enrolled.length > 0) {
        el.status = true;
      }

      col[el.Departamento].push(el);
      return col;
    }, {});

    return (
      <div className="ContenedorResumen">
        {Object.keys(filtradoByAccount).map((valor, index) => {
          let Cuenta = filtradoByAccount[valor];
          let Enrolled = Cuenta.reduce((col_, el_) => {
            if (el_.status) {
              col_.push(el_);
            }
            return col_;
          }, []);

          let NotEnrolled = Cuenta.reduce((col_, el_) => {
            if (el_.status == false) {
              col_.push(el_);
            }
            return col_;
          }, []);

          return (
            <div className="porCuenta">
              <h3>{valor}</h3>
              <p>{"Enrolled " + Enrolled.length}</p>
              <p>{"Not Enrolled " + NotEnrolled.length}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
