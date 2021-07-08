<template>
  <div>
    <!-- Tx Out ID -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Tx Out ID</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">
          <router-link :to="route">{{ txIn.txOutId }}</router-link></span
        >
      </div>
    </div>
    <!-- Tx Out Index -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Tx Out Index</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ txIn.txOutIndex }}</span>
      </div>
    </div>
    <!-- Signature -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Signature</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ txIn.signature }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { TxIn } from "@/types/transaction";

export default defineComponent({
  name: "TxInComponent",
  props: {
    txIn: {
      type: Object as PropType<TxIn>,
      required: true,
    },
  },
  setup(props) {
    const route = computed(() => {
      return `/transaction/${props.txIn.txOutId}`;
    });
    return {
      ...toRefs(props),
      route,
    };
  },
});
</script>

<style scoped></style>
