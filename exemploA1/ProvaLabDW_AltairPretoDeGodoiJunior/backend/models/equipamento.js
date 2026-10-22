import mongoose from "../config/conn.js";

const { Schema } = mongoose;

const equipamentoSchema = new Schema(
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
            required: true
        },
        dataCadastro: {
            type: Date,
            required: false,
        },
        responsavel: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["Disponivel", "Emprestado"],
            default: "Disponivel",
        },
    },
    { timestamps: true }, //timestamps: true: o Mongoose cria sozinho os campos createdAt e updatedAt.
);

const Equipamento = mongoose.model("Equipamento", equipamentoSchema);

export default Equipamento;
