import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    AppState.comments = []
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('getting events comments', res.data)


  }
}


export const commentsService = new CommentsService()