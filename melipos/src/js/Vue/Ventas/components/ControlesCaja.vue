<template>
  <div class="card-header text-white" style="background:#62bbee">
    <div class="row">
      <div class="col-sm-2" style="max-width:140px;display:inline-block">
        <label>N. Ticket</label>
        <i class="form-control" style="text-align:right">{{datos.ticket}}</i>
      </div>
      <div class="col-sm-4" style="max-width:170px;display:inline-block">
        <label>Cliente</label>
        <i class="form-control">{{datos.cliente}}</i>
      </div>
      <div class="col-sm-2" style="max-width:140px;display:inline-block">
        <label>Cantidad</label>
        <i class="form-control" style="text-align:right">{{datos.cantidad}}</i>
      </div>
      <div class="col-sm-2" style="max-width:170px;display:inline-block">
        <label>$total</label>
        <i class="form-control" style="text-align:right">
          <Moneda v-bind:cantidad="datos.total"/>
        </i>
      </div>
      <div class="col-sm-2" style="max-width:140px;display:inline-block">
        <label>$Desc.</label>
        <i class="form-control" style="text-align:right">
          <Moneda v-bind:cantidad="datos.descuento"/>
        </i>
      </div>
      <div class="col-sm-3" style="max-width:170px;display:inline-block">
        <label>Fecha</label>
        <input
          type="text"
          class="form-control"
          style="text-align:right"
          v-model="datos.fecha"
          disabled
        >
      </div>
      <form
        class="col-sm-12"
        @submit.prevent="buscar_producto"
        style="max-width:405px;display:inline-block;float:left"
      >
        <label>Producto</label>
        <input
          type="text"
          id="entrada_producto"
          style="text-align:right"
          class="form-control"
          v-model="id_producto"
        >
      </form>
      <div
        class="col-sm-6 mt-3"
        style="margin:auto;max-width:405px;display:inline-block;float:right"
      >
        <label style="display:block">Acciones</label>
        <i class="btn btn-primary btn-sm fa fa-search" @click="seleccionar_producto">Producto</i>
        <i class="btn btn-success btn-sm fa fa-money" @click="pagar_cobro">Cobrar</i>
        <i class="btn btn-danger btn-sm fa fa-trash" @click="cancelar_cobro">Cancelar</i>
      </div>
    </div>
    <BuscarProductos
      v-bind:productos="busqueda_productos"
      v-bind:seleccion="producto_seleccionado"
    />
  </div>
</template>

<script>
import Moneda from "../../ComponentesGlobales/Moneda";
import BuscarProductos from "./BuscarProductos";

export default {
  name: "ControlesCaja",
  props: ["datos", "agregar_producto", "pagar", "cancelar"],
  components: {
    Moneda,
    BuscarProductos
  },
  data() {
    return {
      id_producto: "",
      busqueda_productos: []
    };
  },
  methods: {
    buscar_producto() {
      console.log("Buscar...");
      this.id_producto == "" || this.obtener_producto();
    },
    seleccionar_producto() {
      console.log("Seleccionar...");
      this.obtener_lista_productos();
    },
    producto_seleccionado(id) {
      this.id_producto = id;
      this.obtener_producto();
      document.querySelector("#Buscar_produtos").style.display = "none";
    },
    seleccinar_cliente() {
      console.log("Cliente...");
    },
    pagar_cobro() {
      console.log("Pagar...");
      this.pagar();
    },
    cancelar_cobro() {
      console.log("Cancelar Cobro...");
      confirm("Desea Cancelar El Ticket?") ? this.cancelar() : "";
    },
    obtener_lista_productos() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`/Productos/api/`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch()
        .then(e => {
          e.json().then(res => {
            this.id_producto = "";
            console.log(res);
            this.busqueda_productos = res.productos.map((e, i) => {
              this.Buscar_foto(e.id, i);
              return {
                id: e.id,
                descripcion: e.descripcion,
                src: ""
              };
            });
            document.querySelector("#modal_load").style.display = "none";

            document.querySelector("#Buscar_produtos").style.display = "flex";
          });
        });
    },
    obtener_producto() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`/Compras/productos/api?id=${this.id_producto}`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch()
        .then(e => {
          e.json().then(res => {
            this.id_producto = "";
            console.log(res);
            this.agregar_producto(res.producto);
            document.querySelector("#modal_load").style.display = "none";
          });
        });
    },
    Buscar_foto(id, index) {
      ///Productos/api/fotos?id=1
      fetch(`/Productos/api/fotos?id=${id}`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch()
        .then(e => {
          e.json().then(res => {
            this.busqueda_productos[index].src =
              res.fotos.length > 0
                ? res.fotos[0].foto
                : "data:image/jpeg;base64,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";
          });
        });
    }
  }
};
</script>



