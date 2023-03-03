<template>
  <router-link class="text-dark" :to="{ name: 'Comments', params: { eventId: event.id } }">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          {{ comments.body }}
        </div>
      </div>
    </div>

  </router-link>
</template>


<script>
import { AppState } from '../AppState.js';

export default {
  props: {
    event: { type: Object, required: true }
  },
  setup() {
    return {
      comments: computed(() => AppState.comments)
    }
  }
}
</script>


<style lang="scss" scoped></style>