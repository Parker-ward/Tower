import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, } from "../utils/Errors.js"

class EventsService {
  async cancelEvent(eventId, requestorId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId.toString() != requestorId) {
      throw new Forbidden('You are NOT allow to cancel this Event you noob')
    }
    await event.save()
    return event
  }
  async editEvent(eventId, eventData, requestorId) {
    const foundEvent = await this.getEventById(eventId)

    if (foundEvent.isCanceled) {
      throw new BadRequest('This event has been canceled')
    }
    if (foundEvent.creatorId.toString() != requestorId) {
      throw new Forbidden("You can't do that man")
    }
    foundEvent.description = eventData.description || foundEvent.description
    foundEvent.name = eventData.name || foundEvent.name
    foundEvent.startDate = eventData.startDate || foundEvent.startDate

    await foundEvent.save()
    return foundEvent
  }
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId)
      .populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid Event ID')
    }
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Events.find()
    return events
  }

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')

    return (event)
  }

}

export const eventsService = new EventsService()