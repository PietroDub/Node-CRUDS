import express from "express";
import OrdemController from "../controllers/OrdemController.js";

const router = express.Router();

router.post("/", OrdemController.createOrdem);
router.get("/", OrdemController.getOrdens);
router.get("/:id", OrdemController.getOrdemById);
router.put("/:id", OrdemController.updateOrdem);
router.delete("/:id", OrdemController.deleteOrdem);
router.get("/status/:status", OrdemController.getOrdenByStatus);

export default router;