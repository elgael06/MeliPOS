
<template>
    <div class="modal_base" id="Buscar_produtos" style="display:none">

        <div class="card" style="max-width:640px">
            <div class="card-header bg-primary text-white efecto">
                <i class="fa fa-close close" @click="cerrar"></i>
                <label>Productos</label>
            </div>
            <div class="card-body" style="background:#E4F0F3"> 
                <label class="text-black">Lista</label>
                <input type="text" v-model="filtro" class="form-control" placeholder="Fitro Producos.." />
                <div class="bg-white p-2" style="height:400px;overflow:auto">

                    <div class="row p-2">
                        <div class="card border col-sm-6 p-1 border border-primary rounded"
                        style="margin:10px 10px 10px 10px;display:block;max-width:245px"
                         v-for="item in productos" :key="item.id"
                         v-if="filtrado(item.descripcion)">
                            <div class="col-sm-12">
                                <img :src="item.src" class="btn btn-link btn-block" height="80" style="width:auto;margin:auto;display:block;"
                                 alt="{item.id}" />
                                <div class="form-group">
                                    <label>Descripcion :</label> 
                                    <i class="form-control"> {{item.descripcion}}</i>
                                </div>
                                <i class="btn btn-info btn-block fa fa-download" @click="seleccion(item.id)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'BuscarProductos',
    props:['seleccion','productos'],
    data(){
        return{
            filtro:""
        }
    },
    methods: {
        cerrar(){
            document.querySelector("#Buscar_produtos").style.display="none";
        },
        filtrado(descripcion){
            let des = descripcion.toUpperCase();
            return des.search(this.filtro.toUpperCase())>-1;
        },
    },
}
</script>

