export type Wallet = {
  alias: string;
  address: string;
  balance: number;
  unspentTransactions: number;
};

export type Status = {
  circulation: number;
  chainSize: number;
  numberOfWallets: number;
  unspentTxOuts: number;
  wallets: Wallet[];
};
