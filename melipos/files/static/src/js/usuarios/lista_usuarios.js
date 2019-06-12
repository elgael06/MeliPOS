let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "";

const usuarios = new Vue({
    el:"#contenedor",
    data:{
        filtro:"",
        seleccion:{
            id:0,
            nombre:"",
            nombre_completo:"",
            password:"",
            password_conf:""
        },
        actualizar:false,
        lista:[]
    },
    created:function(){
        console.log("Funciona...");
        this.obtenerUsuarios();
    },
    updated() {
    },
    methods: {
    //eventos
    agregar(event){
        alert("Enviado...");
        console.log("Guardar = ",this.seleccion);
        this.guardar_nuevo_usuario();
        event.preventDefault();
    },
    cancelar(event){
        this.actualizar = false;
        this.obtenerUsuarios();
        this.seleccion={
            id:0,
            nombre:"",
            nombre_completo:"",
            password:"",
            password_conf:""
        }
        event.preventDefault();
    },
    filtro_empleados(seleccion){
        return (this.seleccion.nombre.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
        this.seleccion.nombre_completo.toUpperCase().search(this.filtro.toUpperCase()) > -1 );
    },
    //funciones
    //conexiones
        obtenerUsuarios(){
            fetch(`${$URL_API}/usuarios/api/`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(respuesta => {

                    this.lista = respuesta.usuarios;
                }))
        },
        guardar_nuevo_usuario(){
        console.log("Guardar = ",this.seleccion);
        let { nombre, nombre_completo, password } = this.seleccion;
            fetch(`${$URL_API}/usuarios/api/`, {
                method: 'post',
                credentials: 'same-origin',
                body:JSON.stringify({
                    nombre:nombre,
                    nombre_completo:nombre_completo,
                    password:password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(r=> {
                    alert(r.Usuario);
                    this.obtenerUsuarios();
                    this.seleccion={
                        id:0,
                        nombre:"",
                        nombre_completo:"",
                        password:"",
                        password_conf:""
                     }
                }))
        },
        actualizar_usuario(event){
            console.log("Actualizar = ",this.seleccion);
            let {id, nombre, nombre_completo, password } = this.seleccion;
            fetch(`${$URL_API}/usuarios/api/`, {
                method: 'put',
                credentials: 'same-origin',
                body:JSON.stringify({
                    id:id,
                    nombre:nombre,
                    nombre_completo:nombre_completo,
                    password:password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => console.error("Error=>", err))
            .then(res => res.json().then(r=> {
                alert(r.respuesta);
                this.obtenerUsuarios();
                this.seleccion={
                    id:0,
                    nombre:"",
                    nombre_completo:"",
                    password:"",
                    password_conf:""
                }
                this.actualizar = false;
            }))
            event.preventDefault();
         },
    },
    computed:{
        comprobar_guardado(){
            let resutado= false;
            resutado = this.seleccion.nombre!="" && this.seleccion.nombre_completo!="" && this.seleccion.password!="" && this.seleccion.password_conf!=""

            resutado = this.seleccion.password_conf=== this.seleccion.password && resutado;

            return resutado;
        }
    }
});

Vue.component("Usuarios",{
    props:["lista","filtro"],
    template:`
        <table class="table">
            <thead class="info">
                <tr class="bg-blue">
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Nombre Completo</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                <Usuario
                    v-for="usuario in lista"
                    :key="usuario.id"
                    v-bind:usuario="usuario" v-if="filtro(usuario)" />
            </tbody>
        </table>
    `,
    created(){
    }
});

Vue.component("Usuario",{
    props:["usuario"],
    template:`
    <tr v-if="usuario.estatus=='V'">
        <td>{{ usuario.id }}</td>
        <td> {{ usuario.nombre }}</td>
        <td> {{ usuario.nombre_completo }}</td>
        <td>
            <i class="btn btn-danger fa fa-trash" style="float:right;margin-left:5px;" v-on:click="()=>Borrar(usuario)"> Borrar ❌ </i>
            <i class="btn btn-info fa fa-edit" style="float:right;margin-left:5px;" v-on:click="()=>Editar(usuario)"> Editar ✔️ </i>
        </td>
    </tr>
    `,
    created(){
    },
    methods:{
        Editar(seleccion){
            usuarios.seleccion = {
                        id:seleccion.id,
                        nombre:seleccion.nombre,
                        nombre_completo:seleccion.nombre_completo,
                        password:seleccion.password,
                        password_conf:seleccion.password_conf
                     } ;
            usuarios.actualizar = true;
        },
        Borrar(seleccion){
            confirm("Borrar=>"+seleccion.nombre)?this.eliminnar_por_id(seleccion.id):alert("Cancelado!!!")
        },
        eliminnar_por_id(id){
            console.log("Eliminar = ",id);
            fetch(`${$URL_API}/usuarios/api/`, {
                method: 'PATCH',
                credentials: 'same-origin',
                body:JSON.stringify({
                    id:id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => console.error("Error=>", err))
            .then(res => res.json().then(r=> {
                alert(r.respuesta);
                usuarios.obtenerUsuarios();
            }))
        }
    }
});
