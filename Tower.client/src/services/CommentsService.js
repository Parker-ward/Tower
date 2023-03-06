import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { Comment } from "../models/Comment.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    AppState.comments = []
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('getting events comments', res.data)
    const comments = res.data.map(c => new Comment(c))
    AppState.comments = comments
  }

  async createComment(commentData) {
    const res = await api.post('/api/comments', commentData)
    logger.log('posting comment', res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async removeComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('removeing comment', res.data)
    const commentIndex = AppState.comments.findIndex(c => c.commentId == commentId)
    if (commentIndex !== -1) {
      AppState.comments.splice(commentIndex, 1)
    }
  }
}


export const commentsService = new CommentsService()