<template>
  <div>
    <!-- <router-link class="text-light selectable":to="{ name: 'Events', params: { eventsId: event.id } }"> -->
    <div class="EventCard card my-3">
      <img :src="event.coverImg" alt="">
      <div class="card-body text-center">
        <p><b>{{ event.name }}</b></p>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>


<script>
import { Event } from '../models/Event.js';
export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>