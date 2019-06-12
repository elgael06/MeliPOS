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
        <Asignacion v-for="item in listaAsignacion" :asignacion="item" :key="item.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import Asignacion from "./Asignacion";

export default {
  components: {
    Asignacion
  },
  data() {
    return {
      fecha: "2019-01-01",
      estatus: "V",
      listaAsignacion: []
    };
  },
  created() {},
  methods: {
    eliminarLista() {
      this.listaAsignacion = [];
    },
    obtenerAsignacionPorFecha() {
      ///Ventas/Asignacion/api?fecha=2019-06-09
      
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