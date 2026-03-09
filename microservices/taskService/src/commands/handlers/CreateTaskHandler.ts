import Task from "../models/Task";
import { v4 as uuid } from "uuid";
import { publishEvent } from "../../messaging/publisher";

export const createTaskHandler = async (data: any) => {
  const taskId = uuid();

  const task = await Task.create({
    _id: taskId,
    ...data,
    status: "BACKLOG",
  });
/*
  publishEvent("TASK_CREATED", task);
*/
  return task;
};
