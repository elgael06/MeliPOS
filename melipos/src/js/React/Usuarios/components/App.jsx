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

  const editarUsuario = sel => {
    console.log("seleccion=>", sel);
    setSeleccion({
      id: sel.id,
      nombre: sel.nombre,
      nombre_completo: sel.nombre_completo,
      password: sel.password,
      usuario_creo: sel.usuario_creo,
      usuario_modifico: sel.usuario_modifico
    });
    document.querySelector("#modal-edicion").style.display = "flex";
  };

  const evUsuario = (valor, parametro) => {
    let sel = {
      id: seleccion.id,
      nombre: seleccion.nombre,
      nombre_completo: seleccion.nombre_completo,
      password: seleccion.password,
      usuario_creo: seleccion.usuario_creo,
      usuario_modifico: seleccion.usuario_modifico
    };
    sel[parametro] = valor;
    setSeleccion(sel);
  };

  lista.length == 0 ? ObtenerUsuarios() : "";

  return (
    <div class="card">
      <div class="card-header">
        <h3>Usuarios</h3>
      </div>
      <div class="card-body">
        <Usuarios lista={lista} seleccion={editarUsuario} />
      </div>
      <Editar
        usuario={seleccion}
        evento={evUsuario}
        ObtenerUsuarios={ObtenerUsuarios}
      />
    </div>
  );
};

export default App;
