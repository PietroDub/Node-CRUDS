import mongoose from "../db/conn.js";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

const User = mongoose.model("User", userSchema);

export default User;