<template>
  <div class="container">
    <div class="row m-1 p-1">
      <TransactionComponent
        v-if="transaction"
        index="0"
        :transaction="transaction"
      ></TransactionComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Transaction } from "@/types/transaction";
import { useApi } from "@/composables/api";
import TransactionComponent from "@/components/TransactionComponent.vue";

export default defineComponent({
  name: "Transaction",
  components: { TransactionComponent },
  setup() {
    const route = useRoute();
    const transaction = ref<Transaction | null>(null);
    const id = computed(() => route.params.id);

    watch(id, () => {
      if (String(route.name) === "Transaction") {
        fetch();
      }
    });

    onMounted(() => {
      fetch();
    });

    const fetch = async () => {
      transaction.value = await useApi().fetchTransaction(String(id.value));
    };

    return {
      transaction,
    };
  },
});
</script>

<style scoped></style>
