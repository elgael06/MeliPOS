
/*
    componente alta/vista proveedores
*/


let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "";

Vue.component("lista-proveedores",{
    props:['items','on_editar'],
    template:`
    <div style="overflow:auto;height:390px"lista_proveedores="">
    <table class="table">
         <thead >
              <tr class="table-warning">
                   <th>ID</th>
                   <th>Nombre</th>
                   <th>Representante</th>
                   <th>RFC</th>
                   <th>Telefono</th>
                   <th>Estatus</th>
                   <th></th>
              </tr>
         </thead>
         <tbody v-for="item in items" :key="item.Id">
              <tr>
                   <td rowspan="2">{{item.Id}}</td>
                   <td>{{item.Nombre}}</td>
                   <td>{{item.Representante}}</td>
                   <td>{{item.RFC}}</td>
                   <td>{{item.Telefono}}</td>
                   <td > 
                        <select class="form-control" style="width:120px" v-model="item.estatus" >
                            <option value="V">Vigente</option>
                            <option value="C">Cancelado</option>
                            <option value="B">Bloqueado</option>
                        </select>
                   </td>
                   <td rowspan="2"> <i class="btn btn-primary fa fa-list" @click="on_editar(item)"></i></td>
              </tr>
              <tr>
                <td><label>Email:</label>{{item.Email}}</td>
                <td colspan="4"> <label>Descripcion : </label> <span>{{item.Descripcion}} </span></td></tr>
         </tbody>
    </table>
</div>
    `
});

Vue.component('modal-proveedor',{
    props:['proveedor','guardar'],
    template:`
    <div class="modal_base" id="modal_proveedor">
        <div :class="tipo_modal">
            <div class="card-header">
                <i class="fa fa-close" style="float:right" @click="cerrar"></i>
                <label>
                    <span v-if="proveedor.Id>0">Editar</span>
                    <span v-else>Nuevo</span>
                    Proveedor
                </label>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-7">
                        <label>Nombre</label>
                        <input type="text" v-model="proveedor.Nombre" class="form-control" placeholder="Nombre..." />
                    </div>
                    <div class="col-sm-5">
                        <label>Representante</label>
                        <input type="text" v-model="proveedor.Representante" class="form-control" placeholder="Representante..." />
                    </div>
                    <div class="col-sm-4">
                        <label>RFC</label>
                        <input type="text" v-model="proveedor.RFC" class="form-control"  placeholder="RFC..."/>
                    </div>
                    <div class="col-sm-4">
                        <label>Email</label>
                        <input type="email" v-model="proveedor.Email" class="form-control" placeholder="Email..." />
                    </div>
                    <div class="col-sm-4">
                        <label>Telefono</label>
                        <input type="text" v-model="proveedor.Telefono" class="form-control"  placeholder="Telefono..."/>
                    </div>
                    <div class="col-sm-12">
                        <label>Descripcion</label>
                        <textarea v-model="proveedor.Descripcion" style="resize:none" class="form-control" placeholder="Descripcion..." ></textarea>
                    </div>
                    <div class="col-sm-12" style="margin-top:20px">
                        <i class="btn btn-success" @click="guardar" v-if="comprobar"> Guardar</i>
                        <i class="btn btn-danger" style="float:right"  @click="cerrar"> Cancelar</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        cerrar(){
            document.querySelector('#modal_proveedor').style.display="none";
        }
    },
    computed: {
        tipo_modal(){
            return this.proveedor.Id>0?"card primary animate":"card default animate";
        },
        comprobar(){
            return this.proveedor.Nombre && this.proveedor.Email && this.proveedor.RFC && this.proveedor.Representante && this.proveedor.Telefono && this.proveedor.Descripcion;
        },
    },
});

new Vue({
    el:'#root',
    data() {
        return {
            proveedor:{
                Id:0,
                Descripcion:"",
                Direccion:"",
                Email:"",
                Nombre:"",
                RFC:"",
                Representante:"",
                Telefono:"",
                estatus:"V",
            },
            lista_proveedores:[]
        }
    },
    created() {
        this.obtener_proveedores()
    },
    methods: {
        on_editar(proveedor){
            this.proveedor ={
                Id:proveedor.Id,
                Descripcion:proveedor.Descripcion,
                Direccion:proveedor.Direccion,
                Email:proveedor.Email,
                Nombre:proveedor.Nombre,
                RFC:proveedor.RFC,
                Representante:proveedor.Representante,
                Telefono:proveedor.Telefono,
                estatus:proveedor.estatus,
            } ;
            document.querySelector('#modal_proveedor').style.display="flex";
        },
        on_nuevo(){
            this.proveedor ={
                Id:0,
                Descripcion:"",
                Direccion:"",
                Email:"",
                Nombre:"",
                RFC:"",
                Representante:"",
                Telefono:"",
                estatus:"V",
            }
            document.querySelector('#modal_proveedor').style.display="flex";
        },
        obtener_proveedores(){
            document.querySelector("#modal_load").style.display="flex";
            fetch(`proveedores/api`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {
                    this.lista_proveedores = respuesta.Lista
                    document.querySelector("#modal_load").style.display="none";
                }));
        },
        guardar(){
            document.querySelector("#modal_load").style.display="flex";
            fetch(`proveedores/api`, {
                method: 'post',
                credentials: 'same-origin',
                body:JSON.stringify(this.proveedor),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {
                    alert(respuesta.respuesta)
                    document.querySelector('#modal_proveedor').style.display="none";
                    document.querySelector("#modal_load").style.display="none";
                    this.obtener_proveedores();
                }));
        }
    },
});