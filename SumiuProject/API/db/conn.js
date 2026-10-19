import mongoose from "mongoose";

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
};

main().catch((err) => console.error("Erro ao conectar!"));

export default mongoose;