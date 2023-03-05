<template>
  <form @submit.prevent="createComment()">
    <div class="mb-3">
      <label for="comment" class="form-label">Comment</label>
      <textarea required type="body" name="body" v-model="editable.body" class="form-control" id="comment"
        rows="5"></textarea>
    </div>
    <div>
      <button @click="resetInput" type="submit" class="ms-2 d-flex justify-content-end btn btn-primary">Add
        Comment</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createComment() {
        try {
          const commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)
          editable.value = commentData
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>