import { Router } from "express";
import { UsersController } from "../controllers/user.controller";

const router = Router();

router.get("/:id", UsersController.getById);
router.get("/", UsersController.getAll);

export default router;
