<template>
  <div>
    <router-link class="text-dark selectable" :to="{ name: 'Events', params: { eventId: event.id } }">
      <div class="EventCard card my-3">
        <img :src="event.coverImg" alt="">
      </div>
      <div class="card-body text-center">
        <p><b>{{ event.name }}</b></p>
      </div>
    </router-link>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue'
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
export default {
  props: {
    event: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const eventId = route.params.eventId
    return {
      account: computed(() => AppState.account),


    }
  }
}
</script>


<style lang="scss" scoped></style>