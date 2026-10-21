import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import userMiddleware from "../middleware/user.js";

const userRoutes = Router();

userRoutes.post("/", UserController.postUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/logout", userMiddleware, UserController.logout);
userRoutes.put("/:id", userMiddleware, UserController.updateUser);

export default userRoutes;