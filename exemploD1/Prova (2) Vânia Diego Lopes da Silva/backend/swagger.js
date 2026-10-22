import swaggerAutogen from "swagger-autogen";
const doc = {
    info:{
        title: 'API Prova Equipamento ',
        description: 'Documentação para a geração automática do swagger para prova'
    },
    host: 'localhost:5000',
    basePath: '/Equipamento',
}
//nome do arquivo que será gerado automaticamente
const outputFile = './swagger-output.json';
//caminho para as rotas
const endpointsFiles = [
  './routes/routesEquipamento',
];
swaggerAutogen()(outputFile, endpointsFiles, doc);