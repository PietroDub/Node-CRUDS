import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import { createServer } from "http";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();

const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
};

app.use(express.json());
app.use(cors(corsOptions));

// criar um servidor HTTP
const httpServer = createServer(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRoutes);