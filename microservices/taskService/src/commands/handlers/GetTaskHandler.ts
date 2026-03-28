import Task from "../models/Task";

export const getTasksHandler = async () => {
  return Task.find();
};