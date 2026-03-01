import { Router } from "express";
import { createTaskHandler } from "../handlers/CreateTaskHandler";
import { updateTaskStatusHandler } from "../handlers/UpdateTaskStatusHandler";

const router = Router();

router.post("/tasks", async (req, res) => {
  const result = await createTaskHandler(req.body);
  res.json(result);
});

router.patch("/tasks/:id/status", async (req, res) => {
  const result = await updateTaskStatusHandler(
    req.params.id,
    req.body.status
  );
  res.json(result);
});

export default router;
