import React, { useState } from "react";

import Usuarios from "./Usuarios";
import Editar from "./Edicion";

let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
  $URL_MVC = "/Globales/",
  $URL_API = "";

const App = () => {
  const [lista, setLista] = useState([]);
  const [seleccion, setSeleccion] = useState({});
  const ObtenerUsuarios = () => {
    fetch(`${$URL_API}/usuarios/api/`, {
      method: "get",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => console.error("Error=>", err))
      .then(res =>
        res.json().then(respuesta => {
          setLista(respuesta.usuarios);
        })
      );
  };
  const editar = sel => {
    console.log("seleccion=>", sel);
    setSeleccion(sel);
    document.querySelector("#modal-edicion").style.display = "flex";
  };

  lista.length == 0 ? ObtenerUsuarios() : "";
  return (
    <div class="card">
      <div class="card-header">
        <h3>Usuarios</h3>
      </div>
      <div class="card-body">
        <Usuarios lista={lista} seleccion={editar} />
      </div>
      <Editar usuario={seleccion} />
    </div>
  );
};

export default App;
