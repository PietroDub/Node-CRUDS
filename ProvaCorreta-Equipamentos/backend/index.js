import "dotenv/config";
import app from "./app.js";
import { conectarBanco } from "./config/conn.js";

const PORT = process.env.PORT || 5000;

async function iniciarServidor() {
  await conectarBanco();

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/docs`);
  });
}

iniciarServidor().catch((error) => {
  console.error("Não foi possível iniciar a API:", error.message);
  process.exitCode = 1;
});
