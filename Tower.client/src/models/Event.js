
export class Event {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.coverImg = data.coverImg
    this.description = data.description
    this.location = data.location
    this.capacity = data.capacity || 0
    this.startDate = new Date(data.startDate).toLocaleDateString('en-Us')
    this.isCanceled = data.isCanceled
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.type = data.type
  }
}