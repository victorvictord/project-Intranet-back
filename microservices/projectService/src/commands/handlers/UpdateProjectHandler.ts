import Project from "../models/Project";

export const updateProjectStatusHandler = async (id: string, status: string) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return project;
};