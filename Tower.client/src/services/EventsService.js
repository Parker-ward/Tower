import { Event } from "../models/Event.js"
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
class EventsService {

  async getAllEvents() {
    const res = await api.get('api/events')
    const events = res.data
    logger.log(res.data);
    AppState.events = events
  }


  async getEventById(eventId) {
    AppState.event = null
    const res = await api.get('api/events/' + eventId)
    AppState.event = new Event(res.data)
  }

  async createEvent(eventData) {
    const res = await api.post('/api/events', eventData)
    logger.log("created event", res.data)
    AppState.events.push(res.data)
    return res.data
    // logger.log('[My Event]', res.data)
    // let createdEvent = new Event(res.data)
    // AppState.events = [createdEvent, ...AppState.events]
  }

  async cancelEvent(eventId) {
    const res = await api.delete('api/events/' + eventId)
    let i = AppState.events.findIndex(e => e.id == eventId)
    if (i != -1) {
      AppState.events.splice(i, 1, res.data)
    }

  }

  clearEvents() {
    AppState.events = []
  }

}

export const eventsService = new EventsService()