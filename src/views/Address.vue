<template>
  <div class="container">
    <div class="row m-1 p-1">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            id="account-summary-tab"
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#account-summary"
            type="button"
            role="tab"
            aria-controls="account-summary"
            aria-selected="false"
          >
            Account Summary
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            id="unspent-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#unspent-transactions"
            type="button"
            role="tab"
            aria-controls="unspent-transactions"
            aria-selected="true"
          >
            Unspent Transactions
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            id="received-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#received-transactions"
            type="button"
            role="tab"
            aria-controls="received-transactions"
            aria-selected="false"
          >
            Received Transactions
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            id="sent-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#sent-transactions"
            type="button"
            role="tab"
            aria-controls="sent-transactions"
            aria-selected="false"
          >
            Sent Transactions
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            id="mined-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#mined-transactions"
            type="button"
            role="tab"
            aria-controls="mined-transactions"
            aria-selected="false"
          >
            Mined Transactions
          </button>
        </li>
      </ul>
    </div>
    <div class="tab-content" id="tab-content">
      <div
        class="tab-pane fade show active"
        id="account-summary"
        role="tabpanel"
        aria-labelledby="account-summary-tab"
      >
        <div class="row m-1 p-1">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
            <span class="text-info">Public Address</span>
          </div>
          <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
            <span class="text-muted">{{ address }}</span>
          </div>
        </div>
        <div class="row m-1 p-1">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
            <span class="text-info">Balance</span>
          </div>
          <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
            <span class="text-muted">{{ balance }}</span>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="unspent-transactions"
        role="tabpanel"
        aria-labelledby="unspent-transactions-tab"
      >
        <UnspentTxOutComponent
          v-for="(unSpentTxOut, index) in unSpentTxOuts"
          :key="index"
          :unspent-tx-out="unSpentTxOut"
          class="mb-2"
        ></UnspentTxOutComponent>
      </div>
      <div
        class="tab-pane fade"
        id="received-transactions"
        role="tabpanel"
        aria-labelledby="received-transactions-tab"
      >
        <h6>Received Transaction</h6>
      </div>
      <div
        class="tab-pane fade"
        id="sent-transactions"
        role="tabpanel"
        aria-labelledby="sent-transactions-tab"
      >
        <h6>Sent Transaction</h6>
      </div>
      <div
        class="tab-pane fade"
        id="mined-transactions"
        role="tabpanel"
        aria-labelledby="mined-transactions-tab"
      >
        <h6>Mined Transaction</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { UnspentTxOut } from "@/types/transaction";
import { useApi } from "@/composables/api";
import { useRoute } from "vue-router";
import UnspentTxOutComponent from "@/components/UnspentTxOutComponent.vue";

export default defineComponent({
  name: "Address",
  components: { UnspentTxOutComponent },
  setup() {
    const route = useRoute();
    const unSpentTxOuts = ref<UnspentTxOut[]>([]);
    const address = computed(() => route.params.hash);
    const balance = computed(() => {
      return unSpentTxOuts.value
        .map((txOut) => txOut.amount)
        .reduce((a, b) => a + b, 0);
    });

    watch(address, () => {
      if (String(route.name) === "Address") {
        fetch();
      }
    });

    onMounted(() => {
      fetch();
    });

    const fetch = async () => {
      unSpentTxOuts.value = await useApi().fetchAddress(String(address.value));
    };

    return {
      address,
      balance,
      unSpentTxOuts,
    };
  },
});
</script>

<style scoped></style>
