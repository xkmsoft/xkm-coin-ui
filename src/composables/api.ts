import axios from "axios";
import { Transaction, UnspentTxOut } from "@/types/transaction";
import { Block } from "@/types/block";
import { Status } from "@/types/status";

export interface Api {
  fetchLatestBlock(): Promise<Block>;
  fetchAddress(address: string): Promise<UnspentTxOut[]>;
  fetchTransaction(id: string): Promise<Transaction>;
  fetchBlocks(): Promise<Block[]>;
  fetchTransactionPool(): Promise<Transaction[]>;
  mineBlockWithTransaction(transactions: Transaction[]): Promise<Block>;
  sendTransaction(
    transaction: Transaction,
    unspentTxOuts: UnspentTxOut[]
  ): Promise<Transaction>;
  fetchStatus(): Promise<Status>;
}

export function useApi(): Api {
  const fetchLatestBlock = async (): Promise<Block> => {
    const url = "/api/LatestBlock";
    const response = await axios.get(url);
    return await response.data;
  };
  const fetchAddress = async (address: string): Promise<UnspentTxOut[]> => {
    const url = `/api/address/${address}`;
    const response = await axios.get(url);
    return await response.data;
  };
  const fetchTransaction = async (id: string): Promise<Transaction> => {
    const url = `/api/transaction/${id}`;
    const response = await axios.get(url);
    return await response.data;
  };
  const fetchBlocks = async (): Promise<Block[]> => {
    const url = "/api/blocks";
    const response = await axios.get(url);
    return await response.data;
  };
  const fetchTransactionPool = async (): Promise<Transaction[]> => {
    const url = "/api/transactionPool";
    const response = await axios.get(url);
    return await response.data;
  };
  const mineBlockWithTransaction = async (
    transactions: Transaction[]
  ): Promise<Block> => {
    const url = "/api/mine";
    const response = await axios.post(url, { transactions: transactions });
    return await response.data;
  };
  const sendTransaction = async (
    transaction: Transaction,
    unspentTxOuts: UnspentTxOut[]
  ): Promise<Transaction> => {
    const url = "/api/sendTransaction";
    const response = await axios.post(url, {
      transaction: transaction,
      unspentTxOuts: unspentTxOuts,
    });
    return await response.data;
  };
  const fetchStatus = async (): Promise<Status> => {
    const url = `/api/status`;
    const response = await axios.get(url);
    return await response.data;
  };
  return {
    fetchLatestBlock,
    fetchAddress,
    fetchTransaction,
    fetchBlocks,
    fetchTransactionPool,
    mineBlockWithTransaction,
    sendTransaction,
    fetchStatus,
  };
}
