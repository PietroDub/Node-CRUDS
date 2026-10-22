import mongoose from "../config/conn.js";

const { Schema } = mongoose;

const equipamentoSchema = new Schema({
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
    default: Date.now,
  },
  responsavel: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["Disponível", "Emprestado"],
    default: "Disponível",
  },
});

const Equipamento = mongoose.model("Equipamento", equipamentoSchema);

export default Equipamento;
