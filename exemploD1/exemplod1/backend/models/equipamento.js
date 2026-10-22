import mongoose from "../db/Conn.js";
const { Schema } = mongoose;
const equipamento = new Schema(
    {
        descricao: {
            type: String,
            required: true,
        },
        categoria: {
            type: String,
            required: true,
        },
        localizacao: {
            type: String,   
            required: true,
        },
        dataCadastro: {
            type: Date,
            required: true,
        },
        responsavel: {
            type: String,
            required: false,
        },
        status: {
        type: String,
        enum: ["DISPONIVEL", "EMPRESTADO"],
        default: "DISPONIVEL" }
    },
    { timestamps: true}
);
const Equipamento = mongoose.model('Equipamento',equipamentoSchema);
export default Equipamento;