import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js"
export const EventSchema = new Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { ...basicStringType },
  type: { ...basicStringType },
  isCanceled: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

}, defaultSchemaOptions)
