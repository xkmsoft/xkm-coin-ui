<template>
  <div class="container">
    <div class="row m-1 p-1">
      <ul class="nav nav-tabs" role="tablist">
        <!-- Settings -->
        <li class="nav-item dropdown" role="presentation">
          <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
          >
            Settings
          </a>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" @click="initializeWallet"
                >Initialize Wallet</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="importPrivateKey"
                >Import Private Key</a
              >
              <input
                ref="privateKeyInput"
                type="file"
                :accept="pemFileMimeType"
                @change="onPrivateKey"
                style="display: none"
              />
            </li>
            <li v-if="privateKey">
              <a class="dropdown-item" href="#" @click="exportPrivateKey"
                >Export Private Key</a
              >
            </li>
            <li v-if="privateKey">
              <a class="dropdown-item" href="#" @click="exportPublicKey"
                >Export Public Key</a
              >
            </li>
            <li v-if="privateKey">
              <a class="dropdown-item" href="#" @click="exportAddressBook"
                >Export Address Book</a
              >
            </li>
            <li v-if="privateKey">
              <a class="dropdown-item" href="#" @click="importJSONFile"
                >Import Address Book</a
              >
              <input
                ref="jsonFileInput"
                type="file"
                :accept="addressBookMimeType"
                @change="onJSONFile"
                style="display: none"
              />
            </li>
          </ul>
        </li>
        <!-- Account -->
        <li class="nav-item" role="presentation">
          <button
            id="account-summary-tab"
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#account-summary"
            type="button"
            role="tab"
            aria-controls="account-summary"
            aria-selected="true"
          >
            Account
          </button>
        </li>
        <!-- Address Book -->
        <li v-if="privateKey" class="nav-item" role="presentation">
          <button
            id="address-book-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#address-book"
            type="button"
            role="tab"
            aria-controls="address-book"
            aria-selected="false"
          >
            Address Book
          </button>
        </li>
        <!-- Unspent Transactions -->
        <li v-if="privateKey" class="nav-item" role="presentation">
          <button
            id="unspent-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#unspent-transactions"
            type="button"
            role="tab"
            aria-controls="unspent-transactions"
            aria-selected="true"
          >
            Unspent
          </button>
        </li>
        <!-- Received Transactions -->
        <li v-if="privateKey" class="nav-item" role="presentation">
          <button
            id="received-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#received-transactions"
            type="button"
            role="tab"
            aria-controls="received-transactions"
            aria-selected="false"
          >
            Received
          </button>
        </li>
        <!-- Sent Transactions -->
        <li v-if="privateKey" class="nav-item" role="presentation">
          <button
            id="sent-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#sent-transactions"
            type="button"
            role="tab"
            aria-controls="sent-transactions"
            aria-selected="false"
          >
            Sent
          </button>
        </li>
        <!-- Mined Transactions -->
        <li v-if="privateKey" class="nav-item" role="presentation">
          <button
            id="mined-transactions-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#mined-transactions"
            type="button"
            role="tab"
            aria-controls="mined-transactions"
            aria-selected="false"
          >
            Mined
          </button>
        </li>
        <!-- Send Coins -->
        <li v-if="privateKey" class="nav-item" role="presentation">
          <button
            id="send-coins-tab"
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#send-coins"
            type="button"
            role="tab"
            aria-controls="send-coins"
            aria-selected="false"
          >
            Send Coins
          </button>
        </li>
      </ul>
    </div>
    <div class="tab-content" id="tab-content">
      <!-- Account Summary -->
      <div
        class="tab-pane fade show active"
        id="account-summary"
        role="tabpanel"
        aria-labelledby="account-summary-tab"
      >
        <div v-if="privateKey">
          <div class="row m-1 p-1">
            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
              <span class="text-info">Wallet Address</span>
            </div>
            <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
              <span class="text-muted">{{ publicKey }}</span>
            </div>
          </div>
          <div class="row m-1 p-1">
            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
              <span class="text-info">Balance</span>
            </div>
            <div class="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
              <span class="text-muted">{{ balance }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <span class="text-muted m-1 p-1">
            Currently, you don't have stored private key, You should either
            import a private key or generate in order to use the wallet.
          </span>
        </div>
      </div>
      <!-- Address Book -->
      <div
        v-if="privateKey"
        class="tab-pane fade"
        id="address-book"
        role="tabpanel"
        aria-labelledby="address-book-tab"
      >
        <p class="text-info m-1 p-1">
          <font-awesome-icon
            :icon="['fa', 'plus-square']"
            style="cursor: pointer"
            @click="launchAddressBookModal"
          ></font-awesome-icon>
          <span class="m-1 p-1">New Address</span>
        </p>
        <!-- Modal -->
        <div
          class="modal fade"
          id="address-book-modal"
          ref="addressModalDiv"
          tabindex="-1"
          aria-labelledby="address-book-modal-label"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-info" id="address-book-modal-label">
                  <font-awesome-icon :icon="['fa', 'book']"></font-awesome-icon>
                  <span class="m-1 p-1">New Address Book</span>
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="alias" class="form-label">Alias</label>
                  <input
                    type="text"
                    ref="aliasInput"
                    class="form-control"
                    id="alias"
                    aria-describedby="alias-help"
                  />
                  <div id="alias-help" class="form-text">
                    Alias for address book
                  </div>
                </div>
                <div class="mb-3">
                  <label for="public-address" class="form-label"
                    >Public Address</label
                  >
                  <input
                    type="text"
                    ref="addressInput"
                    class="form-control"
                    id="public-address"
                    maxlength="66"
                    minlength="66"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-sm btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-info"
                  @click="saveAddressBook"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Addresses -->
        <div class="m-1 p-1">
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col" class="text-nowrap"></th>
                  <th scope="col" class="text-nowrap">Alias</th>
                  <th scope="col" class="text-nowrap">Address</th>
                </tr>
              </thead>
              <tbody>
                <AddressBookComponent
                  v-for="address in addressBook"
                  :key="address.address"
                  :address-book="address"
                ></AddressBookComponent>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Unspent Transactions -->
      <div
        v-if="privateKey"
        class="tab-pane fade"
        id="unspent-transactions"
        role="tabpanel"
        aria-labelledby="unspent-transactions-tab"
      >
        <h6 class="text-info m-1 p-1">Unspent Transactions</h6>
        <UnspentTxOutComponent
          v-for="(unSpentTxOut, index) in unSpentTxOuts"
          :key="index"
          :unspent-tx-out="unSpentTxOut"
          class="mb-2"
        ></UnspentTxOutComponent>
      </div>
      <!-- Received Transactions -->
      <div
        v-if="privateKey"
        class="tab-pane fade"
        id="received-transactions"
        role="tabpanel"
        aria-labelledby="received-transactions-tab"
      >
        <h6>Received Transaction</h6>
      </div>
      <!-- Sent Transactions -->
      <div
        v-if="privateKey"
        class="tab-pane fade"
        id="sent-transactions"
        role="tabpanel"
        aria-labelledby="sent-transactions-tab"
      >
        <h6>Sent Transaction</h6>
      </div>
      <!-- Mined Transactions -->
      <div
        v-if="privateKey"
        class="tab-pane fade"
        id="mined-transactions"
        role="tabpanel"
        aria-labelledby="mined-transactions-tab"
      >
        <h6>Mined Transaction</h6>
      </div>
      <!-- Send Coins -->
      <div
        v-if="privateKey"
        class="tab-pane fade"
        id="send-coins"
        role="tabpanel"
        aria-labelledby="send-coins-tab"
      >
        <div v-if="balance > 0" class="row m-1 p-1">
          <h6 class="text-info m-1 p-1">Send Coins</h6>
          <div class="row g-3 align-items-center m-1 p-1">
            <div class="col-6">
              <select
                v-if="addressBook.length"
                ref="receiverAddressSelect"
                class="form-control"
              >
                <option
                  v-for="address in addressBook"
                  :key="address.address"
                  :value="address.address"
                >
                  {{ address.alias }} {{ address.address }}
                </option>
              </select>
              <input
                v-else
                id="receiverAddress"
                ref="receiverAddressInput"
                type="text"
                class="form-control"
                placeholder="Receiver Address..."
              />
            </div>
            <div class="col-2">
              <input
                type="number"
                ref="amountInput"
                class="form-control"
                placeholder="Amount..."
              />
            </div>
            <div class="col-auto">
              <button
                class="btn-primary btn-sm m-1 p-1"
                type="button"
                @click="sendCoins"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div v-else class="row m-1 p-1">
          <p class="text-danger">
            You don't have sufficient balance to send coins
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { MutationType } from "@/store/mutations";
import { useApi } from "@/composables/api";
import { Transaction, UnspentTxOut } from "@/types/transaction";
import { createTransaction, getCoinbaseTransaction } from "@/utils/crypto";
import {
  decodePrivatePEM,
  getKeyPairFromPrivate,
  getKeyPairFromPublic,
  getPrivatePEM,
  getPublicPEM,
} from "@/utils";
import UnspentTxOutComponent from "@/components/UnspentTxOutComponent.vue";
import AddressBookComponent from "@/components/AddressBookComponent.vue";
import { Modal } from "bootstrap";
import { AddressBook } from "@/types/AddressBook";

export default defineComponent({
  name: "Wallet",
  components: { UnspentTxOutComponent, AddressBookComponent },
  setup() {
    const store = useStore();

    // Refs
    // Send coin refs
    const receiverAddressInput = ref<null | HTMLInputElement>(null);
    const receiverAddressSelect = ref<null | HTMLSelectElement>(null);
    const amountInput = ref<null | HTMLInputElement>(null);

    // Import private key and address books
    const privateKeyInput = ref<null | HTMLInputElement>(null);
    const pemFileMimeType = ref("application/x-x509-ca-cert");
    const jsonFileInput = ref<null | HTMLInputElement>(null);
    const addressBookMimeType = ref("application/json");

    // Unspent txOuts of current stored private key
    const unSpentTxOuts = ref<UnspentTxOut[]>([]);

    // Address Book
    const aliasInput = ref<null | HTMLInputElement>(null);
    const addressInput = ref<null | HTMLInputElement>(null);
    const addressModalDiv = ref<null | HTMLDivElement>(null);

    // Computed properties
    const publicKey = computed(() => store.getters.publicKey);
    const privateKey = computed(() => store.state.privateKey);
    const balance = computed(() => {
      return unSpentTxOuts.value
        .map((txOut) => txOut.amount)
        .reduce((a, b) => a + b, 0);
    });
    const addressBook = computed(() => {
      if (privateKey.value) {
        // Excluding the self public address
        return store.state.addressBook.filter(
          (address) => address.address !== publicKey.value
        );
      }
      return store.state.addressBook;
    });
    const addressBookModal = computed(() => {
      if (addressModalDiv.value) {
        const modalElement = document.getElementById("address-book-modal");
        if (modalElement) {
          return new Modal(modalElement, { keyboard: true });
        }
      }
      return null;
    });

    // Lifecycle methods
    onMounted(() => {
      fetch();
    });

    // Methods
    const initializeWallet = () => {
      store.dispatch(ActionTypes.GenerateKeyPairs);
      fetch();
    };

    const importPrivateKey = () => {
      if (privateKeyInput.value) {
        privateKeyInput.value.click();
      }
    };

    const importJSONFile = () => {
      if (jsonFileInput.value) {
        jsonFileInput.value.click();
      }
    };

    const onPrivateKey = () => {
      if (privateKeyInput.value) {
        const files = privateKeyInput.value.files;
        if (files && files.length === 1) {
          const file = files[0];
          if (file.type === pemFileMimeType.value) {
            readPEMFile(file);
          } else {
            console.error(`Not PEM File: ${file.type}`);
          }
        }
      }
    };

    const onJSONFile = () => {
      if (jsonFileInput.value) {
        const files = jsonFileInput.value.files;
        if (files && files.length === 1) {
          const file = files[0];
          if (file.type === addressBookMimeType.value) {
            readJSONFile(file);
          } else {
            console.error(`Not JSON File: ${file.type}`);
          }
        }
      }
    };

    const readPEMFile = (file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        if (
          event.target &&
          typeof event.target.result === "string" &&
          event.target.result !== ""
        ) {
          try {
            const content = event.target.result;
            const privateDER = decodePrivatePEM(content);
            const keyPair = getKeyPairFromPrivate(privateDER);
            const pub = keyPair.getPublic();
            console.log("KeyPair from private");
            console.log(pub.inspect());
            const privateKey = keyPair.getPrivate().toString("hex");
            store.commit(MutationType.SetPrivateKey, privateKey);
            const keyPairFromPublic = getKeyPairFromPublic(publicKey.value);
            if (keyPairFromPublic) {
              const pub = keyPairFromPublic.getPublic();
              const validated = pub.validate();
              console.log("Public key validated: " + validated);
              console.log("KeyPair from public");
              console.log(keyPairFromPublic.inspect());
              const recoveredPublicKey = keyPairFromPublic.getPublic(
                true,
                "hex"
              );
              console.log(`Real public key: ${publicKey.value}`);
              console.log(`Rec. public key: ${recoveredPublicKey}`);
            }
            fetch();
          } catch (e) {
            console.dir(e);
          }
        }
      });
      reader.readAsBinaryString(file);
    };

    const readJSONFile = (file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        if (
          event.target &&
          typeof event.target.result === "string" &&
          event.target.result !== ""
        ) {
          const content = event.target.result;
          try {
            const addresses = JSON.parse(content);
            if (addresses && Array.isArray(addresses)) {
              addresses.forEach((address) => {
                store.commit(MutationType.InsertAddressBook, address);
              });
            }
          } catch (e) {
            console.dir(e);
          }
        }
      });
      reader.readAsBinaryString(file);
    };

    const exportPrivateKey = () => {
      if (privateKey.value) {
        const pem = getPrivatePEM(privateKey.value);
        downloadPEMFile(btoa(pem), "private.pem");
      }
    };

    const exportPublicKey = () => {
      if (privateKey.value) {
        const pem = getPublicPEM(privateKey.value);
        downloadPEMFile(btoa(pem), "public.pem");
      }
    };

    const downloadPEMFile = (content: string, fileName: string) => {
      const data = `data:${pemFileMimeType.value};base64,${content}`;
      const link = document.createElement("a");
      link.href = data;
      link.download = fileName;
      link.click();
    };

    const sendCoins = async () => {
      if (amountInput.value && store.getters.publicKey) {
        let receiverAddress = null;
        if (receiverAddressInput.value) {
          receiverAddress = receiverAddressInput.value.value;
        } else if (receiverAddressSelect.value) {
          receiverAddress = receiverAddressSelect.value.value;
        }
        if (receiverAddress === null) {
          return;
        }
        const amount = amountInput.value.value;
        const unSpentTxOuts = await useApi().fetchAddress(publicKey.value);
        const transactionPool = await useApi().fetchTransactionPool();
        const transaction: Transaction = createTransaction(
          receiverAddress,
          Number(amount),
          unSpentTxOuts,
          transactionPool
        );
        const validatedTransaction = await useApi().sendTransaction(
          transaction,
          unSpentTxOuts
        );
        const latestBlock = await useApi().fetchLatestBlock();
        await useApi().mineBlockWithTransaction([
          getCoinbaseTransaction(publicKey.value, latestBlock.index + 1),
          validatedTransaction,
        ]);
        await fetch();
      }
    };

    const fetch = async () => {
      if (privateKey.value) {
        unSpentTxOuts.value = await useApi().fetchAddress(publicKey.value);
      }
    };

    const launchAddressBookModal = () => {
      if (addressBookModal.value) {
        addressBookModal.value.show();
      }
    };

    const saveAddressBook = () => {
      if (aliasInput.value && addressInput.value) {
        const alias = aliasInput.value.value;
        const address = addressInput.value.value;
        const addressBook = new AddressBook(alias, address);
        store.commit(MutationType.InsertAddressBook, addressBook);
        if (addressBookModal.value) {
          aliasInput.value.value = "";
          addressInput.value.value = "";
          addressBookModal.value.hide();
        }
      }
    };

    const exportAddressBook = () => {
      const data = `data:${addressBookMimeType.value};text,${JSON.stringify(
        store.state.addressBook
      )}`;
      const link = document.createElement("a");
      link.href = data;
      link.download = "addressBook.json";
      link.click();
    };

    return {
      publicKey,
      privateKey,
      privateKeyInput,
      jsonFileInput,
      unSpentTxOuts,
      balance,
      receiverAddressInput,
      receiverAddressSelect,
      addressModalDiv,
      addressBookModal,
      addressBook,
      amountInput,
      pemFileMimeType,
      addressBookMimeType,
      aliasInput,
      addressInput,
      launchAddressBookModal,
      onPrivateKey,
      onJSONFile,
      initializeWallet,
      importPrivateKey,
      importJSONFile,
      exportPrivateKey,
      exportPublicKey,
      sendCoins,
      saveAddressBook,
      exportAddressBook,
    };
  },
});
</script>

<style scoped></style>
