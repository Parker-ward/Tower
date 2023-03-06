<template>
  <div class="CommentCard card my-3">
    {{ comment.body }}
    <img class="img-fluid rounded comment_img" :src="comment.creator.picture" alt="">
    <p><b>
        {{ comment.creator.name }}
      </b></p>
    <button v-if="account.id" @click="removeComment(comment.id)" class="btn btn-danger">Remove Comment</button>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),

      async removeComment(commentId) {
        try {
          logger.log(commentId)
          if (await Pop.confirm('Are you sure?'))
            await commentsService.removeComment(commentId)
        }
        catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

    }
  }
}
</script>


<style lang="scss" scoped>
.comment_img {
  height: 100px;
  width: 100px;
}
</style>