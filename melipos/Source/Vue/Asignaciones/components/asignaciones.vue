<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-sm-12">
          <label>Asignacion</label>
        </div>
        <div class="col-sm-4">
          <label>Fecha</label>
          <input @change="eliminarLista" type="date" v-model="fecha" class="form-control">
        </div>
        <div class="col-sm-4">
          <label>Estatus</label>
          <select @change="eliminarLista" v-model="estatus" class="form-control">
            <option value="V">Vigente</option>
            <option value="F">Finalizado</option>
          </select>
        </div>
        <div class="col-sm-4 mt-4">
          <i
            class="btn btn-success btn-block fa fa-download"
            @click="obtenerAsignacionPorFecha"
          >Cargar</i>
        </div>
      </div>
    </div>
    <div class="card-body">
      <label>Liista Asignaciones</label>
      <div style="height:400px;overflow:auto">
        <Asignacion
          v-for="item in listaAsignacion"
          :asignacion="item"
          :seleccionar="seleccionar"
          :key="item.id"
        />
      </div>
    </div>
    <VistaTickets :seleccion="asignacion"/>
  </div>
</template>
<script>
import Asignacion from "./Asignacion";
import VistaTickets from "./VistaTickets";

export default {
  components: {
    Asignacion,
    VistaTickets
  },
  data() {
    return {
      fecha: "2019-06-01",
      estatus: "V",
      listaAsignacion: [],
      asignacion: {
        id: 0,
        id_usuario: 0,
        usuario: "",
        fondo_caja: 0,
        usuario_creo: "",
        usuario_modifico: "",
        estatus: "V",
        fecha: "",
        fecha_modificacion: "",
        tickets: {
          lista: [],
          total: 0
        }
      }
    };
  },
  created() {},
  methods: {
    seleccionar(seleccion) {
      this.asignacion = seleccion;
    },
    eliminarLista() {
      this.listaAsignacion = [];
    },
    obtenerAsignacionPorFecha() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(
        `/Ventas/Asignacion/api?fecha=${this.fecha}&estatus=${this.estatus}`,
        {
          method: "get",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .catch(e => alert("Error De Conexion !!"))
        .then(e => {
          e.json()
            .then(res => {
              document.querySelector("#modal_load").style.display = "none";
              this.listaAsignacion = res.lista;
            })
            .catch(e => alert("Error En Formato JSON !!!"));
        });
    }
  }
};
</script>