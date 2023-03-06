<template>
  <div class="container mt-3 border border-dark" v-if="event">
    <div class="row justify-content-center">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="">
          <img :src="event.coverImg" alt="" class="img-fluid border border-dark mt-2 mb-2">
        </div>
        <div class="ms-2">
          <p><b>NAME:</b> {{ event.name }}</p>
          <p> <b>DESCRIPTION:</b> {{ event.description }}</p>
          <p><b>LOCATION:</b> {{ event.location }}</p>
          <p><b>DATE:</b> {{ event.startDate }}</p>
          <p><b>CAPACITY:</b> {{ event.capacity }}</p>
          <p></p>
        </div>
      </div>
      <div class="d-flex justify-content-end mb-2">

        <button v-if="!event.isCanceled && account.id && !foundTickets || !event.capacity" @click="attendEvent()"
          :disabled="event.isCanceled || !event.capacity" class="btn btn-success">Attend Event</button>

        <button v-if="account.id && foundTickets" @click="removeTicketToEvent(foundTickets.ticketId)"
          class="btn btn-success">Return Ticket</button>
        <button @click="cancelEvent(event.id)" v-if="account.id == event.creatorId && !event.isCanceled"
          class="btn btn-danger">
          Cancel
        </button>

        <div v-else-if="event.isCanceled" class="bg-danger rounded text-center p-3">
          <i class="mdi mdi-lock"></i>
          <span>
            Canceled
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <p><b>Who is attending:</b></p>
        <div v-for="t in tickets" class="col-4">
          <img class="img-fluid rounded" :src="t.picture" :alt="t.name + ' picture'" :title="t.name">
          <p><b>{{ t.name }}</b></p>
        </div>
      </div>
    </div>
  </div>

  <Comments />

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <p><b>Comments:</b></p>
        <div v-for="c in comments" class="col-3">

          <CommentCard :comment="c" />

        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { watchEffect, computed } from 'vue';
import Comments from '../components/Comments.vue'
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js'
import { router } from '../router.js';
import { logger } from '../utils/Logger.js';
import CommentCard from '../components/CommentCard.vue';

export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        const eventId = route.params.eventId;
        await eventsService.getEventById(eventId);
      }
      catch (error) {
        Pop.error;
        router.push("/");
      }
    }
    async function getTicketsById() {
      try {
        const eventId = route.params.eventId;
        await ticketsService.getTicketsById(eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getCommentsByEventId() {
      try {
        const eventId = route.params.eventId;
        await commentsService.getCommentsByEventId(eventId);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    watchEffect(() => {
      if (route.params.eventId) {
        getEventById();
        getTicketsById();
        getCommentsByEventId();
      }
    });
    return {

      account: computed(() => AppState.account),
      event: computed(() => AppState.event),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      foundTickets: computed(() => AppState.tickets.find(t => t.id == AppState.account.id)),
      async attendEvent() {
        try {
          await ticketsService.attendEvent({ eventId: route.params.eventId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },

      async removeTicketToEvent(ticketId) {
        try {
          if (await Pop.confirm("Are you sure?", "Ok"))
            await ticketsService.removeTicketToEvent(ticketId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async cancelEvent(eventId) {
        try {
          await eventsService.cancelEvent(eventId);
        }
        catch (error) {
          Pop.error(error, "Cancel Event");
        }
      }
    };
  },
  components: { Comments, CommentCard }
}
</script>


<style lang="scss" scoped></style>