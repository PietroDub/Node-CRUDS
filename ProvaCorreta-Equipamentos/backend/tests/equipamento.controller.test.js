import test from "node:test";
import assert from "node:assert/strict";
import EquipamentoController from "../controllers/equipamento.controller.js";
import Equipamento from "../models/equipamento.js";

function criarResposta() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("model define status, data e responsável automaticamente", () => {
  const equipamento = new Equipamento({
    descricao: "Tablet",
    categoria: "Informática",
    localizacao: "Armário 1",
  });

  assert.equal(equipamento.status, "Disponível");
  assert.equal(equipamento.responsavel, null);
  assert.ok(equipamento.dataCadastro instanceof Date);
});

test("cadastro exige os três campos recebidos do usuário", async () => {
  const req = { body: { descricao: "Projetor", categoria: "Vídeo" } };
  const res = criarResposta();

  await EquipamentoController.cadastrar(req, res);

  assert.equal(res.statusCode, 422);
});

test("cadastro rejeita status informado pelo usuário", async () => {
  const req = {
    body: {
      descricao: "Projetor",
      categoria: "Vídeo",
      localizacao: "Sala 1",
      status: "Emprestado",
    },
  };
  const res = criarResposta();

  await EquipamentoController.cadastrar(req, res);

  assert.equal(res.statusCode, 422);
  assert.match(res.body.message, /status/);
});

test("cadastro cria equipamento somente com os campos permitidos", async (t) => {
  const originalCreate = Equipamento.create;
  t.after(() => {
    Equipamento.create = originalCreate;
  });

  Equipamento.create = async (dados) => ({ _id: "1", ...dados });
  const req = {
    body: {
      descricao: "  Notebook  ",
      categoria: "  Informática ",
      localizacao: " Armário 2 ",
    },
  };
  const res = criarResposta();

  await EquipamentoController.cadastrar(req, res);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body.equipamento, {
    _id: "1",
    descricao: "Notebook",
    categoria: "Informática",
    localizacao: "Armário 2",
  });
});

test("listagem vazia devolve 200 e um array vazio", async (t) => {
  const originalFind = Equipamento.find;
  t.after(() => {
    Equipamento.find = originalFind;
  });

  Equipamento.find = () => ({ sort: async () => [] });
  const res = criarResposta();

  await EquipamentoController.listarTodos({}, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.equipamentos, []);
});

test("filtro rejeita status fora do enum", async () => {
  const req = { params: { status: "Quebrado" } };
  const res = criarResposta();

  await EquipamentoController.listarPorStatus(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body.statusPermitidos, ["Disponível", "Emprestado"]);
});

test("filtro válido consulta todos os equipamentos daquele status", async (t) => {
  const originalFind = Equipamento.find;
  t.after(() => {
    Equipamento.find = originalFind;
  });

  let filtroRecebido;
  Equipamento.find = (filtro) => {
    filtroRecebido = filtro;
    return { sort: async () => [{ status: "Disponível" }] };
  };
  const req = { params: { status: "Disponível" } };
  const res = criarResposta();

  await EquipamentoController.listarPorStatus(req, res);

  assert.deepEqual(filtroRecebido, { status: "Disponível" });
  assert.equal(res.body.equipamentos.length, 1);
});

test("empréstimo altera equipamento disponível", async (t) => {
  const originalUpdate = Equipamento.findOneAndUpdate;
  t.after(() => {
    Equipamento.findOneAndUpdate = originalUpdate;
  });

  const atualizado = {
    _id: "507f1f77bcf86cd799439011",
    status: "Emprestado",
    responsavel: "Ana",
  };
  let argumentos;
  Equipamento.findOneAndUpdate = async (...recebidos) => {
    argumentos = recebidos;
    return atualizado;
  };

  const req = {
    params: { id: "507f1f77bcf86cd799439011" },
    body: { responsavel: " Ana " },
  };
  const res = criarResposta();

  await EquipamentoController.realizarEmprestimo(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.equipamento.status, "Emprestado");
  assert.deepEqual(argumentos[0], {
    _id: "507f1f77bcf86cd799439011",
    status: "Disponível",
  });
  assert.equal(argumentos[1].$set.responsavel, "Ana");
  assert.equal(argumentos[2].new, true);
});

test("empréstimo repetido devolve conflito", async (t) => {
  const originalUpdate = Equipamento.findOneAndUpdate;
  const originalExists = Equipamento.exists;
  t.after(() => {
    Equipamento.findOneAndUpdate = originalUpdate;
    Equipamento.exists = originalExists;
  });

  Equipamento.findOneAndUpdate = async () => null;
  Equipamento.exists = async () => ({ _id: "507f1f77bcf86cd799439011" });

  const req = {
    params: { id: "507f1f77bcf86cd799439011" },
    body: { responsavel: "Ana" },
  };
  const res = criarResposta();

  await EquipamentoController.realizarEmprestimo(req, res);

  assert.equal(res.statusCode, 409);
});

test("empréstimo de equipamento inexistente devolve 404", async (t) => {
  const originalUpdate = Equipamento.findOneAndUpdate;
  const originalExists = Equipamento.exists;
  t.after(() => {
    Equipamento.findOneAndUpdate = originalUpdate;
    Equipamento.exists = originalExists;
  });

  Equipamento.findOneAndUpdate = async () => null;
  Equipamento.exists = async () => null;

  const req = {
    params: { id: "507f1f77bcf86cd799439011" },
    body: { responsavel: "Ana" },
  };
  const res = criarResposta();

  await EquipamentoController.realizarEmprestimo(req, res);

  assert.equal(res.statusCode, 404);
});
