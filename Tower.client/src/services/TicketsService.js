import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "../models/Ticket.js"


class TicketsService {

  async getTicketsById(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('get tickets', res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }

  // async getMyTickets(eventId) {
  //   AppState.myEvents = []
  //   const res = await api.get('api/event/' + eventId + '/ticket')
  //   logger.log('getting tickets', res.data)
  //   AppState.myEvents = res.data.map(m => new myEvents(m))
  // }


  async attendEvent(eventData) {
    const res = await api.post('api/tickets', eventData)
    logger.log('getting a ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
    AppState.myEvents.push(new Ticket(res.data))
  }

  async removeTicketToEvent(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('removeing ticket', res.data)
    const ticketIndex = AppState.myEvents.findIndex(t => t.ticketId == ticketId)
    if (ticketIndex !== -1) {
      AppState.myEvents.splice(ticketIndex, 1)
    }

  }
}

export const ticketsService = new TicketsService()