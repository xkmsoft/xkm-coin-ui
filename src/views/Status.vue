<template>
  <div class="container">
    <div class="row m-1 p-1">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            id="summary-tab"
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#summary"
            type="button"
            role="tab"
            aria-controls="summary"
            aria-selected="true"
          >
            Summary
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            id="wallets-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#wallets"
            type="button"
            role="tab"
            aria-controls="wallets"
            aria-selected="false"
          >
            Wallets
          </button>
        </li>
      </ul>
    </div>
    <div v-if="status" class="tab-content" id="tab-content">
      <div
        class="tab-pane fade show active"
        id="summary"
        role="tabpanel"
        aria-labelledby="summary-tab"
      >
        <!-- Circulation -->
        <div class="row m-1 p-1">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
            <span class="text-info">Circulation</span>
          </div>
          <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
            <span class="text-muted">{{ status.circulation }}</span>
          </div>
        </div>
        <!-- Chain Size -->
        <div class="row m-1 p-1">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
            <span class="text-info">Chain Size</span>
          </div>
          <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
            <span class="text-muted">{{ status.chainSize }}</span>
          </div>
        </div>
        <!-- Unspent Transactions -->
        <div class="row m-1 p-1">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
            <span class="text-info">Unspent Transactions</span>
          </div>
          <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
            <span class="text-muted">{{ status.unspentTxOuts }}</span>
          </div>
        </div>
        <!-- Number Of Wallets -->
        <div class="row m-1 p-1">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
            <span class="text-info">Number Of Wallets</span>
          </div>
          <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
            <span class="text-muted">{{ status.numberOfWallets }}</span>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="wallets"
        role="tabpanel"
        aria-labelledby="wallets-tab"
      >
        <WalletStatusComponent
          v-for="wallet in sortedWallets"
          :key="wallet.address"
          :wallet-status="wallet"
        ></WalletStatusComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { Status, Wallet } from "@/types/status";
import { useApi } from "@/composables/api";
import WalletStatusComponent from "@/components/WalletStatusComponent.vue";

export default defineComponent({
  name: "Status",
  components: { WalletStatusComponent },
  setup() {
    const status = ref<Status | null>(null);
    const sortedWallets = computed(() => {
      if (status.value) {
        const wallets: Wallet[] = Object.assign([], status.value.wallets);
        return wallets.sort((a, b) => (a.balance > b.balance ? -1 : 1));
      }
      return [];
    });
    onMounted(() => {
      fetch();
    });
    const fetch = async () => {
      status.value = await useApi().fetchStatus();
    };
    return {
      status,
      sortedWallets,
    };
  },
});
</script>

<style scoped>
.wallet {
  border: 1px solid gray;
}
</style>
