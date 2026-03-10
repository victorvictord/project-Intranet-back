import { Router } from "express";
import { createProjectHandler } from "../handlers/CreateProjectHandler";
import { updateProjectStatusHandler } from "../handlers/UpdateProjectHandler";

const router = Router();

router.post("/tasks", async (req, res) => {
  const result = await createProjectHandler(req.body);
  res.json(result);
});

router.patch("/tasks/:id/status", async (req, res) => {
  const result = await updateProjectStatusHandler(
    req.params.id,
    req.body.status
  );
  res.json(result);
});

export default router;
