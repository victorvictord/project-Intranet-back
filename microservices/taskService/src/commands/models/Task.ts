import mongoose, { Schema } from "mongoose";
import { randomUUID } from "node:crypto";

const TaskWriteSchema = new Schema(
  {
    _id: String,
    title: String,
    description: String,
    status: String,
    priority: String,
    date: Date
  },
  { timestamps: true }
);

export default mongoose.model("Tasks", TaskWriteSchema);
