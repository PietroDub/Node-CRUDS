import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/", UserController.postUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/logout", UserController.logout);

export default userRoutes;