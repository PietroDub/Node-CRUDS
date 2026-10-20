import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API MY IDK",
        description:
          "lab dsw - API documentation with Swagger",
    },
    host: "localhost:5000",
    basepath: "/",
};

const outputFile = "./swagger-output.json";
const routesFile = ["./index.js"];

swaggerAutogen()(outputFile, routesFile, doc);