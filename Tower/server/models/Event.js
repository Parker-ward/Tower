import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js"
export const EventSchema = new Schema({

  name: { type: String, required: true, minLength: 3, maxLength: 200 },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, min: 0, },
  startDate: { type: Date, required: true },
  type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'] },
  isCanceled: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

}, defaultSchemaOptions)

EventSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})
