import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/user.routes.js";
import ordemRoutes from "./routes/ordem.routes.js";

const swaggerDocument = require("./swagger-output.json");

const app = express();

const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRoutes);
app.use("/ordens", ordemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});