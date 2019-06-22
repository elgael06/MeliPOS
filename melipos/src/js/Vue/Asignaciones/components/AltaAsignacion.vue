
<template>
  <div class="modal_base" id="vista_asignacion" style="display:none">
    <div class="card" style="max-width:320px">
      <div class="card-header bg-primary text-white">
        <i class="fa fa-close close" @click="cerrar"></i>
        <label>Nueva Asignar</label>
      </div>
      <div class="card-body">
        <div class="row" style="heigtht:300px">
          <div class="col-sm-12 form-group-sm">
            <label>Id Cajero</label>
            <input class="form-control" type="number" v-model="id">
          </div>
          <div class="col-sm-12 form-group-sm">
            <label>Fondo Caja</label>
            <input class="form-control" type="number" v-model="fondo">
          </div>
          <i class="btn btn-info fa fa-save mt-3 btn-block" @click="enviar">Guardar</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AltaAsignacion",
  props: ["obtenerAsignacionPorFecha"],
  data() {
    return {
      id: 0,
      fondo: 0
    };
  },
  methods: {
    cerrar() {
      document.querySelector("#vista_asignacion").style.display = "none";
      this.id = 0;
      this.fondo = 0;
    },
    enviar() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`/Ventas/NuevaAsignacion/api`, {
        method: "post",
        body: JSON.stringify({
          id_usuario: parseInt(this.id || 0),
          fondo: parseFloat(this.fondo || 0)
        }),
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
              if (res.id > 0) {
                alert(
                  `Asignacion #${res.id} \t Fondo $ ${
                    res.fondo
                  } \n Guardado....`
                );
                this.obtenerAsignacionPorFecha();
                this.cerrar();
              } else
                alert("Error a Guardar Asignacio No Se Encontro El Cajero");
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


