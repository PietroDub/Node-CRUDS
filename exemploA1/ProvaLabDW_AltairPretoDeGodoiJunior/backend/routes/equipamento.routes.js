import {Router} from 'express';
import EquipamentoController from '../controllers/equipamento.controller.js';

const router = Router();

router.post('/', EquipamentoController.cadastrarEquipamento);
router.get('/', EquipamentoController.listarEquipamentos);
router.get('/:id', EquipamentoController.obterEquipamentos);

export default router;