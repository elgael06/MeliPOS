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
            <input type="number" disabled class="form-control" v-model="tmonedas">
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
            <input type="number" disabled class="form-control" v-model="tbilletes">
          </div>
          <!-- Otros-->
          <div class="col-sm-12">
            <label>Otros</label>
          </div>
          <div class="col-sm-2">
            <label>Bouchers</label>
            <input type="number" disabled class="form-control" v-model="seleccion.tickets.vouchers">
          </div>
          <div class="col-sm-2">
            <label>Retiros</label>
            <input type="number" class="form-control" v-model="otros.retiros">
          </div>
          <div class="col-sm-2">
            <label>Total Otros</label>
            <input type="number" disabled class="form-control" v-model="totros">
          </div>
          <div class="col-sm-2">
            <label>Total Tickets</label>
            <input type="number" disabled class="form-control" v-model="seleccion.tickets.total">
          </div>
          <div class="col-sm-2">
            <label>Total</label>
            <input type="number" disabled class="form-control" v-model="totros">
          </div>
          <div class="col-sm-2 bg-info">
            <label>Total Corte</label>
            <input type="number" disabled class="form-control" v-model="tcortes">
          </div>
          <div class="col-sm-4 mt-3">
            <i class="btn btn-success fa fa-save btn-block">Guardar Corte</i>
          </div>
          <div class="col-sm-4 mt-3">
            <i class="btn btn-warning fa fa-trash btn-block" @click="cancelar">Cancelar Corte</i>
          </div>
          <div class="col-sm-4 mt-3">
            <i class="btn btn-danger fa fa-close btn-block" @click="cerrar">Cerrar</i>
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
      console.log("Cerrar...");
      document.querySelector("#vista_cortes").style.display = "none";
      this.cancelar();
    },
    cancelar() {
      console.log("Cerrar...");
      this.monedas = {
        centavos50: 0,
        peso: 0,
        dos: 0,
        cinco: 0,
        diez: 0,
        total: 0
      };
      this.billetes = {
        veinte: 0,
        cincuenta: 0,
        cien: 0,
        docientos: 0,
        quinientos: 0,
        total: 0
      };
      this.otros = {
        vouchers: 0,
        retiros: 0,
        total: 0
      };
    },
    valorDinero(m, cant) {
      return parseFloat(m) > 0 ? parseFloat(m) * cant || 0 : 0;
    }
  },
  computed: {
    tmonedas() {
      let { centavos50, peso, dos, cinco, diez } = this.monedas;
      return (
        this.valorDinero(centavos50, 0.5) +
        this.valorDinero(peso, 1) +
        this.valorDinero(dos, 2) +
        this.valorDinero(cinco, 5) +
        this.valorDinero(diez, 10)
      );
    },
    tbilletes() {
      let { veinte, cincuenta, cien, docientos, quinientos } = this.billetes;
      return (
        this.valorDinero(veinte, 20) +
        this.valorDinero(cincuenta, 50) +
        this.valorDinero(cien, 100) +
        this.valorDinero(docientos, 200) +
        this.valorDinero(quinientos, 500)
      );
    },
    totros() {
      let { retiros } = this.otros;
      return parseFloat(retiros || 0) + this.seleccion.tickets.vouchers;
    },
    total() {
      let { retiros } = this.otros;
      return this.seleccion.tickets.total - parseFloat(retiros || 0);
    },
    tcortes() {
      return this.tmonedas + this.tbilletes + this.total;
    }
  }
};
</script>

