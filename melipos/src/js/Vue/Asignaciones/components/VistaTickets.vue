
<template>
  <div class="modal_base" id="vista_tickets" style="display:none">
    <div class="card">
      <div class="card-header">
        <i class="fa fa-close close" @click="cerrar"></i>
        <label>Ticket Asignacion {{seleccion.id || 0}}</label>
      </div>
      <div class="card-body">
        <p>Lista Tickets</p>
        <div style="overflow:auto;height:400px">
          <table class="table" v-if="lista">
            <thead>
              <tr class="bg-primary text-white">
                <th class="bg-primary text-white">ID</th>
                <th class="bg-primary text-white">fecha</th>
                <th class="bg-primary text-white">cantidad</th>
                <th class="bg-primary text-white">Descuento</th>
                <th class="bg-primary text-white">Tipo Pago</th>
                <th class="bg-primary text-white">Total</th>
                <th class="bg-primary text-white">Estatus</th>
                <th class="bg-primary text-white"></th>
              </tr>
            </thead>
            <tbody v-for="item in seleccion.tickets.lista" :key="item.ticket">
              <tr>
                <td>{{item.ticket}}</td>
                <td>{{item.fecha}}</td>
                <td>{{item.cantidad}}</td>
                <td>
                  <Moneda :cantidad="item.descuento"/>
                </td>
                <td>{{item.tipoPago}}</td>
                <td>
                  <Moneda :cantidad="item.total"/>
                </td>
                <td>{{item.estatus}}</td>
                <td>
                  <i class="btn btn-info fa fa-laptop" @click="imprimir(item.formato)">Vista</i>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 v-else>Sin Tickets !!!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moneda from "../../ComponentesGlobales/Moneda";

export default {
  name: "VistaTickets",
  props: ["seleccion"],
  components: {
    Moneda
  },
  methods: {
    cerrar() {
      document.querySelector("#vista_tickets").style.display = "none";
    },
    imprimir(formato) {
      var printWin = window.open(
        "",
        "Ticket",
        "width=335,height=420,,top=50,left=200,toolbars=no,scrollbars=no,status=no,resizable=no"
      );
      printWin.window.document.body.innerHTML = formato;
      printWin.focus();
    }
  },
  computed: {
    lista() {
      return this.seleccion.tickets.lista.length > 0;
    }
  }
};
</script>

