<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <!-- <div class="container-fluid">
    <div class="row">
      <div class="col-8 m-auto">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">name</label>
            <input required v-model="editable.name" type="text" class="form-control" id="name" name="name">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">bio</label>
            <input v-model="editable.bio" type="text" class="form-control" id="bio">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">picture</label>
            <input required v-model="editable.picture" type="url" class="form-control" id="picture">
          </div>
          <button class="btn btn-secondary" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div> -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10">
        <EventCard />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import EventCard from '../components/EventCard.vue'
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account };
      }
    });
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          const formData = editable.value;
          await accountService.editAccount(formData);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
