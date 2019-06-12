<template>
  <div class="modal_base" id="vista_cortes" style="display:none">
    <div class="card">
      <div class="card-header">
        <i class="fa fa-close close" @click="cerrar"></i>
        <label>Ticket Asignacion {{seleccion.id || 0}}</label>
      </div>
      <div class="card-body">
        <div class="row">
          <!-- Monedas-->
          <div class="col-sm-12">
            <label>Monedas</label>
          </div>
          <div class="col-sm-2">
            <label>50 Cent</label>
            <input type="number" class="form-control" v-model="monedas.centavos50">
          </div>
          <div class="col-sm-2">
            <label>1 peso</label>
            <input type="number" class="form-control" v-model="monedas.peso">
          </div>
          <div class="col-sm-2">
            <label>2 peso</label>
            <input type="number" class="form-control" v-model="monedas.dos">
          </div>
          <div class="col-sm-2">
            <label>5 peso</label>
            <input type="number" class="form-control" v-model="monedas.cinco">
          </div>
          <div class="col-sm-2">
            <label>10 peso</label>
            <input type="number" class="form-control" v-model="monedas.diez">
          </div>
          <div class="col-sm-2 bg-info">
            <label>Total</label>
            <input type="number" disabled class="form-control" v-model="monedas.total">
          </div>
          <!-- Billetes-->
          <div class="col-sm-12">
            <label>Billetes</label>
          </div>
          <div class="col-sm-2">
            <label>$20</label>
            <input type="number" class="form-control" v-model="billetes.veinte">
          </div>
          <div class="col-sm-2">
            <label>$50</label>
            <input type="number" class="form-control" v-model="billetes.cincuenta">
          </div>
          <div class="col-sm-2">
            <label>$100</label>
            <input type="number" class="form-control" v-model="billetes.cien">
          </div>
          <div class="col-sm-2">
            <label>$200</label>
            <input type="number" class="form-control" v-model="billetes.docientos">
          </div>
          <div class="col-sm-2">
            <label>$500</label>
            <input type="number" class="form-control" v-model="billetes.quinientos">
          </div>
          <div class="col-sm-2 bg-info">
            <label>Total</label>
            <input type="number" disabled class="form-control" v-model="billetes.total">
          </div>
          <!-- Otros-->
          <div class="col-sm-12">
            <label>Otros</label>
          </div>
          <div class="col-sm-2">
            <label>Bouchers</label>
            <input type="number" class="form-control" v-model="otros.vouchers">
          </div>
          <div class="col-sm-2">
            <label>Retiros</label>
            <input type="number" class="form-control" v-model="otros.retiros">
          </div>
          <div class="col-sm-2">
            <label>Total Otros</label>
            <input type="number" disabled class="form-control" v-model="otros.total">
          </div>
          <div class="col-sm-2">
            <label>Total Tickets</label>
            <input type="number" disabled class="form-control" v-model="seleccion.tickets.total">
          </div>
          <div class="col-sm-2">
            <label>Total</label>
            <input type="number" disabled class="form-control" v-model="otros.total">
          </div>
          <div class="col-sm-2 bg-info">
            <label>Total Corte</label>
            <input type="number" disabled class="form-control" v-model="otros.total">
          </div>
          <div class="col-sm-4 mt-1">
            <i class="btn btn-info fa fa-save btn-block">Guardar Corte</i>
          </div>
          <div class="col-sm-4 mt-1">
            <i class="btn btn-danger fa fa-save btn-block">Cancelar Corte</i>
          </div>
          <div class="col-sm-4 mt-1">
            <i class="btn btn-default fa fa-save btn-block">Cerrar</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VistaCorte",
  props: ["seleccion"],
  data() {
    return {
      monedas: {
        centavos50: 0,
        peso: 0,
        dos: 0,
        cinco: 0,
        diez: 0,
        total: 0
      },
      billetes: {
        veinte: 0,
        cincuenta: 0,
        cien: 0,
        docientos: 0,
        quinientos: 0,
        total: 0
      },
      otros: {
        vouchers: 0,
        retiros: 0,
        total: 0
      }
    };
  },
  methods: {
    cerrar() {
      document.querySelector("#vista_cortes").style.display = "none";
    }
  }
};
</script>

