<template>
  <div id="nav" class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">XKMCoin</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/wallet" class="nav-link">
              <font-awesome-icon :icon="['fa', 'wallet']"></font-awesome-icon>
              Wallet
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blocks" class="nav-link">
              <font-awesome-icon :icon="['fa', 'cubes']"></font-awesome-icon>
              Blocks
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transaction-pool" class="nav-link">
              <font-awesome-icon
                :icon="['fa', 'file-invoice-dollar']"
              ></font-awesome-icon>
              Transaction Pool
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/status" class="nav-link">
              <font-awesome-icon :icon="['fa', 'server']"></font-awesome-icon>
              Status
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationBar",
});
</script>

<style scoped>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
