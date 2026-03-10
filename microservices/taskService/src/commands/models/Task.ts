import mongoose, { Schema } from "mongoose";

const TaskWriteSchema = new Schema(
  {
    _id: String,
    projectId: String,
    title: String,
    description: String,
    status: String,
    priority: String
  },
  { timestamps: true }
);

export default mongoose.model("Tasks", TaskWriteSchema);
