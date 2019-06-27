import React, { useState } from "react"; //Importamos react
import Moneda from "../../component/Moneda";
import VistaProductos from "./VistaProductos";

const TablaCompras = ({ lista, total }) => {
  const [orden, setOrden] = useState({});

  const evProductos = seleccion => {
    document.querySelector("#vista_productos").style.display = "flex";
    setOrden(seleccion);
    console.log("Seleccion => ", seleccion);
  };

  return (
    <div class="card-body">
      <label>
        Total : <Moneda cantidad={total || 0} />
      </label>
      <hr />
      <div
        class="row p-4"
        style={{
          maxHeight: "450px",
          border: "solid 1px #dcccc8",
          overflow: "auto"
        }}
      >
        {lista.length > 0 ? (
          lista.map(e => (
            <div class="col-sm-12 card mt-2">
              <div class="card-body">
                <div class="row">
                  <h5 class="col-sm-1">
                    ID : <label style={{ float: "right" }}>{e.id}</label>{" "}
                  </h5>
                  <label class="col-sm-5">Proveedor : {e.proveedor}</label>
                  <p class="col-sm-2">Fecha : {e.fecha}</p>
                  <p class="col-sm-2">Fecha : {e.fecha_modificacion}</p>
                  <span class="col-sm-2">
                    <i
                      class="btn btn-info fa fa-list btn-sm btn-block"
                      style={{ float: "right" }}
                      onClick={() => evProductos(e)}
                    >
                      Productos
                    </i>
                  </span>
                  <label class="col-sm-8">
                    {" "}
                    Descripcion: {e.Descripcion || "Sin Descripcion"}
                  </label>
                  <label class="col-sm-2">
                    Total : <Moneda cantidad={e.Total} />
                  </label>
                  <label class="col-sm-2">
                    {e.estatus == "V" ? "Vigente" : "Finalizado"}
                  </label>
                </div>
              </div>
            </div>
          ))
        ) : (
          <label>Sin Datos</label>
        )}
      </div>
      <VistaProductos seleccion={orden} />
    </div>
  );
};

export default TablaCompras;
