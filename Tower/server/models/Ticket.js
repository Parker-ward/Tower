import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const TicketSchema = new Schema({

  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' }

}, defaultSchemaOptions)

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})