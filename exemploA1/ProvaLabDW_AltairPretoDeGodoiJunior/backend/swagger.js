import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API de equipamentos",
        description: "API para gerenciar equipamentos",
    },
    host: "localhost:5000",
    schemes: ["http"],
};

swaggerAutogen()("./swagger_output.json", ["./index.js"], doc);