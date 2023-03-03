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


}

export const eventsService = new EventsService()