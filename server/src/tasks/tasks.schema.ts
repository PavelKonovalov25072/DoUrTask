import * as mongoose from "mongoose"

export const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    title: {
      type: String,
      required: true,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
    },
    isItDone: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
)

export interface Task extends mongoose.Document {
  _id: string;
  title: string;
  body: string;
  date: Date;
  isItDone: Boolean;
}