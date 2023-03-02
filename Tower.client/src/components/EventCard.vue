<template>
  <!-- <router-link class="text-light selectable"> -->
  <div class="EventCard card my-3">
    <img :src="event.coverImg" alt="">
    <div class="card-body text-center">
      <p><b>{{ event.name }}</b></p>
    </div>
  </div>
  <!-- </router-link> -->
</template>


<script>
import { Event } from '../models/Event.js';
export default {
  props: {
    event: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>