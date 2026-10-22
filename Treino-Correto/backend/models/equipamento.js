import mongoose from "mongoose";

const { Schema } = mongoose;

export const STATUS_EQUIPAMENTO = ["Disponível", "Emprestado"];

const equipamentoSchema = new Schema(
  {
    descricao: {
      type: String,
      required: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    localizacao: {
      type: String,
      required: true,
      trim: true,
    },
    dataCadastro: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    responsavel: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: STATUS_EQUIPAMENTO,
      default: "Disponível",
    },
  },
  {
    versionKey: false,
  },
);

const Equipamento = mongoose.model("Equipamento", equipamentoSchema);

export default Equipamento;
