import { Router } from "express";
const router = Router();
import { userController } from "../controllers/user.controller.js";


router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/google").post(userController.googleLogin);

export default router;
