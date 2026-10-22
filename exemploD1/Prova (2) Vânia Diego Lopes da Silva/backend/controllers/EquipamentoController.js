import Tarefa from "../models/equipamento.js";
import {Types} from "mongoose";
export default class EquipamentoController{
    static async Create(req, res){
        const{descricao, localizacao, categoria} = req.body;
        const usuarioLogado = req.user.id;
        if(!descricao || !localizacao || !categoria)
        {
            return res.status(422).json({message: "Todos os dados exceto o responsável são obrigatórios"});
        }
        try {
            const equipamento = new Equipamento({
                descricao,
                localizacao,
                categoria,
            });
            const novoEquipamento = await equipamento.save();
            res.status(200).json({message:"Equipamento criado com sucesso", equipamento});
            return;
        } catch (error) {
            return res.status(500).json({message:"Problema ao criar um equipamento", error});
        }
    }//fim create
    static async getAll(req, res){
        const equipamento = req.equipamento.id;
        try {
            const encontrados = await Equipamento.find({
                    $or:[
                        {descricao: true},
                        {localizacao: true}
                    ]
                });
                
                if ( encontrados == 0 || encontrados == false) {
                    return res.status(404).json({message: "Nenhum equipamento adicionado"})
                }
            
            return res.status(200).json({message:"Buscar os equipamentos foi um sucesso", equipamento});
        } catch (error) {
            return res.status(500).json({message:"Erro ao buscar equipamentos", error});
        }

    }//fim getAll

     static async getByStatus(req, res){
        const {status} = req.body;
        try {
            const statusDesejado = await status.find({
                if (statusDesejado = status) {return status;}
                })
                
                .sort({ createdAt: -1 });
                if ( encontrados == 0 || encontrados == false) {
                    return res.status(404).json({message: "Nenhum equipamento adicionado"})
                }
            
            return res.status(200).json({message:"Buscar os equipamentos foi um sucesso", equipamento});
        } catch (error) {
            return res.status(500).json({message:"Erro ao buscar equipamentos", error});
        }

    }

    static async realizarEmprestimo(req, res){
        const {QuemEmpresta} = req.equipamento.descricao

        try {
            const encontrados = await equipamento.find({
                    if(status = [DISPONIVEL] )
                        {status = [EMPRESTADO], responsavel = QuemEmpresta}
                    
                });
                
                if ( encontrados == 0 || encontrados == false) {
                    return res.status(404).json({message: "Nenhum equipamento encontrado"})
                }
            
            return res.status(200).json({message:"Vinculo de responsável foi um sucesso", equipamento});
        } catch (error) {
            return res.status(500).json({message:"Erro ao vincular responsavel", error});
        }

    }
}