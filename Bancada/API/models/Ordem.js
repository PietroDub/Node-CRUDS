import mongoose from "../db/conn.js";

const { Schema } = mongoose;

const ordemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["recebida", "em conserto", "concluida", "cancelada"],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Ordem = mongoose.model("Ordem", ordemSchema);

export default Ordem;