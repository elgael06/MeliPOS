
<<template>
    <div class="row">
           <div class="col-sm-12">
            <label>Billetes</label>
          </div>
          <div class="col-sm-2">
            <label>$20</label>
            <input type="number" class="form-control" v-model="billetes.veinte">
          </div>
          <div class="col-sm-2">
            <label>$50</label>
            <input type="number" class="form-control" v-model="billetes.cincuenta">
          </div>
          <div class="col-sm-2">
            <label>$100</label>
            <input type="number" class="form-control" v-model="billetes.cien">
          </div>
          <div class="col-sm-2">
            <label>$200</label>
            <input type="number" class="form-control" v-model="billetes.docientos">
          </div>
          <div class="col-sm-2">
            <label>$500</label>
            <input type="number" class="form-control" v-model="billetes.quinientos">
          </div>
          <div class="col-sm-2 bg-info">
            <label>Total</label>
            <i class="form-control">
              <Moneda :cantidad="tbilletes"/>
            </i>
          </div>
    </div>
</template>
<script>
import Moneda from "../../ComponentesGlobales/Moneda";
export default {
  name: "EntradaBilletes",
  props: ["billetes", "tbilletes"],
  components: {
    Moneda
  }
};
</script>

