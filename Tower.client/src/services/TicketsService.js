import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "../models/Ticket.js"

class TicketsService {

  async getTicketsById(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('get tickets', res.data)
    // AppState.tickets = 
  }

  async attendEvent(eventData) {
    const res = await api.post('api/tickets', eventData)
    logger.log('getting a ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
    AppState.myEvents.push(new MyEvents(res.data))
  }
}

export const ticketsService = new TicketsService()