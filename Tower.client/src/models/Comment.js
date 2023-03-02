export class Comment {
  constructor(data) {
    this.body = data.body
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.isAttending = data.isAttending
    this.creator = data.creator
  }
}