import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

import Home from "@/views/Home.vue";
import Wallet from "@/views/Wallet.vue";
import Blocks from "@/views/Blocks.vue";
import Block from "@/views/Block.vue";
import Transaction from "@/views/Transaction.vue";
import TransactionPool from "@/views/TransactionPool.vue";
import Address from "@/views/Address.vue";
import Status from "@/views/Status.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
  },
  {
    path: "/status",
    name: "Status",
    component: Status,
  },
  {
    path: "/blocks",
    name: "Blocks",
    component: Blocks,
  },
  {
    path: "/block/:hash",
    name: "Block",
    component: Block,
  },
  {
    path: "/address/:hash",
    name: "Address",
    component: Address,
  },
  {
    path: "/transaction/:id",
    name: "Transaction",
    component: Transaction,
  },
  {
    path: "/transaction-pool",
    name: "TransactionPool",
    component: TransactionPool,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({
            ...savedPosition,
            behavior: "smooth",
          });
        } else {
          resolve({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 50);
    });
  },
});

export function useRouter(): Router {
  return router as Router;
}
