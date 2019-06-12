
<template>
    <div class="panel-body">
        <label>Lista Productos :</label>
        <div style="height:340px;overflow:auto">
            <table class="table table-condensed">
                <thead>
                    <tr class="warning">
                        <th>Folio</th>
                        <th>Descripcion</th>
                        <th>Costo</th>
                        <th>Cantidad</th>
                        <th>Descuento</th>
                        <th>Total</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <productoLista v-for="(item,index) in lista" v-bind:item="item" v-bind:index="index" 
                    :key="item.folio +'_'+ index"  />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import productoLista from './ProductoLista'
export default {
    name:'PrductosCaja',
    props:['lista'],
    components:{
        productoLista,
    }
}
</script>



