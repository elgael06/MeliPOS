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
        <div class="col-sm-2 mt-4">
          <i
            class="btn btn-success btn-block fa fa-download"
            @click="obtenerAsignacionPorFecha"
          >Consultar</i>
        </div>
        <div class="col-sm-2 mt-4">
          <i class="btn btn-primary btn-block fa fa-book" @click="CrearAsignacion">Nueva</i>
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
    <VistaCorte :seleccion="asignacion" :guardarCorte="guardarCorte"/>
    <AltaAsignacion :obtenerAsignacionPorFecha="obtenerAsignacionPorFecha"/>
  </div>
</template>
<script>
import Asignacion from "./Asignacion";
import VistaTickets from "./VistaTickets";
import VistaCorte from "./vistaCorte";
import AltaAsignacion from "./AltaAsignacion";

export default {
  components: {
    Asignacion,
    VistaTickets,
    VistaCorte,
    AltaAsignacion
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
    CrearAsignacion() {
      console.log("Nueva Asignacion...");
      document.querySelector("#vista_asignacion").style.display = "flex";
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
    },
    guardarCorte(datos) {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`/Ventas/Asignacion/api`, {
        method: "post",
        body: JSON.stringify(datos),
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
              if (res.estatus > 0) {
                alert(`Corte #${res.estatus} \n Guardado....`);
                this.obtenerAsignacionPorFecha();
              } else
                alert(
                  "Error a Guardar Corte Puede Que Este Folio Ya Se Encuentre Guardado O No Este Vigente.."
                );
              document.querySelector("#vista_cortes").style.display = "none";
            })
            .catch(e => {
              document.querySelector("#modal_load").style.display = "none";
              alert("Error En Formato JSON !!!");
            });
        });
    }
  }
};
</script>