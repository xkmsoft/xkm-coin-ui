import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { store } from "@/store/index";
import { generateKeyPair } from "@/utils";
import { useApi } from "@/composables/api";

export enum ActionTypes {
  GenerateKeyPairs = "GENERATE_KEY_PAIRS",
  GetBalance = "GET_BALANCE",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GenerateKeyPairs](context: ActionAugments): void;
  [ActionTypes.GetBalance](context: ActionAugments): void;
};

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GenerateKeyPairs]({ commit }) {
    const keyPair = generateKeyPair();
    const privateKey = keyPair.getPrivate().toString("hex");
    commit(MutationType.SetPrivateKey, privateKey);
  },
  async [ActionTypes.GetBalance]({ commit }) {
    if (store.state.privateKey !== null) {
      const unSpentTxOuts = await useApi().fetchAddress(
        store.getters.publicKey
      );
      const balance = unSpentTxOuts
        .map((txOut) => txOut.amount)
        .reduce((a, b) => a + b, 0);
      commit(MutationType.SetBalance, balance);
    }
  },
};
