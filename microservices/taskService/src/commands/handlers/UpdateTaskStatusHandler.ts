import Task from "../models/Task";
import { RabbitEventBus } from "../../events/EventBus";
import { publishEvent } from "../../messaging/rabbit";

export const updateTaskStatusHandler = async (id: string, status: string) => {
  const task = await Task.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  publishEvent("TASK_UPDATED", task)

  return task;
};
