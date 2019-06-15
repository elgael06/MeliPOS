
<template>
  <div class="row">
    <div class="col-sm-12">
      <label>Otros</label>
    </div>
    <div class="col-sm-2">
      <label>Vouchers</label>
      <i class="form-control">
        <Moneda :cantidad="seleccion.tickets.vouchers"/>
      </i>
    </div>
    <div class="col-sm-2">
      <label>Retiros</label>
      <input type="number" class="form-control" v-model="otros.retiros">
    </div>
    <div class="col-sm-2">
      <label>Fondo</label>
      <i class="form-control">
        <Moneda :cantidad="totros"/>
      </i>
    </div>
    <div class="col-sm-2">
      <label>Total Tickets</label>
      <i class="form-control">
        <Moneda :cantidad="seleccion.tickets.total"/>
      </i>
    </div>
    <div class="col-sm-2" :style="estadoDiferencias">
      <label>Diferencia</label>
      <i class="form-control">
        <Moneda :cantidad="diferencia"/>
      </i>
    </div>
    <div class="col-sm-2 bg-info">
      <label>Total Corte</label>
      <i class="form-control">
        <Moneda :cantidad="tcortes"/>
      </i>
    </div>
  </div>
</template>

<script>
import Moneda from "../../ComponentesGlobales/Moneda";
export default {
  name: "EntradaOtros",
  props: {
    tcortes: 0,
    diferencia: 0,
    totros: 0,
    otros: 0,
    seleccion: {}
  },
  components: {
    Moneda
  },
  computed: {
    estadoDiferencias() {
      let d = Math.round(this.diferencia * 100) / 100;
      return d > 0
        ? { background: "#F5F514", color: "#000" }
        : d < 0
        ? { background: "#F51414", color: "#000" }
        : { background: "#14F55F", color: "#FFF" };
    }
  }
};
</script>


