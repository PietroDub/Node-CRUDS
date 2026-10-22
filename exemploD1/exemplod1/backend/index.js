import "dotenv/config"; 
import express from "express";
//websocket
import {createServer} from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

import routesEquipamento from "./routes/routesEquipamento";

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
//suporte para importar arquivos json usando ESModules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");
const app = new express();
//comunicação entre front e back usar json
app.use(express.json());

app.use(cors({
    credentials: true, 
    origin: FRONTEND_URL
}));
//criar um servidor Http
const httpServer = createServer(app);

//obrigatoriamente o swagger deve vir antes das rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/routes", routesEquipamento);
httpServer.listen(PORT, ()=>{
    `Servidor rodando na porta ${PORT}`;
});