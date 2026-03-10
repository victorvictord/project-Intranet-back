import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    _id: String,
    title: String,
    description: String,
    status: String,
    priority: String,
    resposableId: String,
    accountId: String
  },
  { timestamps: true }
);

export default mongoose.model("Projects", ProjectSchema);
