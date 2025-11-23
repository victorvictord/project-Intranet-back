import { Router } from "express";
import { MessagesController } from "../controllers/message.controller";

const router = Router();

router.get("/", MessagesController.list);
router.post("/", MessagesController.create);

export default router;
