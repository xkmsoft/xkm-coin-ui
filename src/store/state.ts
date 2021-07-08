import { AddressBook } from "@/types/AddressBook";

export type State = {
  loading: boolean;
  privateKey: string | null;
  balance: number;
  addressBook: AddressBook[];
};

export const state: State = {
  loading: false,
  privateKey: null,
  balance: 0,
  addressBook: [],
};
