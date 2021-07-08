import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { store } from "@/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEyeSlash,
  faTrashAlt,
  faWallet,
  faCubes,
  faFileInvoiceDollar,
  faServer,
  faBook,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faEyeSlash,
  faTrashAlt,
  faWallet,
  faCubes,
  faFileInvoiceDollar,
  faServer,
  faBook,
  faPlusSquare
);

import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
