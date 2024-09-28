import {Router} from "express";
const router = Router();
import { taskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.use(authMiddleware);
router.route("/").get(taskController.getAllTasks);
router.route("/").post(taskController.createTask);
router.route("/:taskId").put(taskController.updateTask);
router.route("/:taskId").delete(taskController.deleteTask);

export default router;