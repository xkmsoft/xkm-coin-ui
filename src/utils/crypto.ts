import { Transaction, TxIn, TxOut, UnspentTxOut } from "@/types/transaction";
// @ts-ignore
import * as _ from "lodash";
import * as CryptoJS from "crypto-js";
import { useStore } from "@/store";
import { signData } from "@/utils/index";

const COINBASE_AMOUNT = 100;

export const getCoinbaseTransaction = (
  address: string,
  blockIndex: number
): Transaction => {
  const txIn: TxIn = new TxIn("", blockIndex, "");
  const txOut: TxOut = new TxOut(address, COINBASE_AMOUNT);
  const transaction = new Transaction("", [txIn], [txOut]);
  transaction.id = getTransactionId(transaction);
  return transaction;
};

export const getTransactionId = (transaction: Transaction): string => {
  const contentIn: string = transaction.txIns
    .map((txIn) => txIn.txOutId + txIn.txOutIndex)
    .reduce((a, b) => a + b, "");

  const contentOut: string = transaction.txOuts
    .map((txOut) => txOut.address + txOut.amount)
    .reduce((a, b) => a + b, "");

  const combined = contentIn + contentOut;
  return CryptoJS.SHA256(combined).toString();
};

export const signTransaction = (
  transaction: Transaction,
  txInIndex: number,
  unspentTxOuts: UnspentTxOut[]
): string => {
  const store = useStore();
  if (store.state.privateKey === null) {
    throw Error("Private key could not be found in the store");
  }
  const txIn: TxIn = transaction.txIns[txInIndex];
  const dataToSign = transaction.id;
  const referencedUnspentTxOut = findUnspentTxOut(
    txIn.txOutId,
    txIn.txOutIndex,
    unspentTxOuts
  );
  if (referencedUnspentTxOut == undefined) {
    console.log("could not find referenced txOut");
    throw Error();
  }
  const referencedAddress = referencedUnspentTxOut.address;
  if (store.getters.publicKey !== referencedAddress) {
    throw Error(
      "trying to sign an input with private key that does not match the address that is referenced in txIn"
    );
  }
  return signData(dataToSign);
};

export const findUnspentTxOut = (
  transactionId: string,
  index: number,
  unspentTxOuts: UnspentTxOut[]
): UnspentTxOut | undefined => {
  return unspentTxOuts.find(
    (txOut) => txOut.txOutId === transactionId && txOut.txOutIndex === index
  );
};

export const filterTxPoolTxs = (
  unspentTxOuts: UnspentTxOut[],
  transactionPool: Transaction[]
): UnspentTxOut[] => {
  const txIns: TxIn[] = transactionPool.map((tx) => tx.txIns).flat();
  const removable: UnspentTxOut[] = [];
  for (const unspentTxOut of unspentTxOuts) {
    const txIn = _.find(txIns, (aTxIn: TxIn) => {
      return (
        aTxIn.txOutIndex === unspentTxOut.txOutIndex &&
        aTxIn.txOutId === unspentTxOut.txOutId
      );
    });

    if (txIn !== undefined) {
      removable.push(unspentTxOut);
    }
  }
  return _.without(unspentTxOuts, ...removable);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const findTxOutsForAmount = (
  amount: number,
  myUnspentTxOuts: UnspentTxOut[]
) => {
  let currentAmount = 0;
  const includedUnspentTxOuts = [];
  for (const myUnspentTxOut of myUnspentTxOuts) {
    includedUnspentTxOuts.push(myUnspentTxOut);
    currentAmount = currentAmount + myUnspentTxOut.amount;
    if (currentAmount >= amount) {
      const leftOverAmount = currentAmount - amount;
      return { includedUnspentTxOuts, leftOverAmount };
    }
  }

  const eMsg =
    "Cannot create transaction from the available unspent transaction outputs." +
    " Required amount:" +
    amount +
    ". Available unspentTxOuts:" +
    JSON.stringify(myUnspentTxOuts);
  throw Error(eMsg);
};

export const createTxOuts = (
  receiverAddress: string,
  myAddress: string,
  amount: number,
  leftOverAmount: number
): TxOut[] => {
  const txOut1: TxOut = new TxOut(receiverAddress, amount);
  if (leftOverAmount === 0) {
    return [txOut1];
  } else {
    const leftOverTx = new TxOut(myAddress, leftOverAmount);
    return [txOut1, leftOverTx];
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTransaction = (
  receiverAddress: string,
  amount: number,
  unspentTxOuts: UnspentTxOut[],
  txPool: Transaction[]
): Transaction => {
  const store = useStore();
  if (store.state.privateKey === null) {
    throw Error("Private key could not be found in the store");
  }
  const address: string = store.getters.publicKey;
  const myUnspentTxOuts = filterTxPoolTxs(unspentTxOuts, txPool);

  // filter from unspentOutputs such inputs that are referenced in pool
  const { includedUnspentTxOuts, leftOverAmount } = findTxOutsForAmount(
    amount,
    myUnspentTxOuts
  );

  const toUnsignedTxIn = (unspentTxOut: UnspentTxOut) => {
    // @ts-ignore
    const txIn: TxIn = new TxIn();
    txIn.txOutId = unspentTxOut.txOutId;
    txIn.txOutIndex = unspentTxOut.txOutIndex;
    return txIn;
  };

  const unsignedTxIns: TxIn[] = includedUnspentTxOuts.map(toUnsignedTxIn);
  // @ts-ignore
  const tx: Transaction = new Transaction();
  tx.txIns = unsignedTxIns;
  tx.txOuts = createTxOuts(receiverAddress, address, amount, leftOverAmount);
  tx.id = getTransactionId(tx);

  tx.txIns = tx.txIns.map((txIn: TxIn, index: number) => {
    txIn.signature = signTransaction(tx, index, unspentTxOuts);
    return txIn;
  });

  return tx;
};
