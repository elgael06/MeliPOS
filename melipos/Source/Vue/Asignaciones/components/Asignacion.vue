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
          <i class="form-control">
            <Moneda :cantidad="asignacion.fondo_caja"/>
          </i>
        </div>
        <div class="col-sm-3 mt-1">
          <label>Venta Caja:</label>
          <i class="form-control">
            <Moneda :cantidad="asignacion.tickets.total"/>
          </i>
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
import Moneda from "../../ComponentesGlobales/Moneda";

export default {
  name: "Asignacion",
  props: ["asignacion", "seleccionar"],
  components: {
    Moneda
  },
  methods: {
    evTicket() {
      console.log("tickets", this.asignacion);
      this.seleccionar(this.asignacion);
      document.querySelector("#vista_tickets").style.display = "flex";
    },
    evCorte() {
      console.log("Corte", this.asignacion);
      if (this.asignacion.estatus == "V") {
        this.seleccionar(this.asignacion);
        document.querySelector("#vista_cortes").style.display = "flex";
      } else {
        this.obtenerCorte();
      }
    },
    obtenerCorte() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`/Ventas/Asignacion/api?folio=${this.asignacion.id}`, {
        method: "put",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(e => {
          document.querySelector("#modal_load").style.display = "none";
          alert("Error De Conexion !!");
        })
        .then(e => {
          e.json()
            .then(res => {
              document.querySelector("#modal_load").style.display = "none";
              if (res.folio > 0) {
                console.log("listo");
                this.imprimir(res);
              } else alert("Error al Consultar Corte O No Este Vigente..");
              document.querySelector("#vista_cortes").style.display = "none";
            })
            .catch(e => {
              document.querySelector("#modal_load").style.display = "none";
              alert("Error En Formato JSON !!!");
            });
        });
    },
    imprimir(res) {
      var printWin = window.open(
        "",
        "Ticket",
        "width=335,height=420,,top=50,left=200,toolbars=no,scrollbars=no,status=no,resizable=no"
      );

      let formato = `
		<div style="heigth:50px">
			<div>
				<span>
					<label>
						folio:
					</label> 
					${res.folio}
				</span>
				<span style="float:right">
					<label>
						Fecha:
					</label> 
					${res.fecha}
				</span>
			</div>
			<div style="margin-top:10px">
				<label>Asignacion</label>
				<span  style="float:right">${res.asignacion}</span>
			</div>
			<div>
				<label>Fecha </label>
				<span  style="float:right">${res.fecha_asignacion}</span>
			</div>
			<div>
				<label>Cajero</label>
				<span  style="float:right">${res.cajero}</span>
			</div>
			<div>
				<label>Fecha Corte</label>
				<span  style="float:right">${res.fecha_corte}</span>
			</div>
			<h4>Corte</h4>			
			<div>
				<label>Efectivo</label>
				<span  style="float:right">${this.redondeo_cantidad(res.efectivo)}</span>
			</div>
			<div>
				<label>Vouchers </label>
				<span  style="float:right">${this.redondeo_cantidad(res.vouchers)}</span>
			</div>
			<div>
				<label>Total Asignacion</label>
				<span  style="float:right">${this.redondeo_cantidad(
          res.total_asignacion
        )}</span>
			</div>
			<div>
				<label>Retiro</label>
				<span  style="float:right">${this.redondeo_cantidad(res.retiros)}</span>
			</div>
			<div>
				<label>Diferencia </label>
				<span  style="float:right">${this.redondeo_cantidad(res.diferencia)}</span>
			</div>
			<div>
				<label>Total Corte</label>
				<span  style="float:right">${this.redondeo_cantidad(res.total_corte)}</span>
			</div>
			<div style="margin-top:20px;text-align:center;heigth:70px">
				<label>${res.creo}</label>
				<hr />
				<label>Aplico Corte</label>
			</div>
        </div>
      `;

      printWin.window.document.body.innerHTML = formato;
      printWin.focus();
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
  computed: {
    estatus_() {
      return this.asignacion.estatus == "V" ? "Vigente" : "Finalizado";
    },
    claseEstatus() {
      return this.asignacion.estatus == "V"
        ? "btn btn-primary  disabled"
        : "btn btn-warning disabled";
    }
  }
};
</script>

