<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-sm-2">
          <label>ID Asignacion:</label>
          <span>{{asignacion.id}}</span>
        </div>
        <div class="col-sm-8">
          <label>Cajer@:</label>
          <i>{{asignacion.usuario}}</i>
        </div>
        <div class="col-sm-2">
          <i class="btn btn-default" :class="claseEstatus">{{estatus_}}</i>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-sm-6">
          <label>Asigno:</label>
          <i class="form-control">{{asignacion.usuario_creo}}</i>
        </div>
        <div class="col-sm-6">
          <label>Modifico:</label>
          <i class="form-control">{{asignacion.usuario_modifico}}</i>
        </div>
        <div class="col-sm-3 mt-1">
          <label>Fondo Caja:</label>
          <i class="form-control">{{asignacion.fondo_caja}}</i>
        </div>
        <div class="col-sm-3 mt-1">
          <label>Venta Caja:</label>
          <i class="form-control">{{asignacion.tickets.total}}</i>
        </div>
        <div class="col-sm-3">
          <i class="btn btn-info btn-block mt-4 fa fa-list" @click="evTicket">Tickets</i>
        </div>
        <div class="col-sm-3">
          <i class="btn btn-success btn-block mt-4 fa fa-money" @click="evCorte">Corte</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Asignacion",
  props: ["asignacion", "seleccionar"],
  methods: {
    evTicket() {
      console.log("tickets", this.asignacion);
      this.seleccionar(this.asignacion);
      document.querySelector("#vista_tickets").style.display = "flex";
    },
    evCorte() {
      console.log("Corte");
      this.seleccionar(this.asignacion);
    }
  },
  computed: {
    estatus_() {
      return this.asignacion.estatus == "V" ? "Vigente" : "Cancelado";
    },
    claseEstatus() {
      return this.asignacion.estatus == "V"
        ? "btn btn-primary  disabled"
        : "btn btn-warning disabled";
    }
  }
};
</script>

