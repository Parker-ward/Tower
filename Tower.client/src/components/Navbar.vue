<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center p-2">
        <img alt="logo"
          src="https://images.unsplash.com/photo-1578575436955-ef29da568c6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGlja2V0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          height="45" class="rounded" />
      </div>
      <span class="p-3">TOWER</span>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div v-if="account.id" class="btn text-success lighten-30 selectable text-uppercase">

      <button data-bs-toggle="modal" data-bs-target="#createForm">Create Event</button>
    </div>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase">
            My Events
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>

  </nav>
</template>

<script>
import { AppState } from '../AppState.js';
import { computed } from 'vue'
import Login from './Login.vue'

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
