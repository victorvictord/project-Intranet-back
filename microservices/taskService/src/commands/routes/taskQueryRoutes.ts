import { Router } from "express";
import { getTasksHandler } from "../handlers/GetTaskHandler";

const router = Router();

router.get("/tasks", async (_, res) => {
  const tasks = await getTasksHandler();
  res.json(tasks);
});

export default router;
