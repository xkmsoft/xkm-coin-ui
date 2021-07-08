<template>
  <div>
    <!-- Address -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Public Address</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">
          <router-link :to="route">{{ txOut.address }}</router-link></span
        >
      </div>
    </div>
    <!-- Amount -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Amount</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ txOut.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { TxOut } from "@/types/transaction";

export default defineComponent({
  name: "TxOutComponent",
  props: {
    txOut: {
      type: Object as PropType<TxOut>,
      required: true,
    },
  },
  setup(props) {
    const route = computed(() => {
      return `/address/${props.txOut.address}`;
    });
    return {
      ...toRefs(props),
      route,
    };
  },
});
</script>

<style scoped></style>
