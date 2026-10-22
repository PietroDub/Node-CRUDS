import { Router } from "express";
import EquipamentoController from "../controllers/equipamento.controller.js";

const router = Router();

router.post(
  "/",
  /*
    #swagger.tags = ['Equipamentos']
    #swagger.summary = 'Cadastrar equipamento'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/NovoEquipamento' }
    }
    #swagger.responses[201] = {
      description: 'Equipamento cadastrado com os campos automáticos preenchidos.'
    }
    #swagger.responses[422] = { description: 'Dados obrigatórios ausentes ou campos automáticos informados.' }
  */
  EquipamentoController.cadastrar,
);

router.get(
  "/",
  /*
    #swagger.tags = ['Equipamentos']
    #swagger.summary = 'Listar todos os equipamentos'
    #swagger.responses[200] = { description: 'Lista de equipamentos; pode ser vazia.' }
  */
  EquipamentoController.listarTodos,
);

router.get(
  "/status/:status",
  /*
    #swagger.tags = ['Equipamentos']
    #swagger.summary = 'Listar equipamentos por status'
    #swagger.parameters['status'] = {
      in: 'path',
      required: true,
      type: 'string',
      enum: ['Disponível', 'Emprestado']
    }
    #swagger.responses[200] = { description: 'Equipamentos que possuem o status informado.' }
    #swagger.responses[400] = { description: 'Status inválido.' }
  */
  EquipamentoController.listarPorStatus,
);

router.patch(
  "/:id/emprestimo",
  /*
    #swagger.tags = ['Equipamentos']
    #swagger.summary = 'Realizar empréstimo de um equipamento disponível'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Emprestimo' }
    }
    #swagger.responses[200] = { description: 'Empréstimo realizado.' }
    #swagger.responses[400] = { description: 'ID inválido.' }
    #swagger.responses[404] = { description: 'Equipamento não encontrado.' }
    #swagger.responses[409] = { description: 'Equipamento já emprestado.' }
    #swagger.responses[422] = { description: 'Responsável não informado.' }
  */
  EquipamentoController.realizarEmprestimo,
);

export default router;
