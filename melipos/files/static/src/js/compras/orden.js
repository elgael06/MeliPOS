/***
 * Crear Modificar Ordenes De Compras
 */

Vue.component("producto-lista", {
  props: ["producto", "eliminar", "cambio"],
  template: `
        <div class="card mt-4">
            <div class="card-header bg-secondary text-white">
                <i class="fa fa-close" style="float:right" @click="eliminar(producto)"></i>
                <label>ID: {{producto.id}}</label>
                <label> {{producto.descripcion}}</label>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-2"  style="max-width:160px;display:inline-block">
                        <label>cantidad</label>
                        <input type="text" @keypress="on_cantidad" v-model="producto.cantidad" class="form-control" />
                    </div>
                    <div class="col-sm-2" style="max-width:160px;display:inline-block">
                        <label>costo</label>
                        <input type="text"@keypress="on_costo" v-model="producto.costo" class="form-control" />
                    </div>
                    <div class="col-sm-2" style="max-width:160px;display:inline-block">
                        <label>iva</label>
                        <input type="text" v-model="producto.iva" class="form-control" />
                    </div>
                    <div class="col-sm-2" style="max-width:160px;display:inline-block">
                        <label>margen</label>
                        <input type="text" disabled v-model="producto.margen" class="form-control" />
                    </div>
                    <div class="col-sm-2" style="max-width:160px;display:inline-block">
                        <label>venta</label>
                        <input type="text" disabled v-model="producto.venta" class="form-control" />
                    </div>
                    <div class="col-sm-2" style="max-width:160px;display:inline-block">
                        <label>total</label>
                        <input type="text" disabled v-model="producto.total" class="form-control" />
                    </div>
                </div>
            </div>
        </div>
     `,
  methods: {
    on_cantidad() {
      let { cantidad, costo } = this.producto;
      this.producto.total = cantidad * costo;
      this.cambio();
    },
    on_costo() {
      let { cantidad, costo } = this.producto;
      this.producto.total = cantidad * costo;
      this.cambio();
    }
  }
});

Vue.component("modal-orden", {
  props: ["orden", "productos", "lista_proveedores", "Guardar_orden"],
  template: `
        <div class="modal_base" id="moda_orden">
            <div  class="card  animate">
                <div :class="tipo_modal">
                    <i class="fa fa-close" style="float:right" @click="cerrar"></i>
                    <label>
                        <span v-if="orden.id>0">Editar : {{orden.id}} </span>
                        <span v-else>Nueva</span>
                        Orden Compra
                    </label>
                </div>
                <div class="card-body" style="background:#e9efee"">
                    <div class="row">
                            <div class="col-sm-4">
                                <label>Proveedor</label>
                                <select class="form-control"  v-model="orden.proveedor" @change="on_proveedor">
                                        <option v-for="item in lista_proveedores" :key="item.Id">{{item.Nombre}}</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>Descripcion</label>
                                <input type="text" class="form-control" v-model="orden.Descripcion" />
                            </div>
                            <div class="col-sm-2">
                                <label>Estatus</label>
                                <select class="form-control"  v-model="orden.estatus">
                                        <option value="V">Vigente</option>
                                        <option value="C">Cancelada</option>
                                        <option value="F">Finalizo</option>
                                </select>
                            </div>
                            <div class="col-sm-2" style="max-width:160px;display:inline-block">
                                <label>Productos</label>
                                <input type="text" class="form-control" disabled v-model="orden.productos" />
                            </div>
                            <div class="col-sm-2"  style="max-width:160px;display:inline-block">
                                <label>Total $</label>
                                <input type="text" class="form-control" disabled v-model="orden.Total" />
                            </div>
                            <form class="col-sm-3"  style="max-width:210px;display:inline-block" @submit.prevent="Agregar_producto">
                                <label>Agregar</label>
                                <input type="text" class="form-control" v-model="seleccion.id" />
                            </form>                             
                            <div class="col-sm-5">      
                            <i class="btn btn-info fa fa-search" style="margin-top:20px" > Buscar</i>
                                <i class="btn btn-success fa fa-save" style="margin-top:20px" v-if="comprobar" @click="Guardar_orden" > Guardar</i>
                                <i class="btn btn-danger fa fa-close" style="float:right;margin-top:20px" @click="cerrar" > Cancelar</i>
                            </div>
                    </div>
                </div>
                <div class="card-body" style="background:#e9efee"">
                    <label>Productos</label>
                    <div style="height:320px;overflow:auto;background:#FFF" class="p-2">
                            <producto-lista v-for="item in productos" v-bind:cambio="actualizar_datos" v-bind:producto="item" v-bind:eliminar="eliminar"  />
                    </div>
                </div>
            </div>
        </div>
    `,
  data() {
    return {
      seleccion: {
        id: ""
      }
    };
  },
  updated() {},
  methods: {
    Agregar_producto() {
      console.log("Agregar : ", this.seleccion.id);
      this.buscar_producto();
    },
    on_proveedor() {
      let index = this.lista_proveedores.findIndex(
        e => e.Nombre == this.orden.proveedor
      );
      console.log(this.orden.proveedor);
      console.log(index);
      if (index > -1) {
        this.orden.Folio_proveedor = this.lista_proveedores[index].Id;
      }
    },
    cerrar() {
      document.querySelector("#moda_orden").style.display = "none";
    },
    eliminar(seleccion) {
      if (confirm(`Eliminar el Producto ${seleccion.descripcion} ?`)) {
        let indice = this.productos.findIndex(e => e.id == seleccion.id);
        this.productos.splice(indice, 1);
        this.actualizar_datos();
      }
    },
    actualizar_datos() {
      let total = 0;
      this.orden.productos = this.productos.length || 0;

      for (p of this.productos) {
        total += parseFloat(p.total);
      }
      this.orden.Total = total;
    },
    buscar_producto() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`productos/api?id=${this.seleccion.id}`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(err => {
          console.error("Error=>", err);
          alert("Codigo No Relacionado A producto !!!");
          document.querySelector("#modal_load").style.display = "none";
        })
        .then(res =>
          res
            .json()
            .then(respuesta => {
              if (respuesta.producto.id) {
                let index = this.productos.findIndex(
                  e => e.id == respuesta.producto.id
                );
                if (index === -1) this.productos.push(respuesta.producto);
                else {
                  let prod = this.productos.filter(
                    e => e.id == respuesta.producto.id
                  );
                  for (p of prod) {
                    p.cantidad = parseFloat(p.cantidad);
                    p.total = parseFloat(p.total);
                    p.cantidad += parseFloat(respuesta.producto.cantidad);
                    p.total += parseFloat(respuesta.producto.total);
                  }
                }
                this.actualizar_datos();
              } else
                alert(
                  `Codigo : ${
                    this.seleccion.id
                  }\n No Relacionado A producto !!!`
                );
              document.querySelector("#modal_load").style.display = "none";
              this.seleccion.id = "";
            })
            .catch(e => {
              console.error("Error=>", e);
              alert("Codigo No Relacionado A producto !!!");
              document.querySelector("#modal_load").style.display = "none";
            })
        );
    }
  },
  computed: {
    tipo_modal() {
      return this.orden.id > 0
        ? "card-header text-white bg-info"
        : "card-header text-white bg-success";
    },
    comprobar() {
      return this.orden.Folio_proveedor && this.orden.productos > 0;
    }
  }
});

Vue.component("orden-lista", {
  props: ["orden", "seleccion"],
  template: `
    <div class="card">
        <div class="card-header bg-secondary text-white">
            <label> ID ORDEN: {{orden.id}} </label>
            <i class="btn btn-info" @click="seleccion(orden)" v-if="estatus" style="float:right">Seleccionar</i>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-4">
                    <label>Proveedor :</label>
                    <label class="form-control">{{orden.proveedor}}</label>
                </div>
                <div class="col-sm-4">
                    <label>Descripcion :</label>
                    <label class="form-control">{{orden.Descripcion}}</label>
                </div>
                <div class="col-sm-2">
                    <label> Fecha creacion :{{orden.fecha}}</label>
                    <label> Modificacion :{{orden.fecha_modificacion}}</label>
                </div> 
                <div class="col-sm-2">
                <label> Productos :{{orden.productos}}</label>
                <label> Total :$ {{orden.Total}}</label>
                </div>               
                <div class="col-sm-3">
                    <label>Estatus</label>
                    <select disabled class="form-control" v-model="orden.estatus">
                        <option value="V">Vigente</option>
                        <option value="C">Cancelada</option>
                        <option value="F">Finalizo</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <label>Creo</label>
                    <i class="form-control">{{orden.usuario_creo}}</i>
                </div>
                <div class="col-sm-4">
                    <label>Modifico</label>
                    <i class="form-control">{{orden.usuario_modifico}}</i>
                </div>
            </div>
        </div>
    </div>
    `,
  computed: {
    estatus() {
      return this.orden.estatus != "F";
    }
  }
});

let root = new Vue({
  el: "#root",
  data() {
    return {
      orden: {
        id: 0,
        Folio_proveedor: 0,
        proveedor: "",
        productos: 0,
        Total: 0.0,
        Descripcion: "",
        estatus: "V"
      },
      productos: [],
      lista_ordenes: [],
      lista_proveedores: []
    };
  },
  created() {
    console.log("Incia...");
    this.obtener_compras();
  },
  methods: {
    on_nueva() {
      this.orden = {
        id: 0,
        Folio_proveedor: 0,
        proveedor: "",
        productos: 0,
        Total: 0.0,
        Descripcion: "",
        estatus: "V"
      };
      this.productos = [];
      this.obtener_proveedores();
      document.querySelector("#moda_orden").style.display = "flex";
    },
    on_editar(seleccion) {
      console.log(seleccion);
      this.obtener_productos(seleccion.id);
      this.orden = {
        id: seleccion.id,
        Folio_proveedor: seleccion.Folio_proveedor,
        proveedor: seleccion.proveedor,
        productos: seleccion.productos,
        Total: seleccion.Total,
        Descripcion: seleccion.Descripcion,
        estatus: seleccion.estatus
      };
      this.obtener_proveedores();
      document.querySelector("#moda_orden").style.display = "flex";
    },
    obtener_compras() {
      //Compras
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`ordenes/api`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(err => console.error("Error=>", err))
        .then(res =>
          res.json().then(respuesta => {
            this.lista_ordenes = respuesta.orden.lista;
            document.querySelector("#modal_load").style.display = "none";
          })
        );
    },
    obtener_proveedores() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`proveedores/api`, {
        method: "get",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(err => console.error("Error=>", err))
        .then(res =>
          res.json().then(respuesta => {
            this.lista_proveedores = respuesta.Lista;
            document.querySelector("#modal_load").style.display = "none";
          })
        );
    },
    obtener_productos(id) {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`productos/api`, {
        method: "post",
        credentials: "same-origin",
        body: JSON.stringify({ id_orden: id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(err => {
          console.error("Error=>", err);
          document.querySelector("#modal_load").style.display = "none";
        })
        .then(res =>
          res.json().then(respuesta => {
            console.log(respuesta.productos);
            this.productos = respuesta.productos;
            document.querySelector("#modal_load").style.display = "none";
          })
        );
    },
    Guardar_orden() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`ordenes/api`, {
        method: "post",
        credentials: "same-origin",
        body: JSON.stringify(this.orden),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(err => {
          console.error("Error=>", err);
          document.querySelector("#modal_load").style.display = "none";
        })
        .then(res =>
          res.json().then(respuesta => {
            this.orden.id = respuesta.orden.folio;
            this.Guardar_productos();
            alert(respuesta.orden.estatus);
            document.querySelector("#modal_load").style.display = "none";
          })
        );
    },
    Guardar_productos() {
      document.querySelector("#modal_load").style.display = "flex";
      fetch(`productos/api`, {
        method: "put",
        credentials: "same-origin",
        body: JSON.stringify({
          id_orden: this.orden.id,
          productos: this.productos
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .catch(err => console.error("Error=>", err))
        .then(res =>
          res.json().then(respuesta => {
            alert(respuesta.Productos);
            document.querySelector("#modal_load").style.display = "none";
            this.obtener_proveedores();
            this.obtener_compras();
            document.querySelector("#moda_orden").style.display = "none";
          })
        );
    }
  }
});
