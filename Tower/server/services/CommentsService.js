import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async deleteComment(commentId, requestorId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    if (comment.creatorId.toString() != requestorId) {
      throw new Forbidden('Not you comment bruh')
    }
    await comment.remove()
    return 'Comment was deleted homie'
  }
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId })
      .populate('creator', 'name picture')
    return comments
  }
  async createComment(commentData) {
    const comment = await (await dbContext.Comments.create(commentData)).populate('creator', 'name picture')
    return (comment)
  }

}

export const commentsService = new CommentsService()