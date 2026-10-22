import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API de Equipamentos",
    description: "API para cadastro e empréstimo de equipamentos",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routesFile = ["./index.js"];

swaggerAutogen()(outputFile, routesFile, doc);
