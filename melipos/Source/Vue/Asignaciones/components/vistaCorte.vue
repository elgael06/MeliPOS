<template>
  <div class="modal_base" id="vista_cortes" style="display:none">
    <div class="card">
      <div class="card-header">
        <i class="fa fa-close close" @click="cerrar"></i>
        <label>Asignacion {{seleccion.id || 0}}</label>
      </div>
      <div class="card-body" style="overflow:auto;max-height:500px">
        <!-- Monedas-->
        <EntradaMoneda :monedas="monedas" :tmonedas="tmonedas"/>
        <!-- Billetes-->
        <EntradaBilletes :billetes="billetes" :tbilletes="tbilletes"/>
        <!-- Otros-->
        <EntradaOtros
          :tcortes="tcortes"
          :diferencia="diferencia"
          :totros="totros"
          :otros="otros"
          :seleccion="seleccion"
        />
        <div class="row">
          <div class="col-sm-4 mt-3">
            <i class="btn btn-success fa fa-save btn-block" @click="guardar">Guardar Corte</i>
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
import Moneda from "../../ComponentesGlobales/Moneda";
import EntradaMoneda from "./EntradaMoneda";
import EntradaBilletes from "./EntradaBilletes";
import EntradaOtros from "./EntradaOtros";
export default {
  name: "VistaCorte",
  props: ["seleccion", "guardarCorte"],
  components: {
    Moneda,
    EntradaMoneda,
    EntradaBilletes,
    EntradaOtros
  },
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
    },
    guardar() {
      console.log("Guardar...");
      let datos = {
        folio: this.seleccion.id,
        efectivo: this.tmonedas + this.tbilletes,
        retiros: this.redondeo_cantidad(this.otros.retiros),
        vouchers: this.redondeo_cantidad(this.seleccion.tickets.vouchers),
        total: this.redondeo_cantidad(this.seleccion.tickets.total),
        total_corte: this.redondeo_cantidad(this.tcortes),
        diferencia: this.redondeo_cantidad(this.diferencia),
        fondo: this.seleccion.fondo_caja
      };
      console.log("datos", datos);
      this.guardarCorte(datos);
    },
    redondeo_cantidad(numero) {
      return Math.round(numero * 100) / 100;
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
      return this.seleccion.fondo_caja;
    },
    diferencia() {
      return this.tcortes - this.seleccion.tickets.total;
    },
    tcortes() {
      return (
        this.tmonedas +
        this.tbilletes +
        this.seleccion.tickets.vouchers +
        parseFloat(this.otros.retiros || 0) -
        this.seleccion.fondo_caja
      );
    }
  }
};
</script>

