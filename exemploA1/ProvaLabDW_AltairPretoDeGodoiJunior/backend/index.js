import "dotenv/config";
import express from "express";
import "./config/conn.js";
import equipamentoRoutes from "./routes/equipamento.routes.js";
import swaggerUi from "swagger-ui-express";
import {createRequire} from "module";
import cors from "cors";

const app = express();
app.use(express.json());

const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger_output.json");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/equipamentos", equipamentoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API tá funfando" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});