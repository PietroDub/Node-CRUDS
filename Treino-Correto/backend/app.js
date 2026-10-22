import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import equipamentoRoutes from "./routes/equipamento.routes.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/equipamentos", equipamentoRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "API de equipamentos em execução." });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

export default app;
