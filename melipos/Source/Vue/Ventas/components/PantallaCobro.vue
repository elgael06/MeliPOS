
<template>
  <div class="modal_base" id="modal_cobro">
    <div class="card" style="max-width:680px;">
      <div class="card-header efecto bg-success text-white">
        <i class="fa fa-close close" @click="cerrar"></i>
        <label>Detalle De Cobro</label>
      </div>
      <div class="card-body">
        <div>
          <label class="p-3" style="max-width:135px;display:inline-block">
            Ticket :
            <span style="text-align:right">{{ticket.ticket}}</span>
          </label>
          <label class="p-3" style="max-width:170px;display:inline-block">
            Fecha :
            <span style="text-align:right">{{ticket.fecha}}</span>
          </label>
          <label class="p-3" style="max-width:233px;display:inline-block">
            Cliente :
            <span>{{ticket.cliente}}</span>
          </label>
        </div>
        <div class="row">
          <div class="col-sm-4" style="max-width:140px;display:inline-block">
            Tipo Pago :
            <select class="form-control" v-model="ticket.tipoPago">
              <option>Efectivo</option>
              <option>Tarjeta</option>
            </select>
          </div>
          <div class="col-sm-2" style="max-width:135px;display:inline-block">
            Productos :
            <i class="form-control" style="text-align:right">{{ticket.cantidad}}</i>
          </div>
          <div class="col-sm-2" style="max-width:135px;display:inline-block">
            Descuento :
            <i class="form-control" style="text-align:right">
              <Moneda v-bind:cantidad="ticket.descuento"/>
            </i>
          </div>
          <div class="col-sm-4" style="max-width:140px;display:inline-block">
            Total :
            <i class="form-control" style="text-align:right">
              <Moneda v-bind:cantidad="ticket.total"/>
            </i>
          </div>
          <div class="col-sm-3" style="max-width:140px;display:inline-block">
            $ Pago :
            <input
              type="number"
              class="form-control"
              v-model="ticket.totalPaga"
              style="text-align:right"
            >
          </div>
          <div class="col-sm-9" style="display:none">
            <i class="btn btn-primary mt-3" @click="AgregarPago(50)">
              <Moneda v-bind:cantidad="50"/>
            </i>
            <i class="btn btn-primary mt-3" @click="AgregarPago(100)">
              <Moneda v-bind:cantidad="100"/>
            </i>
            <i class="btn btn-primary mt-3" @click="AgregarPago(200)">
              <Moneda v-bind:cantidad="200"/>
            </i>
            <i class="btn btn-primary mt-3" @click="AgregarPago(500)">
              <Moneda v-bind:cantidad="500"/>
            </i>
            <i class="btn btn-primary mt-3" @click="AgregarPago(1000)">
              <Moneda v-bind:cantidad="1000"/>
            </i>
          </div>
          <div class="col-sm-3" style="max-width:130px;display:inline-block">
            <i class="btn btn-info fa fa-money mt-3 btn-block" @click="AgregarPago(ticket.total)"></i>
          </div>
          <div class="col-sm-9">
            <i class="btn btn-success fa fa-money mt-3 btn-block" @click="liquidar">Pagar</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moneda from "../../ComponentesGlobales/Moneda";

export default {
  name: "PantallaCobro",
  props: ["ticket", "guardarVenta"],
  components: { Moneda },
  data() {
    return {};
  },
  created() {},
  methods: {
    cerrar() {
      this.ticket.totalPaga = 0;
      document.querySelector("#modal_cobro").style.display = "none";
    },
    AgregarPago(cantidad) {
      this.ticket.totalPaga = cantidad;
    },
    liquidar() {
      if (this.ticket.totalPaga >= this.ticket.total) {
        this.guardarVenta();
      } else {
        alert("Aun No Cubre El Total A Pagar !!!");
      }
    }
  }
};
</script>


