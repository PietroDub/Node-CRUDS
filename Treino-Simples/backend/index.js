import "dotenv/config";
import express from "express";
import "./config/conn.js";
import equipamentoRoutes from "./routes/equipamento.routes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/equipamentos", equipamentoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
