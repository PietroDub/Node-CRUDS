import { Types } from "mongoose";
import Equipamento, {
  STATUS_EQUIPAMENTO,
} from "../models/equipamento.js";

function responderErro(res, error, mensagem) {
  if (error.name === "ValidationError") {
    return res.status(422).json({
      message: "Dados inválidos.",
      error: error.message,
    });
  }

  return res.status(500).json({
    message: mensagem,
    error: error.message,
  });
}

export default class EquipamentoController {
  static async cadastrar(req, res) {
    const { descricao, categoria, localizacao } = req.body;
    const camposAutomaticos = ["status", "dataCadastro", "responsavel"];
    const camposInformados = camposAutomaticos.filter((campo) =>
      Object.prototype.hasOwnProperty.call(req.body, campo),
    );

    if (camposInformados.length > 0) {
      return res.status(422).json({
        message: `Não informe campos automáticos no cadastro: ${camposInformados.join(", ")}.`,
      });
    }

    if (
      typeof descricao !== "string" ||
      typeof categoria !== "string" ||
      typeof localizacao !== "string" ||
      !descricao.trim() ||
      !categoria.trim() ||
      !localizacao.trim()
    ) {
      return res.status(422).json({
        message: "Descrição, categoria e localização são obrigatórias.",
      });
    }

    try {
      const equipamento = await Equipamento.create({
        descricao: descricao.trim(),
        categoria: categoria.trim(),
        localizacao: localizacao.trim(),
      });

      return res.status(201).json({
        message: "Equipamento cadastrado com sucesso.",
        equipamento,
      });
    } catch (error) {
      return responderErro(res, error, "Erro ao cadastrar equipamento.");
    }
  }

  static async listarTodos(_req, res) {
    try {
      const equipamentos = await Equipamento.find().sort({ dataCadastro: -1 });

      if (equipamentos.length === 0) {
        return res.status(200).json({
          message: "Não há equipamentos registrados.",
          equipamentos: [],
        });
      }

      return res.status(200).json({ equipamentos });
    } catch (error) {
      return responderErro(res, error, "Erro ao listar equipamentos.");
    }
  }

  static async listarPorStatus(req, res) {
    const { status } = req.params;

    if (!STATUS_EQUIPAMENTO.includes(status)) {
      return res.status(400).json({
        message: "Status inválido.",
        statusPermitidos: STATUS_EQUIPAMENTO,
      });
    }

    try {
      const equipamentos = await Equipamento.find({ status }).sort({
        dataCadastro: -1,
      });

      if (equipamentos.length === 0) {
        return res.status(200).json({
          message: `Não há equipamentos com status ${status}.`,
          equipamentos: [],
        });
      }

      return res.status(200).json({ equipamentos });
    } catch (error) {
      return responderErro(
        res,
        error,
        "Erro ao buscar equipamentos por status.",
      );
    }
  }

  static async realizarEmprestimo(req, res) {
    const { id } = req.params;
    const { responsavel } = req.body;

    if (typeof responsavel !== "string" || !responsavel.trim()) {
      return res.status(422).json({
        message: "O nome do responsável é obrigatório.",
      });
    }

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de equipamento inválido." });
    }

    try {
      const equipamento = await Equipamento.findOneAndUpdate(
        { _id: id, status: "Disponível" },
        {
          $set: {
            status: "Emprestado",
            responsavel: responsavel.trim(),
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (equipamento) {
        return res.status(200).json({
          message: "Empréstimo realizado com sucesso.",
          equipamento,
        });
      }

      const equipamentoExiste = await Equipamento.exists({ _id: id });

      if (!equipamentoExiste) {
        return res.status(404).json({ message: "Equipamento não encontrado." });
      }

      return res.status(409).json({
        message: "O equipamento já está emprestado.",
      });
    } catch (error) {
      return responderErro(res, error, "Erro ao realizar empréstimo.");
    }
  }
}
