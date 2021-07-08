<template>
  <tr>
    <td>
      <font-awesome-icon
        :icon="['fas', 'trash-alt']"
        style="cursor: pointer"
        @click="removeAddress"
      >
      </font-awesome-icon>
    </td>
    <td>{{ addressBook.alias }}</td>
    <td>
      <router-link :to="route">{{ addressBook.address }}</router-link>
    </td>
  </tr>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { AddressBook } from "@/types/AddressBook";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";

export default defineComponent({
  name: "AddressBookComponent",
  props: {
    addressBook: {
      type: Object as PropType<AddressBook>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const route = computed(() => {
      return `/address/${props.addressBook.address}`;
    });

    const removeAddress = () => {
      store.commit(MutationType.RemoveAddressBook, props.addressBook);
    };

    return {
      ...toRefs(props),
      removeAddress,
      route,
    };
  },
});
</script>

<style scoped></style>
