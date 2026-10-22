import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API de Empréstimo de Equipamentos",
    description: "Cadastro, consulta e empréstimo de equipamentos.",
    version: "1.0.0",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    NovoEquipamento: {
      descricao: "Notebook Dell Latitude",
      categoria: "Notebook",
      localizacao: "Laboratório 3",
    },
    Emprestimo: {
      responsavel: "Maria da Silva",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
