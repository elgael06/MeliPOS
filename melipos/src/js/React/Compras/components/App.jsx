import React, { useState } from "react"; //Importamos react

import Cavecera from "./Cavecera";
import TablaCompras from "./TablaCompras";

const App = () => {
  const [datos, setDatos] = useState([]);
  const [total, setTotal] = useState(0);

  const consulta = (inicio, fin) => {
    console.log("inicio : " + inicio + ", Fin : " + fin);
    console.log("Datos => ", datos);
    inicio == "" || fin == "" || pedirFecha(inicio, fin);
  };
  const cancelar = () => setDatos([]);
  const pedirFecha = (inicio, fin) => {
    document.querySelector("#modal_load").style.display = "flex";
    fetch(`monitor/api?inicio=${inicio}&fin=${fin}`, {
      method: "get",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(e => {
        document.querySelector("#modal_load").style.display = "none";
        alert("Error De Conexion !!");
      })
      .then(e => {
        e.json()
          .then(res => {
            console.log(res);

            res.ordenes.length == 0 || setDatos(res.ordenes);
            setTotal(res.Total);

            document.querySelector("#modal_load").style.display = "none";
          })
          .catch(e => {
            document.querySelector("#modal_load").style.display = "none";
            alert("Error En Formato JSON !!!");
          });
      });
  };
  const Consulta = () => {
    if (datos.length == 0) return <Cavecera consulta={consulta} />;
    else
      return (
        <div style={{ padding: "20px" }} class="card-header">
          <i
            class="fa fa-close btn btn-light"
            style={{ float: "right", padding: "10px" }}
            onClick={cancelar}
          >
            cancelar
          </i>
          <h3>Monitor Compras</h3>
        </div>
      );
  };
  return (
    <div class="card">
      {<Consulta />}
      <TablaCompras lista={datos} total={total} />
    </div>
  );
};

export default App;
