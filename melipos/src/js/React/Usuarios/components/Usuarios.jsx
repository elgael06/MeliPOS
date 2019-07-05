import React, { useState } from "react";

const Usuarios = ({ lista, seleccion }) => {
  return (
    <table class="table">
      <thead>
        <th class="bg-secondary text-white">ID</th>
        <th class="bg-secondary text-white">NOMBRE</th>
        <th class="bg-secondary text-white">NOMBRE COMPLETO</th>
        <th class="bg-secondary text-white">ACCION</th>
      </thead>
      <tbody>
        {lista.map(e => (
          <tr>
            <td>{e.id}</td>
            <td>{e.nombre}</td>
            <td>{e.nombre_completo}</td>
            <td>
              <i
                class="btn btn-secondary fa fa-edit"
                onClick={() => seleccion(e)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Usuarios;
