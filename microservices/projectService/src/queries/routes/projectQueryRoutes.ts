import { Router } from "express";
import { getProjectsHandler } from "../handlers/GetProjectHandler";

const router = Router();

router.get("/projects", async (_, res) => {
  const projects = await getProjectsHandler();
  res.json(projects);
});

export default router;