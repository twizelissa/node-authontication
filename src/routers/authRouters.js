import authController from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", authController.login);

export default authRouter;