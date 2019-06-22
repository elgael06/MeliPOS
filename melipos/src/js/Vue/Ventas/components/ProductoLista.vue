
<template>
  <tr>
    <td>{{index+1}}</td>
    <td>{{item.descripcion}}</td>
    <td>
      <Moneda v-bind:cantidad="item.costo"/>
    </td>
    <td>
      <input
        type="number"
        v-model="item.cantidad"
        @change="cambio"
        style="max-width:120px"
        class="form-control"
      >
    </td>
    <td>
      <input
        type="number"
        v-model="item.descuento"
        @change="cambio"
        style="max-width:100px"
        class="form-control"
      >
    </td>
    <td>
      <Moneda v-bind:cantidad="item.total"/>
    </td>
    <td>
      <i class="btn btn-danger fa fa-trash" @click="eliminar(index)"></i>
    </td>
  </tr>
</template>
<script>
import Moneda from "../../ComponentesGlobales/Moneda";

export default {
  name: "productoLista",
  props: ["item", "index", "indicadores", "eliminar"],
  components: {
    Moneda
  },
  methods: {
    cambio() {
      this.item.descuento < this.item.margen - 5 ||
        alert("El Descuento Sobrepasa La Cantidad Admitida !!!");

      this.item.cantidad =
        this.item.cantidad > 0 ? parseFloat(this.item.cantidad) : 1;
      this.item.descuento =
        this.item.margen - 2 > this.item.descuento && this.item.descuento > 0
          ? parseFloat(this.item.descuento) || 0
          : 0;

      this.item.total =
        parseFloat(this.item.costo) *
          this.item.cantidad *
          (1 - this.item.descuento / 100) || 0;
      this.indicadores();
    }
  }
};
</script>


