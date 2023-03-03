<template>
  <!-- <router-link :to="{ name: 'Events', params: { eventId: event.id } }"> -->


  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea required type="text" name="description" v-model="editable.description" class="form-control"
        id="description" rows="3"></textarea>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <textarea required type="text" name="name" v-model="editable.name" class="form-control" id="name"
        rows="1"></textarea>
    </div>
    <div class="mb-3">
      <label for="coverImg" class="form-label">Cover Img</label>
      <input required type="text" v-model="editable.coverImg" class="form-control" id="coverImg" placeholder="CoverImg..."
        name="coverImg">
    </div>
    <div class="mb-3">
      <label for="startDate" class="form-label">Start Date</label>
      <input required type="date" v-model="editable.startDate" class="form-control" id="startDate" placeholder=""
        name="startDate">
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Location</label>
      <input required type="text" v-model="editable.location" class="form-control" id="location" placeholder="location"
        name="location">
    </div>
    <div class="mb-3">
      <label for="capacity" class="form-label">Capacity</label>
      <input required type="number" v-model="editable.capacity" class="form-control" id="capacity" placeholder="number"
        name="capacity">
    </div>
    <div class="mb-3">
      <label for="type" class="form-label">Type of Event</label>
      <input required type="text" v-model="editable.type" class="form-control" id="type" placeholder="" name="type">
    </div>
    <div>
      <button type="submit" class="btn btn-primary">
        {{ editable.id ? 'Save Changes' : 'Submit' }}
      </button>
    </div>
  </form>
  <!-- </router-link> -->
</template>


<script>
import { ref } from 'vue'
import { router } from '../router.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    // event: { type: Object, required: true }
  },
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          const event = editable.value.id
          await eventsService.createEvent(editable.value) // you have to get your id from this line, look at gregslist create a car
          //FIXME look at gregslist vue component and service
          editable.value = {}
          // FIXME the event editable will not have an id on it
          if (event?.id) {
            router.push({ name: 'Event', params: { eventId: event.id } })
          }
        } catch (error) {
          Pop.error(error, '[Submit Event]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>