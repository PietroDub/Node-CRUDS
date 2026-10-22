import mongoose from "mongoose";

export async function conectarBanco(uri = process.env.MONGO_URI) {
  if (!uri) {
    throw new Error("A variável MONGO_URI não foi definida.");
  }

  await mongoose.connect(uri);
  console.log("Conectado ao MongoDB");
}

export default mongoose;
