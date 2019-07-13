import React, { useState } from "react";

const Editar = ({ usuario, evento, ObtenerUsuarios }) => {
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const cerrar = () => {
    document.querySelector("#modal-edicion").style.display = "none";
  };
  const guardar = () => {
    console.log("Guardar...");
    if (checarPassword) {
      evento(password, "password");
      enviar();
    }
  };
  const checarPassword = () => {
    return password === confirmar;
  };

  async function enviar() {
    try {
      const response = await fetch("/usuarios/api/", {
        method: "post",
        credentials: "same-origin",
        body: JSON.stringify({
          nombre: usuario.nombre,
          nombre_completo: usuario.nombre_completo,
          password: password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      await response.json().then(r => {
        ObtenerUsuarios();
      });
    } catch (err) {
      console.log("fetch failed", err);
    }
  }

  return (
    <div class="modal_base" id="modal-edicion">
      <div class="card" style={{ maxWidth: "650px" }}>
        <div class="card-header">
          <i class="fa fa-close close" onClick={cerrar} />
          <label>Editar</label>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-12">
              <label>Nombre</label>
              <input
                class="form-control"
                onChange={e => evento(e.target.value, "nombre_completo")}
                value={usuario.nombre_completo}
              />
            </div>
            <div class="col-sm-4">
              <label>Alias</label>
              <input
                class="form-control"
                onChange={e => evento(e.target.value, "nombre")}
                value={usuario.nombre}
              />
            </div>
            <div class="col-sm-4">
              <label>Password</label>
              <input
                class="form-control"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div class="col-sm-4">
              <label>Confirmar</label>
              <input
                class="form-control"
                type="password"
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <i class="btn btn-success  fa fa-save " onClick={guardar}>
            {" "}
            Guardar
          </i>
          <i class="btn btn-light  fa fa-close close" onClick={cerrar}>
            {" "}
            Cerrar
          </i>
        </div>
      </div>
    </div>
  );
};
export default Editar;
