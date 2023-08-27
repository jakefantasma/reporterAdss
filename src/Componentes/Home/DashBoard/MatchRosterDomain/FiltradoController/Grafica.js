export default function Grafica({ show }) {
  useEffect(() => {}, [estado.show]);
  if (estado.titulo != "") {
    console.log("cargando ");
    Object.keys(show).map((el) => {
      const data = {
        labels: ["Enrolled", "Not Enrolled"],
        datasets: [
          {
            data: [10, 10],
            backgroundColor: ["green", "brown"],
          },
        ],
      };
      return (
        <div className="contenedorgrafica">
          <h2>{"-"}</h2>
          <Pie data={data} />
        </div>
      );
    });
  }
}
