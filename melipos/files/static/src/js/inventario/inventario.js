

Vue.component('modal-producto',{
    props:["producto",'guardar','cancelar'],
    template:`
        <div class="modal_base" id="modal_producto">
            <div class="card">
                <div class="card-header bg-primary text-white">
               
                    Inventario Producto.
                </div>
                <div class="car-body">
                <div class="container">
                <div class="row">
                        <div class="col-sm-12">
                            <label>Descripcion</label>
                            <i class="form-control">
                                {{producto.descripcion}}
                            </i>
                        </div>
                        <div class="col-sm-2">
                            <label>Margen %</label>
                            <i class="form-control numero">
                                {{producto.margen}}
                            </i>
                        </div>
                        <div class="col-sm-2">
                            <label>Venta $</label>
                            <i class="form-control numero">
                                {{producto.venta}}
                            </i>
                        </div>
                        <div class="col-sm-2">
                            <label>Cantidad </label>
                            <input class="form-control numero" v-model="producto.cantidad" />
                        </div>
                        <div class="col-sm-2">
                            <label>Medida </label>
                            <select class="form-control" v-model="producto.unidad_medida">
                                <option>PZ</option>
                                <option>KG</option>
                            </select>
                        </div>
                        <div class="col-sm-4" id="contenedor_btn_modal">
                            <i class="btn btn-success" @click="guardar">Guardar.</i>
                            <i class="btn btn-danger" @click="cancelar">Cancelar.</i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    `,
});

Vue.component("busqueda-producto",{
    props:['Agregar'],
    template:`
    <form class="col-sm-4" @submit.prevent="Buscar_producto">
        <label>Agregar Producto : </label>
        <input type="text" class="form-control col-sm-11" v-model="producto" />
    </form>
    `,
    data() {
        return {
            producto:'', 
        }
    },
    methods: {
        Buscar_producto(){
            console.log(`Buscar => ${this.producto}`);
            this.producto?this.buscar():'';
        },
        buscar(){
            document.querySelector("#modal_load").style.display="flex";
            fetch(`api/`, {
                method: 'post',
                credentials: 'same-origin',
                body:JSON.stringify({
                    id:this.producto
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {
                    document.querySelector("#modal_load").style.display="none";
                    console.log(respuesta.inventario);
                    respuesta.inventario.id_producto>0?this.Agregar(respuesta.inventario):alert("El producto No Existe!!!");
                    this.producto = ""; 
                }));
        },
    },
});
Vue.component('inventario',{
    props:['inventario','Agregar'],
    template:`
    <table class="table">
        <thead class="bg-success">
            <tr class="bg-success">
                <th class="chico centro">ID</th>
                <th>DESCRIPCIN</th>
                <th class="chico centro">CANTIDAD</th>
                <th class="chico centro">MEDIDA</th>
                <th class="chico centro">MARGEN</th>
                <th class="chico centro">VENTA</th>
                <th class="chico"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="producto in inventario" k:key="producto.id_producto">
                <td class="centro">{{producto.id_producto}}</td>
                <td>{{producto.descripcion}}</td>
                <td class="numero">{{producto.cantidad}}</td>
                <td class="centro">{{producto.unidad_medida}}</td>
                <td class="numero">{{producto.margen}} %</td>
                <td class="numero">\$ {{producto.venta}}</td>
                <td class="centro"><i class="btn btn-info fa fa-edit" @click="Agregar(producto)"></i></td>
            </tr>
        </tbody>
    </table>
    `
});

const inventario = new Vue({
    el:"#root",
    data() {
        return {
            seleccion:{},
            inventario:[]  
        }
    },
    created() {
        setTimeout(()=>this.obtener_inventario(),200);
    },
    methods: { 
        Agregar(inventario){
            this.seleccion = inventario;
            document.querySelector("#modal_producto").style.display="flex";
        },  
        guardar_producto(){
            this.enviar_producto();
        },
        cancelar_producto(){
            this.seleccion = {};
            document.querySelector("#modal_producto").style.display="none";
        }, 
        enviar_producto(){
            document.querySelector("#modal_load").style.display="flex";
            fetch(`api/`, {
                method: 'put',
                credentials: 'same-origin',
                body:JSON.stringify(this.seleccion),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {
                    alert(respuesta.inventario);
                    this.cancelar_producto(); 
                    this.obtener_inventario();
                    document.querySelector("#modal_load").style.display="none";
                }));
        },   
        obtener_inventario(){
            document.querySelector("#modal_load").style.display="flex";
            fetch(`api/`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {
                    console.log(respuesta.inventario);
                    this.inventario=respuesta.inventario; 
                    document.querySelector("#modal_load").style.display="none";
                }));
        }, 
    },

});


