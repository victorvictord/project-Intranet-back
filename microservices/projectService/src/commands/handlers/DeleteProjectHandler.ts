import Project from "../models/Project";

export const DeleteTaskStatusHandler = async (id: string) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { status: "deleted" },
    { new: true }
  );

  return project;
};