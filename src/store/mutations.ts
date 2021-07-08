import { MutationTree } from "vuex";
import { State } from "@/store/state";
import { AddressBook } from "@/types/AddressBook";

export enum MutationType {
  SetLoading = "SET_LOADING",
  SetPrivateKey = "SET_PRIVATE",
  SetBalance = "SET_BALANCE",
  InsertAddressBook = "INSERT_ADDRESS_BOOK",
  RemoveAddressBook = "REMOVE_ADDRESS_BOOK",
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetPrivateKey](state: State, value: string | null): void;
  [MutationType.SetBalance](state: State, value: number): void;
  [MutationType.InsertAddressBook](state: State, value: AddressBook): void;
  [MutationType.RemoveAddressBook](state: State, value: AddressBook): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.SetPrivateKey](state, value) {
    state.privateKey = value;
  },
  [MutationType.SetBalance](state, value) {
    state.balance = value;
  },
  [MutationType.InsertAddressBook](state, value) {
    const index = state.addressBook.findIndex(
      (address) => address.address === value.address
    );
    if (index === -1) {
      state.addressBook.push(value);
    }
  },
  [MutationType.RemoveAddressBook](state, value) {
    const index = state.addressBook.findIndex(
      (address) => address.address === value.address
    );
    if (index !== -1) {
      state.addressBook.splice(index, 1);
    }
  },
};
