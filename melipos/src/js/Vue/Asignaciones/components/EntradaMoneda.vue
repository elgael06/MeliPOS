
<template>
  <div class="row">
    <div class="col-sm-12">
      <label>Monedas</label>
    </div>
    <div class="col-sm-2">
      <label>$50 Cent</label>
      <input type="number" class="form-control" v-model="monedas.centavos50">
    </div>
    <div class="col-sm-2">
      <label>$1 peso</label>
      <input type="number" class="form-control" v-model="monedas.peso">
    </div>
    <div class="col-sm-2">
      <label>$2 peso</label>
      <input type="number" class="form-control" v-model="monedas.dos">
    </div>
    <div class="col-sm-2">
      <label>$5 peso</label>
      <input type="number" class="form-control" v-model="monedas.cinco">
    </div>
    <div class="col-sm-2">
      <label>$10 peso</label>
      <input type="number" class="form-control" v-model="monedas.diez">
    </div>
    <div class="col-sm-2 bg-info">
      <label>Total</label>
      <i class="form-control">
        <Moneda :cantidad="tmonedas"/>
      </i>
    </div>
  </div>
</template>

<script>
import Moneda from "../../ComponentesGlobales/Moneda";
export default {
  name: "EntradaMoneda",
  props: ["monedas", "tmonedas"],
  components: {
    Moneda
  }
};
</script>


