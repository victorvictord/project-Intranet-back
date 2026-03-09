import Task from "../models/Task";
import { publishEvent } from "../../messaging/publisher";

export const DeleteTaskStatusHandler = async (id: string) => {
  const task = await Task.findByIdAndUpdate(
    id,
    { status: "deleted" },
    { new: false }
  );

  //  await publishEvent("TASK_UPDATED", task)

  return task;
};
