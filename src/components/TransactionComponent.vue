<template>
  <div class="transaction m-2 p-2">
    <!-- Transaction ID -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Transaction ID</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">
          <router-link :to="route">{{ transaction.id }}</router-link></span
        >
      </div>
    </div>
    <h6 class="text-success m-2 p-2">Inputs</h6>
    <TxInComponent
      v-for="(txIn, index) in transaction.txIns"
      :key="index"
      :tx-in="txIn"
    >
    </TxInComponent>
    <h6 class="text-success m-2 p-2">Outputs</h6>
    <TxOutComponent
      v-for="(txOut, index) in transaction.txOuts"
      :key="index"
      :tx-out="txOut"
    >
    </TxOutComponent>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { Transaction } from "@/types/transaction";
import TxInComponent from "@/components/TxInComponent.vue";
import TxOutComponent from "@/components/TxOutComponent.vue";

export default defineComponent({
  name: "TransactionComponent",
  components: { TxOutComponent, TxInComponent },
  props: {
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const route = computed(() => {
      return `/transaction/${props.transaction.id}`;
    });
    return {
      ...toRefs(props),
      route,
    };
  },
});
</script>

<style scoped>
.transaction {
  border: 1px lightgray solid;
  border-radius: 1.25rem;
}
</style>
