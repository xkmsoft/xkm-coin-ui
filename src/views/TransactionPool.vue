<template>
  <div class="container">
    <div class="row m-1 p-1">
      <TransactionComponent
        v-for="(transaction, index) in transactions"
        :key="index"
        :index="index"
        :transaction="transaction"
      >
      </TransactionComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Transaction } from "@/types/transaction";
import { useApi } from "@/composables/api";
import TransactionComponent from "@/components/TransactionComponent.vue";

export default defineComponent({
  name: "TransactionPool",
  components: { TransactionComponent },
  setup() {
    const transactions = ref<Transaction[]>([]);
    onMounted(() => {
      fetchTransactionPool();
    });

    const fetchTransactionPool = async () => {
      transactions.value = await useApi().fetchTransactionPool();
    };

    return {
      transactions,
    };
  },
});
</script>

<style scoped></style>
