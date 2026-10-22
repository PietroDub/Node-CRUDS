import Equipamento from "../models/equipamento.js";

export default class EquipamentoController {
  static async cadastrarEquipamento(req, res) {
    const { descricao, categoria, localizacao } = req.body;

    if (!descricao || !categoria || !localizacao) {
      return res.status(422).json({
        message: "Descrição, categoria e localização são obrigatórias.",
      });
    }

    try {
      const equipamento = await Equipamento.create({
        descricao,
        categoria,
        localizacao,
      });

      return res.status(201).json({
        message: "Equipamento cadastrado com sucesso.",
        equipamento,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao cadastrar equipamento.",
        error: error.message,
      });
    }
  }

  static async listarEquipamentos(req, res) {
    try {
      const equipamentos = await Equipamento.find();

      if (equipamentos.length === 0) {
        return res.status(404).json({
          message: "Não há equipamentos cadastrados.",
        });
      }

      return res.status(200).json({ equipamentos });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar equipamentos.",
        error: error.message,
      });
    }
  }

  static async buscarPorStatus(req, res) {
    const { status } = req.params;

    if (status !== "Disponível" && status !== "Emprestado") {
      return res.status(422).json({ message: "Status inválido." });
    }

    try {
      const equipamentos = await Equipamento.find({ status });

      if (equipamentos.length === 0) {
        return res.status(404).json({
          message: "Nenhum equipamento encontrado com esse status.",
        });
      }

      return res.status(200).json({ equipamentos });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar equipamentos.",
        error: error.message,
      });
    }
  }

  static async realizarEmprestimo(req, res) {
    const { id } = req.params;
    const { responsavel } = req.body;

    if (!responsavel) {
      return res.status(422).json({
        message: "O nome do responsável é obrigatório.",
      });
    }

    try {
      const equipamento = await Equipamento.findById(id);

      if (!equipamento) {
        return res.status(404).json({
          message: "Equipamento não encontrado.",
        });
      }

      if (equipamento.status === "Emprestado") {
        return res.status(422).json({
          message: "O equipamento já está emprestado.",
        });
      }

      equipamento.status = "Emprestado";
      equipamento.responsavel = responsavel;
      await equipamento.save();

      return res.status(200).json({
        message: "Empréstimo realizado com sucesso.",
        equipamento,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao realizar empréstimo.",
        error: error.message,
      });
    }
  }
}
