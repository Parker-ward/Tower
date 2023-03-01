import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class EventsService {
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId)
    // .populate('creator', 'name picture')
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
    return (event)
  }

}

export const eventsService = new EventsService()