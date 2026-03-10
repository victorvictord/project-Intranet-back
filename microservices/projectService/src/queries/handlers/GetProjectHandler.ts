import Project from "../../commands/models/Project";

export const getProjectsHandler = async () => {
  return Project.find();
};