<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-md-12 text-center fs-2">
        <img class="img-cover"
          src="https://media.istockphoto.com/id/1412242466/photo/rave-party.jpg?b=1&s=170667a&w=0&k=20&c=F4j8vTIkKIx61SUy1puWhW7QYbW0s0v_WREk6CyBYPo="
          alt="cover image">
        TOWER.... Where all your events start!
      </div>
    </div>
  </div>

  <!-- NOTE Filter my catagory -->
  <div class="container">
    <div class="row my-4">
      <div class="col-12 p-4 mb-3">
        <h1 class="text-dark">Events</h1>
      </div>
      <div class="col-10 m-auto">
        <div class="bg-primary rounded p-3 d-flex justify-content-around">
          <button @click="changeFilterType('')" class="btn btn-outline-light">All</button>
          <button @click="changeFilterType('digital')" class="btn btn-outline-light">Digital</button>
          <button @click="changeFilterType('concert')" class="btn btn-outline-light">Concert</button>
          <button @click="changeFilterType('sport')" class="btn btn-outline-light">Sports</button>
          <button @click="changeFilterType('convention')" class="btn btn-outline-light">Convention</button>
        </div>
      </div>
      <div class="col-md-3" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div v-for="e in events" :key="e.id" class="col-md-3">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js';
import { onMounted, computed, ref } from 'vue';
import { eventsService } from '../services/EventsService.js'
import EventCard from '../components/EventCard.vue';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const filterType = ref('')
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error, "getting AllEvents")
      }
    }

    onMounted(() => {
      getAllEvents()
    })
    return {
      // NOTE Filter catagory
      events: computed(() => {
        if (!filterType.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filterType.value)
        }
      }),

      changeFilterType(t) {
        filterType.value = t
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss"></style>
