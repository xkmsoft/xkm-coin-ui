import { GetterTree } from "vuex";
import { State } from "./state";
import { getKeyPairFromPrivate, getPrivatePEM, getPublicPEM } from "@/utils";

export type Getters = {
  publicKey(state: State): string;
  publicPEM(state: State): string;
  privatePEM(state: State): string;
};

export const getters: GetterTree<State, State> & Getters = {
  publicKey(state: State): string {
    if (state.privateKey === null) {
      return "";
    }
    const keyPair = getKeyPairFromPrivate(state.privateKey);
    return keyPair.getPublic(true, "hex");
  },
  publicPEM(state: State): string {
    if (state.privateKey === null) {
      return "";
    }
    return getPublicPEM(state.privateKey);
  },
  privatePEM(state: State): string {
    if (state.privateKey === null) {
      return "";
    }
    return getPrivatePEM(state.privateKey);
  },
};
