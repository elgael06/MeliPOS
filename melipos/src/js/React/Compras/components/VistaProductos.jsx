import React, { useState } from "react"; //Importamos react
import Moneda from "../../component/Moneda";

export default function VistaProductos({ seleccion }) {
  //funciones
  const cerrar = () =>
    (document.querySelector("#vista_productos").style.display = "none");

  return (
    <div class="modal_base" id="vista_productos">
      <div class="card">
        <div class="card-header">
          <i class="fa fa-close" style={{ float: "right" }} onClick={cerrar} />
          <label>Productos En Orden Folio : {seleccion.id}.</label>
        </div>
        <div class="card-body">
          <DetallesCompra orden={seleccion} />
          <ListaProductos productos={seleccion.Productos_lista || []} />
        </div>
        <div class="card-footer">
          <i
            class="btn btn-light fa fa-close btn-sm"
            style={{ float: "right" }}
            onClick={cerrar}
          >
            {" "}
            Cerrar
          </i>
        </div>
      </div>
    </div>
  );
}

const DetallesCompra = ({ orden }) => {
  return (
    <div class="row">
      <div class="col-sm-6 form-group-sm">
        <label>Descripcion</label>
        <i class="form-control">{orden.Descripcion || "Sin Des cripcion."}</i>
      </div>
      <div class="col-sm-4 form-group-sm">
        <label>Proveedor</label>
        <i class="form-control">{orden.proveedor}</i>
      </div>
      <div class="col-sm-2 form-group-sm">
        <label>Estatus</label>
        <i class="form-contro">
          {orden.estatus == "V"
            ? "Vigente"
            : orden.estatus == "F"
            ? "Finalizada"
            : "Cancelada"}
        </i>
      </div>
      <div class="col-sm-10 form-group-sm">
        <label>Creo</label>
        <i class="form-control">{orden.Creo || "NA"}</i>
      </div>
      <div class="col-sm-2 form-group-sm">
        <label>Fecha</label>
        <i class="form-control">{orden.fecha}</i>
      </div>
      <div class="col-sm-10 form-group-sm">
        <label>Modifico</label>
        <i class="form-control">{orden.Modifico || "NA"}</i>
      </div>
      <div class="col-sm-2 form-group-sm">
        <label>Fecha Modifico</label>
        <i class="form-control">{orden.fecha_modificacion}</i>
      </div>
    </div>
  );
};

const ListaProductos = ({ productos }) => {
  return (
    <div
      style={{
        maxHeight: "300px",
        border: "solid 1px #000d4a",
        overflow: "auto"
      }}
    >
      <table class="table table-condensed">
        <thead>
          <tr class="text-white">
            <th class="bg-secondary">ID</th>
            <th class="bg-secondary">DESCRIPCION</th>
            <th class="bg-secondary">COSTO</th>
            <th class="bg-secondary">MARGEN</th>
            <th class="bg-secondary">VENTA</th>
            <th class="bg-secondary">CANTIDAD</th>
            <th class="bg-secondary">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => {
            return (
              <tr>
                <td>{producto.id}</td>
                <td>{producto.descripcion}</td>
                <td>
                  <Moneda cantidad={producto.costo} />
                </td>
                <td>{producto.margen + "  %"}</td>
                <td>
                  <Moneda cantidad={producto.venta} />
                </td>
                <td>
                  <Moneda cantidad={producto.venta} />
                </td>
                <td>
                  <Moneda cantidad={producto.total} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
