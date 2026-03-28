import Task from "../models/Task";
import { publishEvent } from "../../messaging/publisher";

export const updateTaskStatusHandler = async (id: string, status: string) => {
  const task = await Task.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  //  await publishEvent("TASK_UPDATED", task)

  return task;
};
