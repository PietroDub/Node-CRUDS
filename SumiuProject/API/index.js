import "dotenv/config";
import express from "express";
import cors from "cors";
import { createRequire } from "module";
import { createServer } from "http";
import userRoutes from "./routes/user.routes.js";
import swaggerDocument from "./swagger-output.json";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import connectDB from "./db/conn.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();

const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// criar um servidor HTTP
const httpServer = createServer(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

// verificar se a conexão com o banco de dados foi estabelecida
await connectDB();

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

