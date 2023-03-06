<template>
  <div class="CommentCard card my-3">
    {{ comment.body }}

  </div>
</template>




<script>
import { Comment } from '../models/Comment.js';

export default {
  props: {
    comment: { type: Comment, required: true }
  },
  setup() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped></style>