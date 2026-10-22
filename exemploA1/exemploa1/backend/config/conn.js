import mongoose from "mongoose";

const conectar = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado ao MongoDB");
};

conectar().catch((error) => {
  console.error("Erro ao conectar ao MongoDB:", error);
});

export default mongoose;