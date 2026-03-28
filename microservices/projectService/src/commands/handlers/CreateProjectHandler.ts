import Project from "../models/Project";
import { v4 as uuid } from "uuid";

export const createProjectHandler = async (data: any) => {
  const projectId = uuid();

  const project = await Project.create({
    _id: projectId,
    ...data,
    status: "BACKLOG",
  });

  return project;
};