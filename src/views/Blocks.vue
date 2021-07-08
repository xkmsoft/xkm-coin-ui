<template>
  <div class="container">
    <BlockComponent
      v-for="block in blocks"
      :key="block.hash"
      :block="block"
    ></BlockComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Block } from "@/types/block";
import { useApi } from "@/composables/api";
import BlockComponent from "@/components/BlockComponent.vue";

export default defineComponent({
  name: "Blocks",
  components: { BlockComponent },
  setup() {
    const blocks = ref<Block[]>([]);
    onMounted(() => {
      fetchBlocks();
    });
    const fetchBlocks = async () => {
      blocks.value = await useApi().fetchBlocks();
    };
    return {
      blocks,
    };
  },
});
</script>

<style scoped></style>
