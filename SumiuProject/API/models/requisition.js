import mongoose from "mongoose";

const { Schema } = mongoose;

const requisitionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        dadName: {
            type: String,
            required: true,
            trim: true
        },
        dadDescription: {
            type: String,
            trim: true
        },
        dadAge: {
            type: Number,
            min: 0,
            validate: {
                validator: value => value == null || Number.isInteger(value),
                message: "A idade deve ser um número inteiro não negativo."
            }
        },
        dadLastAddress: {
            type: String,
            trim: true
        },
        motherInformation: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

const Requisition = mongoose.model("Requisition", requisitionSchema);
export default Requisition;
