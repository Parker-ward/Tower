
export class Event {
  constructor(data) {
    this.name = data.name
    this.coverImg = data.coverImg
    this.description = data.description
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate || new Date().toLocaleDateString('en-Us')
    this.isCanceled = data.isCanceled
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}