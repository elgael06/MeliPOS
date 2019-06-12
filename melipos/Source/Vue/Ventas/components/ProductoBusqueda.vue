
<<template>
     <div class="card border col-sm-6 p-1 border border-primary rounded"
                        style="margin:10px 10px 10px 10px;display:block;max-width:245px"
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
</template>
<script >
export default {
  name: "ProductoBusqueda",
  props: ["filtrado", "item", "seleccion"],
  
};
</script>


