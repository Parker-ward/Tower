import { Schema } from "mongoose"
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js"

export const CommentSchema = new Schema({

  body: { ...basicStringType, maxLength: 1000 },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true, default: true },
  isAttending: { type: Boolean, required: false },

}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})