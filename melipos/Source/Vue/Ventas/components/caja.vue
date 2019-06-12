<template>
  <div class="card">
    <ControlesCaja
      v-bind:datos="cavecera_caja"
      v-bind:agregar_producto="agregar_producto"
      v-bind:pagar="pagar"
      v-bind:cancelar="cancelar"
    />
    <div class="card-body">
      <label>Lista Productos :</label>
      <div style="height:340px;overflow:auto;width:105%;margin-left:-2%">
        <table class="table table-condensed">
          <thead>
            <tr class="bg-info text-white">
              <th>#</th>
              <th>Descripcion</th>
              <th>Costo</th>
              <th>Cantidad</th>
              <th>Descuento</th>
              <th>Total</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <productoLista
              v-for="(item,index) in productos_lista"
              v-bind:indicadores="indicadores"
              v-bind:item="item"
              v-bind:index="index"
              v-bind:eliminar="eliminar"
              :key="item.folio +'_'+ index"
            />
          </tbody>
        </table>
      </div>
    </div>
    <PantallaCobro v-bind:ticket="cavecera_caja" v-bind:guardarVenta="guardarVenta"/>
  </div>
</template>
<script>
import ControlesCaja from "./ControlesCaja";
import PrductosCaja from "./ProductosCaja";
import productoLista from "./ProductoLista";
import PantallaCobro from "./PantallaCobro";

export default {
  name: "Caja",
  components: {
    ControlesCaja,
    PrductosCaja,
    productoLista,
    PantallaCobro
  },
  data() {
    return {
      cavecera_caja: {
        ticket: 0,
        id_cliente: 0,
        cliente: "",
        cantidad: 0,
        total: 0,
        tipoPago: "Efectivo",
        totalPaga: 0,
        descuento: 0,
        fecha: "2019-06-01"
      },
      productos_lista: []
    };
  },
  created() {
    console.log(" Caja...");
    this.ObtenerTicket();
  },
  updated() {
    this.indicadores();
  },
  methods: {
    agregar_producto(producto) {
      if (producto.id > 0) {
        let index = this.productos_lista.findIndex(e => e.folio == producto.id);
        if (index == -1) {
          this.productos_lista.push({
            folio: producto.id,
            descripcion: producto.descripcion,
            costo: producto.venta,
            cantidad: producto.cantidad,
            descuento: 0,
            total: producto.venta,
            margen: producto.margen
          });
        } else {
          this.productos_lista[index].cantidad += producto.cantidad;
          this.productos_lista[index].total +=
            producto.venta *
              (1 - this.productos_lista[index].descuento / 100) ||
            producto.venta;
        }
      } else alert("No Se Encuentra el producto !!!");
      this.indicadores();
    },
    eliminar(index) {
      if (confirm("Eliminar ?")) this.productos_lista.splice(index, 1);
    },
    indicadores() {
      this.cavecera_caja.cantidad = this.productos_lista.length;
      this.cavecera_caja.total = 0;
      this.productos_lista.map(e => {
        this.cavecera_caja.total += e.total;
        return e;
      });
      this.cavecera_caja.descuento = 0;
      this.productos_lista.map(e => {
        let total_neto = parseFloat(e.costo) * e.cantidad;
        let descuento = parseFloat(e.descuento / 100);

        this.cavecera_caja.descuento += total_neto * descuento;

        return e;
      });
    },
    pagar() {
      if (this.cavecera_caja.cantidad > 0)
        document.querySelector("#modal_cobro").style.display = "flex";
      else alert("Sin Proctos !!!");
    },
    cancelar() {
      this.productos_lista = [];
      this.cavecera_caja = {
        ticket: 0,
        id_cliente: 0,
        cliente: "",
        cantidad: 0,
        total: 0,
        descuento: 0,
        fecha: "2019-06-01"
      };
      this.ObtenerTicket();
    },
    ObtenerTicket() {
      fetch(`/Ventas/Ticket/api`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(e => alert("Error De Conexion !!"))
        .then(e => {
          e.json()
            .then(res => {
              this.id_producto = "";
              console.log(res);
              this.cavecera_caja = res;
            })
            .catch(e => alert("Error En Formato !!!"));
        });
    },
    guardarVenta() {
      let {
        ticket,
        cantidad,
        totalPaga,
        descuento,
        tipoPago,
        total
      } = this.cavecera_caja;
      document.querySelector("#modal_load").style.display = "flex";

      let disenioTicket = this.ImprimirTicket();

      fetch(`/Ventas/Ticket/api`, {
        method: "post",
        credentials: "same-origin",
        body: JSON.stringify({
          ticket: ticket,
          cantidad: cantidad,
          totalPaga: total,
          descuento: descuento,
          tipoPago: tipoPago,
          productos: this.productos_lista,
          disenioTicket: disenioTicket
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(e => alert("Error De Conexion !!"))
        .then(e => {
          e.json()
            .then(res => {
              document.querySelector("#modal_load").style.display = "none";
              if (res.respuesta) {
                document.querySelector("#modal_cobro").style.display = "none";
                this.cancelar();
              } else alert("Error Al Guardar PAgo...");
            })
            .catch(e => {
              document.querySelector("#modal_load").style.display = "none";
              alert("Error En Formato !!!");
            });
        });
    },
    ImprimirTicket() {
      let {
        ticket,
        cantidad,
        totalPaga,
        descuento,
        tipoPago,
        cliente,
        fecha,
        total
      } = this.cavecera_caja;
      let producto = this.productos_lista;

      var printWin = window.open(
        "",
        "Ticket",
        "width=335,height=420,,top=50,left=200,toolbars=no,scrollbars=no,status=no,resizable=no"
      );
      let cuerpo = ` <div style="width:320px">
          <label style="width:120px">Ticket : ${ticket} </label> 
          <label style="width:150px;float:right"> Fecha : ${fecha}</label> 
          <p>Cliente : ${cliente}</p>
          <label styles="float:right">Productos : ${cantidad}</label>`;

      cuerpo += `<table style="font-size:10px;min-height:90px">
                  <thead> 
                    <tr>
                      <th>#</th>
                      <th>Descripcion</th>
                      <th>Costo</th>
                      <th>Cantidad</th>
                      <th>Descuento</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>`;
      let cont = 0;
      for (let item of producto) {
        cont++;
        cuerpo += `
        <tr>
          <td>${cont}</td>
          <td>${item.descripcion}</td>
          <td style="text-align:right"> ${this.redondeo_cantidad(
            item.costo
          )}</td>
          <td style="text-align:right">${item.cantidad}</td>
          <td style="text-align:right">${item.descuento} %</td>
          <td style="text-align:right">$ ${this.redondeo_cantidad(
            item.total
          )}</td>
        </tr>
        `;
      }
      cuerpo += `
        <tr><th colspan="5">--------------></th>
        <th>
          <label style="width:150px;">Total : ${this.redondeo_cantidad(
            total
          )}</label>
        </th>
      </tr>
      </tbody></table>
      <hr />
      <div style="font-size:12px">
      <label>Descuento :  ${this.redondeo_cantidad(descuento)}</label>
      <label style="width:150px;">Pago Con : ${this.redondeo_cantidad(
        totalPaga
      )}</label>
      <label style="width:150px;">Cambio : ${this.redondeo_cantidad(
        totalPaga - total
      )}</label>
      </div> 
      <div style="margin-top:20px;font.size:12px;text-align:center">
        <label >Gracias Por Su Compra</label>
      </div>
      </div>`;
      printWin.window.document.body.innerHTML = cuerpo;
      printWin.focus();
      printWin.print();
      //printWin.close();
      return cuerpo;
    },
    Formato_moneda(numero_) {
      const decimal_con_cero = i => (i > 9 || i.search(0) > -1 ? i : i + "0");
      const mayora_a_mil = numero =>
        new Intl.NumberFormat("es-MX").format(numero);

      const numero_string = numero_.toString();
      const decimal =
        numero_string.split(".").length > 1
          ? decimal_con_cero(numero_string.split(".")[1])
          : "00";
      const unidades =
        numero_string.split(".").length > 0
          ? mayora_a_mil(numero_string.split(".")[0])
          : "0";

      return `$${unidades != "NaN" ? unidades : 0}.${decimal}`;
    },
    redondeo_cantidad(numero) {
      return this.Formato_moneda(Math.round(numero * 100) / 100);
    }
  },
  computed: {}
};
</script>



