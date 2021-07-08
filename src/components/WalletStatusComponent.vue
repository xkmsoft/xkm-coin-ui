<template>
  <div class="wallet-status m-2 p-2">
    <!-- Alias -->
    <div v-if="alias" class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Alias</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ alias }}</span>
      </div>
    </div>
    <!-- Public Address -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Public Address</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">
          <router-link :to="route">{{ walletStatus.address }}</router-link>
        </span>
      </div>
    </div>
    <!-- Balance -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Balance</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ walletStatus.balance }}</span>
      </div>
    </div>
    <!-- Number Of Unspent Transaction -->
    <div class="row m-1 p-1">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
        <span class="text-info">Unspent Transactions</span>
      </div>
      <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
        <span class="text-muted">{{ walletStatus.unspentTransactions }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { Wallet } from "@/types/status";
import { useStore } from "@/store";

export default defineComponent({
  name: "WalletStatusComponent",
  props: {
    walletStatus: {
      type: Object as PropType<Wallet>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const addressBook = computed(() => store.state.addressBook);

    const alias = computed(() => {
      const index = addressBook.value.findIndex(
        (addressBook) => addressBook.address === props.walletStatus.address
      );
      if (index !== -1) {
        return addressBook.value[index].alias;
      }
      return null;
    });

    const route = computed(() => {
      return `/address/${props.walletStatus.address}`;
    });

    return {
      ...toRefs(props),
      route,
      alias,
    };
  },
});
</script>

<style scoped>
.wallet-status {
  border: 1px lightgray solid;
  border-radius: 1.25rem;
}
</style>
