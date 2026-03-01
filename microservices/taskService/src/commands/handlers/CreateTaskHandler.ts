import Task from "../models/Task";
import { RabbitEventBus } from "../../events/EventBus";
import { publishEvent } from "../../messaging/rabbit";
import { v4 as uuid } from "uuid";

export const createTaskHandler = async (data: any) => {
  const taskId = uuid();

  const task = await Task.create({
    _id: taskId,
    ...data,
    status: "BACKLOG",
  });

  publishEvent("TASK_CREATED", task);

  return task;
};
