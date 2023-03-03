import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async getTicketsById(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('get tickets', res.data)
    // AppState.tickets = 
  }
}

export const ticketsService = new TicketsService()