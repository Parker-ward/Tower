
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
  async deleteTicket(ticketId, requestorId) {
    const ticket = await dbContext.Ticket.findById(ticketId)
    const event = await eventsService.getEventById(ticket.eventId)
    if (!ticket) {
      throw new BadRequest('Invalid Id')
    }
    if (ticket.accountId.toString() !== requestorId) {
      throw new BadRequest('No No No...')
    }
    await ticket.remove()
    event.capacity += 1
    await event.save()
    return 'You no longer have a ticket bruh'
  }
  async getEventTickets(eventId) {
    const ticketHolders = await dbContext.Ticket.find({ eventId })
      .populate('profile', 'name picture')
    return ticketHolders
  }
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