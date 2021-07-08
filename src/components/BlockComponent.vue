<template>
  <div class="row m-1 p-1">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div class="m-1 p-1 card">
        <div class="row no-gutters">
          <div class="col-auto col"></div>
          <div class="col-12">
            <div class="px-2 m-2 p-2 card-body">
              <!-- Block Index -->
              <div class="row m-1 p-1">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                  <span class="text-info">Block Index</span>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
                  <span class="text-muted">{{ block.index }}</span>
                </div>
              </div>
              <!-- Block Hash -->
              <div class="row m-1 p-1">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                  <span class="text-info">Hash</span>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
                  <span class="text-muted">{{ block.hash }}</span>
                </div>
              </div>
              <!-- Previous Hash -->
              <div class="row m-1 p-1">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                  <span class="text-info">Previous Hash</span>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
                  <span class="text-muted">{{ block.previousHash }}</span>
                </div>
              </div>
              <!-- Block Timestamp -->
              <div class="row m-1 p-1">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                  <span class="text-info">Timestamp</span>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
                  <span
                    class="text-muted"
                    v-text="formatDateSec(block.timestamp)"
                  ></span>
                </div>
              </div>
              <!-- Block Difficulty -->
              <div class="row m-1 p-1">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                  <span class="text-info">Difficulty</span>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
                  <span class="text-muted">{{ block.difficulty }}</span>
                </div>
              </div>
              <!-- Block Nonce -->
              <div class="row m-1 p-1">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                  <span class="text-info">Nonce</span>
                </div>
                <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
                  <span class="text-muted">{{ block.nonce }}</span>
                </div>
              </div>
              <!-- Transactions -->
              <h6 class="text-success m-2 p-2">Transactions</h6>
              <TransactionComponent
                v-for="(transaction, index) in block.data"
                :key="transaction.id"
                :index="index"
                :transaction="transaction"
              ></TransactionComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { Block } from "@/types/block";
import TransactionComponent from "@/components/TransactionComponent.vue";
import { formatDateSec } from "@/utils";

export default defineComponent({
  name: "BlockComponent",
  components: { TransactionComponent },
  props: {
    block: {
      type: Object as PropType<Block>,
      required: true,
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
      formatDateSec,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 1.25rem;
}
</style>
