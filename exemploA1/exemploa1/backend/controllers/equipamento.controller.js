import Equipamento from "../models/equipamento.js";

export default class EquipamentoController {
    //POST /equipamentos
    static async cadastrarEquipamento(req, res) {
        const { descricao, categoria, localizacao } = req.body
        if (!descricao || !categoria || !localizacao) {
            return res
                .status(422)
                .json({ error: "Todos os campos são obrigatórios" });
        }
        try {
            const equipamento = await Equipamento.create({
                descricao,
                categoria,
                localizacao,
            });
            res.status(201).json({ message: "Equipamento cadastrado com sucesso", equipamento });
        } catch (error) {
            res
                .status(500)
                .json({ message: "Erro ao cadastrar equipamento", error: error.message });
        }
    }
    // GET /equipamentos
    static async listarEquipamentos(req, res) {
        try {
            const equipamento = await Equipamento.find({
                descricao: req.descricao,
                categoria: req.categoria,
                localizacao: req.localizacao,
        })
            return res.status(200).json({ equipamento });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Erro ao listar os equipamentos", error: error.message });
        }
    }

    // GET /equipamentos por status/:status
    static async obterEquipamentos(req, res) {
        try {
            const equipamento = await Equipamento.findOne({
                status: req.status,
            });

            if (!equipamento) {
                return res.status(404).json({ message: "Equipamento não encontrado" });
            }

            return res.status(200).json({ equipamento });
        } catch (error) {
            if (error.name === "CastError") {
                return res.status(400).json({ message: "ID do equipamento inválido" });
            }
            return res
                .status(500)
                .json({ message: "Erro ao obter a equipamento", error: error.message });
        }
    }

    // PUT /Emprestimo equipamento/:id
    static async emprestarEquipamento(req, res) {
        const {equipamento, responsavel, status } = req.body;
        if(!equipamento || !responsavel){
            return res
                .status(422)
                .json({ error: "Todos os campos são obrigatórios" });
        }

        if (status == "Emprestado") {
            return res.status(404).json({ message: "Equipamento não está disponível!" });
        }
        try {
            const equipamento = await Equipamento.find({ responsavel }).sort({ createdAt: -1 });
            return res.status(200).json({ equipamento });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Erro ao listar as equipamentos", error: error.message });
        }

    }
}

