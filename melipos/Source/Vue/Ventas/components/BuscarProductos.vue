
<template>
  <div class="modal_base" id="Buscar_produtos" style="display:none">
    <div class="card" style="max-width:640px">
      <div class="card-header bg-primary text-white efecto">
        <i class="fa fa-close close" @click="cerrar"></i>
        <label>Productos</label>
      </div>
      <div class="card-body" style="background:#E4F0F3">
        <label class="text-black">Lista</label>
        <input type="text" v-model="filtro" class="form-control" placeholder="Fitro Producos..">
        <div class="bg-white p-2" style="height:400px;overflow:auto">
          <div class="row p-2">
            <ProductoBusqueda
              v-for="item in productos"
              :key="item.id"
              :item="item"
              :seleccion="seleccion"
              :filtrado="filtrado"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductoBusqueda from "./ProductoBusqueda";

export default {
  name: "BuscarProductos",
  props: ["seleccion", "productos"],
  components: {
    ProductoBusqueda
  },
  data() {
    return {
      filtro: ""
    };
  },
  methods: {
    cerrar() {
      document.querySelector("#Buscar_produtos").style.display = "none";
    },
    filtrado(descripcion) {
      let des = descripcion.toUpperCase();
      return des.search(this.filtro.toUpperCase()) > -1;
    }
  }
};
</script>

