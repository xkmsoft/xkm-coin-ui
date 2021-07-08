<template>
  <div class="unspent-tx-out">
    <!-- Tx Out ID -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Tx Out ID</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted"
          ><router-link :to="route">{{
            unspentTxOut.txOutId
          }}</router-link></span
        >
      </div>
    </div>
    <!-- Tx Out Index -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Tx Out Index</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ unspentTxOut.txOutIndex }}</span>
      </div>
    </div>
    <!-- Address -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Public Address</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ unspentTxOut.address }}</span>
      </div>
    </div>
    <!-- Amount -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Amount</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ unspentTxOut.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, computed } from "vue";
import { UnspentTxOut } from "@/types/transaction";

export default defineComponent({
  name: "UnspentTxOutComponent",
  props: {
    unspentTxOut: {
      type: Object as PropType<UnspentTxOut>,
      required: true,
    },
  },
  setup(props) {
    const route = computed(() => {
      return `/transaction/${props.unspentTxOut.txOutId}`;
    });
    return {
      ...toRefs(props),
      route,
    };
  },
});
</script>

<style scoped>
.unspent-tx-out {
  border: 1px lightgray solid;
  border-radius: 1.25rem;
}
</style>
