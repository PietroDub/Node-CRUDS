import { Router } from "express";
import EquipamentoController from "../controllers/equipamento.controller.js";

const router = Router();

router.post("/", EquipamentoController.cadastrarEquipamento);
router.get("/", EquipamentoController.listarEquipamentos);
router.get("/status/:status", EquipamentoController.buscarPorStatus);
router.patch("/:id/emprestimo", EquipamentoController.realizarEmprestimo);

export default router;
