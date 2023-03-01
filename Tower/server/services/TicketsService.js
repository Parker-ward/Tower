
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
  async createATicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)

    if (event.isCanceled) {
      throw new Forbidden('Event has been canceled')
    }
    event.capacity -= 1
    await event.save()
    const ticket = await dbContext.Ticket.create(ticketData)
    await ticket.populate('profile', 'name picture')
    return ticket
  }
  async getMyTickets(accountId) {
    const events = await dbContext.Ticket.find({ accountId })
      .populate({
        path: 'event',
        populate: {
          path: 'creator',
          select: 'name picture'
        }
      })
    return events
  }

}

export const ticketsService = new TicketsService()