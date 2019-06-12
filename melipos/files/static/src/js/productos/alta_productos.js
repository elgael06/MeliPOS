/**
 * Dar de alta y mostrar los Productos
 * 
 */
let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "";

 const productos = new Vue({
     el:"#productos",
     data(){
         return{
             seleccion:{
                id:0,
                descripcion:'',
                folio_familia:1,
                costo:0.0,
                venta:0.0,
                margen:0.0,
                iva:16 
             },
             productos:[],
             fotos:[],
             codigos:[]
         }
     },
     created(){
         console.log("Productos...");
         this.Obtener_productos();
     },
     updated() {
         
     },
     methods: {
         //eventos
        on_nuevo(){
            this.restablecer_parametros();
            document.querySelector("#modal_alta").style.display="flex";             
        },
        on_guardar(){
             console.log("Listo...");
             this.seleccion.id>0 ? this.actualizar() :this.guardar() ;
        },
        margen(){
            let {costo,venta,iva} = this.seleccion;
            let t_costo=parseFloat(costo),
            t_venta = parseFloat(venta);
            let margen  = ((t_venta - t_costo)/t_venta )*100 || 0;

            this.seleccion.margen = Math.round( (margen*100) )/100;
        },
        venta(){
            let {costo,margen,iva} = this.seleccion;
            let t_costo = parseFloat(costo),
                t_margen = parseFloat(margen) / 100,
                t_veta = t_costo/(1-t_margen) || 0;
            this.seleccion.venta = Math.round( (t_veta*100) )/100;
        },
        //funciones
        guardar(){
            console.log("Guardar...");
            document.querySelector("#modal_load").style.display="flex";
            fetch(`${$URL_API}/Productos/api/`, {
                method: 'post',
                credentials: 'same-origin',
                body:JSON.stringify(this.seleccion),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {
                    document.querySelector("#modal_load").style.display="none";
                    alert(respuesta.producto);
                    this.restablecer_parametros();
                    this.Obtener_productos();
                }))
        },
        actualizar(){
            console.log("Actualizar...");
            document.querySelector("#modal_load").style.display="flex";
            fetch(`${$URL_API}/Productos/api/`, {
                method: 'put',
                credentials: 'same-origin',
                body:JSON.stringify(this.seleccion),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => console.error("Error=>", err))
            .then(res => res.json().then(respuesta => {
                document.querySelector("#modal_load").style.display="none";
                alert(respuesta.producto);
                this.restablecer_parametros();
                this.Obtener_productos();
            }))
        },
        restablecer_parametros(){
            this.seleccion={
                id:0,
                descripcion:'',
                folio_familia:1,
                costo:0.0,
                venta:0.0,
                margen:0.0,
                iva:16 
            }
            document.querySelector("#modal_alta").style.display="none";
        },
        Obtener_productos(){
            document.querySelector("#modal_load").style.display="flex";
            fetch(`${$URL_API}/Productos/api/`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    this.productos = respuesta.productos;
                }))
        },
        Obtener_imagenes(){
            document.querySelector("#modal_load").style.display="flex";
            this.fotos = [];
            fetch(`${$URL_API}/Productos/api/fotos?id=${this.seleccion.id}`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    this.fotos = respuesta.fotos;
                }))
        },
        Obtener_codigos(){
            document.querySelector("#modal_load").style.display="flex";
            this.fotos = [];
            fetch(`${$URL_API}/Productos/api/codigos?id=${this.seleccion.id}`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    this.codigos = respuesta.Codigos;
                }))
        },
     },
     computed: {
         comprovar(){
             const {descripcion,costo,venta,margen,iva} = this.seleccion;
             return descripcion && parseFloat(costo) && parseFloat(venta) && parseFloat(margen) && parseFloat(iva);
         }
     },
 });

Vue.component("Producto",{
     props:["productos"],
     data() {
         return {
             producto:{
                id:0,
                nombre:""
             },
         }
     },
     template:`
     <div>
     <table class="table">
        <thead>
            <tr class="bg-success text-white">
                <th>ID</th>
                <th>Descripcion</th>
                <th>Costo</th>
                <th>Venta</th>
            </tr>
        </thead>
        <tbody  v-for="producto in productos" :key="producto.id" >
            <tr >
                <td>{{producto.id}}</td>
                <td>{{producto.descripcion}}</td>
                <td>{{producto.costo}}</td>
                <td>{{producto.venta}}</td>
            </tr>
            <tr>
                <td colspan="2">
                    <i class="btn btn-primary btn-rounded fa fa-edit" @click="seleccion(producto)"> </i>
                    <i class="btn btn-info btn-rounded fa fa-camera" @click="seleccion_image(producto)"> </i>
                    <i class="btn btn-default btn-rounded fa fa-barcode" @click="seleccion_codigo(producto)"> </i>
                </td>
                <td colspan="2"><i class="btn btn-danger btn-rounded fa fa-trash" style="float:right"> </i></td>
            </tr>
        </tbody>
     </table>
     </div>
     `,
    methods:{
        seleccion(producto){
            console.log("producto=>",producto);
            productos.seleccion={
                id:producto.id,
                descripcion:producto.descripcion,
                folio_familia:producto.folio_familia,
                costo:producto.costo,
                venta:producto.venta,
                margen:producto.margen,
                iva:producto.iva 
            };
            document.querySelector("#modal_alta").style.display="flex";
        },
        seleccion_image(producto){
            console.log("producto=>",producto);

             productos.seleccion={
                id:producto.id,
                descripcion:producto.descripcion,
                folio_familia:producto.folio_familia,
                costo:producto.costo,
                venta:producto.venta,
                margen:producto.margen,
                iva:producto.iva 
            };
            document.querySelector("#modal_fotos").style.display="flex";
            productos.Obtener_imagenes();
            
        },
        seleccion_codigo(producto){
            console.log("producto=>",producto);

            productos.seleccion={
               id:producto.id,
               descripcion:producto.descripcion,
               folio_familia:producto.folio_familia,
               costo:producto.costo,
               venta:producto.venta,
               margen:producto.margen,
               iva:producto.iva 
           };
           document.querySelector("#modal_codigos").style.display="flex";
           productos.Obtener_codigos();
        },
        borrar(){

        },
    }
 });

Vue.component("moda-alta",{
    props:[
        'seleccion',
        'venta',
        'margen',
        'on_guardar',
        'restablecer_parametros',
        'comprovar'
    ],
    template:`
<div class="modal_base" id="modal_alta">
    <div class="card animate">
        <div class="card-header" style="background:green;color:#FFF">
            <i class="fa fa-close close" @click="cerrar"></i>
            <label><span v-if="seleccion.id==0">Agregar</span> <span v-if="seleccion.id > 0">Editar</span> Producto.</label>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-12">
                    <label>Descripcion</label>
                    <textarea class="form-control" v-model="seleccion.descripcion" style="resize:none" placeholder="Descripcion..."></textarea>
                </div>
                <div class="col-sm-3">
                    <label>Costo $:</label>
                    <input type="number" class="form-control" v-on:keyup="venta" v-model="seleccion.costo" />
                </div>
                <div class="col-sm-3">
                    <label>venta $:</label>
                    <input type="number" class="form-control" v-on:keyup="margen" v-model="seleccion.venta" />
                </div>
                <div class="col-sm-3">
                    <label>margen %:</label>
                    <input type="number" class="form-control" v-on:keyup="venta" v-model="seleccion.margen" />
                </div>
                <div class="col-sm-3">
                    <label>iva %:</label>
                    <input type="number" class="form-control" v-model="seleccion.iva" />
                </div>
                <div class=" col-sm-12" style="margin-top:20px">
                        <i class="btn btn-info">Clase</i>
                    <i class="btn btn-success" v-if="comprovar" @click="on_guardar">Guardar</i>
                    <i class="btn btn-danger" @click="restablecer_parametros" style="float:right">Cancelar</i>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    methods: {
        //eventos
        cerrar(){
            this.imagenes = [];
            this.restablecer_parametros();
        }
        //funciones
    },
});

Vue.component("moda-imagenes",{
    props:["producto","fotos",'Obtener'], 
    data() {
        return {
            imagen:""
        }
    },
    template:`
    <div class="modal_base" id="modal_fotos">
        <div class="card animate">
            <div class="card-header" style="background:rgb(71, 142, 236);color:#FFF">
                <i class="fa fa-close close" @click="cerrar"></i>
                <label> Imagenes De Producto.</label>
            </div>
            <div class="card-body">
                <div style="height:100px">
                <img style="float:right" :src="imagen" height="87" alt="producto." v-if="imagen" />
                <label> 
                Descripcion :
                <span style="color:black">{{producto.descripcion}}</span>
                </label>
                <input type="file" accept="image/png, image/jpeg" v-if="!imagen"  @change="imgToBase64" alt="..." />
                <br />
                <i class="fa fa-plus btn btn-success" @click="guardar" v-if="imagen" style="margin-top:10px;"> Agegar</i>
                <i class="fa fa-plus btn btn-danger" @click="Quitar" v-if="imagen" style="margin-top:10px;"> Quitar</i>
                </div>
                <div id="contenedor_fotos" style="overflow:auto;">
                    <div v-for=" foto in fotos" :key="foto.id" class="contenedor_foto">
                        <img :src="foto.foto" height="107" alt="producto."  />
                        <i @click="borrar_foto(foto.id)" class="fa fa-trash close" title="Eliminar" ></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        //eventos
        cerrar(){
            this.imagen = "";
            document.querySelector("#modal_fotos").style.display="none";
        },
        Quitar(){
            this.imagen="";
        },
        //funciones
        imgToBase64(event){
           // this.imagen 
           var input = event.target;
           if (input.files && input.files[0]) {
               var reader = new FileReader();
               reader.onload = (e) => {
                   this.imagen = e.target.result;
               }
               reader.readAsDataURL(input.files[0]);
           }
        },
        guardar(){
            document.querySelector("#modal_load").style.display="flex";
            console.log("Guardar Foto=>",this.imagen);
            this.imagen?
            fetch(`${$URL_API}/Productos/api/fotos`, {
                method: 'post',
                credentials: 'same-origin',
                body:JSON.stringify({
                    id:this.producto.id,
                   foto:this.imagen 
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    alert(respuesta.foto);
                    this.imagen = ""; 
                    this.Obtener();
                })):alert("Seleccione Una Foto...")
        },
        borrar_foto(id){
            console.log("Borrar Foto=>",this.imagen);
                if(confirm("Seguro De Eliminar Esta Foto?")){
                document.querySelector("#modal_load").style.display="flex";
                fetch(`${$URL_API}/Productos/api/fotos`, {
                    method: 'patch',
                    credentials: 'same-origin',
                    body:JSON.stringify({
                        id:id 
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    alert(respuesta.foto);
                    this.imagen = ""; 
                    this.Obtener();
                }));
            }
        },
    },
});

Vue.component("moda-codigos",{
    props:["producto","codigos",'Obtener'], 
    data() {
        return {
            codigo:""
        }
    },
    template:`
    <div class="modal_base" id="modal_codigos">
        <div class="card animate">
            <div class="card-header">
                <i class="fa fa-close close" @click="cerrar"></i>
                <label> Codigo De Producto.</label>
            </div>
            <div class="card-body">
                <div style="height:100px">
                <img style="float:right" :src="imagen" height="87" alt="producto." v-if="imagen" />
                <label> 
                Descripcion :
                <span style="color:black">{{producto.descripcion}}</span>
                </label>
                <form @submit.prevent="guardar" class="form-group">
                <label>Codigo:</label>
                <input type="text" class="form-control" v-model="codigo" alt="..." placeholder="Agregue Codigo maximo 20 Caracteres..." />
                </form>
                <i class="fa fa-plus btn btn-success" @click="guardar" v-if="codigo" style="margin-top:-10px;"> Agegar</i>
                <i class="fa fa-plus btn btn-danger" @click="Quitar" v-if="codigo" style="margin-top:-10px;"> Quitar</i>
                </div>
                <div id="contenedor_codigos" >
                   <table class="table">
                        <thead>
                            <tr class="bg-info text-white">
                                <th>ID</th>
                                <th>CODIGO</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody v-for=" codigo in codigos">
                            <tr>
                                <td>{{codigo.id}}</td>
                                <td>{{codigo.Codigo}}</td>
                                <td><i class="fa fa-trash" style="float:right;color;red" @click="borrar(codigo.id)"></i></td>
                            </tr>
                        </tbody>
                   </table>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        //eventos
        cerrar(){
            this.codigo = "";
            document.querySelector("#modal_codigos").style.display="none";
        },
        Quitar(){
            this.codigo="";
        },
        //funciones
        guardar(){
            document.querySelector("#modal_load").style.display="flex";
            console.log("Guardar codigo=>",this.codigo);
            this.codigo?
            fetch(`${$URL_API}/Productos/api/codigos`, {
                method: 'post',
                credentials: 'same-origin',
                body:JSON.stringify({
                    id:this.producto.id,
                    codigo:this.codigo.toString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    alert(respuesta.Codigo);
                    this.codigo = respuesta.estado ? "" :this.codigo; 
                    !respuesta.estado || this.Obtener();
                })):alert("Seleccione Un Codigo...")
        },
        borrar(id){
            console.log("Borrar Foto=>",this.codigo);
                if(confirm("Seguro De Eliminar Este Codigo?")){
                document.querySelector("#modal_load").style.display="flex";
                fetch(`${$URL_API}/Productos/api/codigos`, {
                    method: 'patch',
                    credentials: 'same-origin',
                    body:JSON.stringify({
                        id:id 
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    document.querySelector("#modal_load").style.display="none";
                    alert(respuesta.codigo);
                    this.codigo = ""; 
                    this.Obtener();
                }));
            }
        },
    },
});
