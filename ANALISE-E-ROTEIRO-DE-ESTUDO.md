# Análise das provas e roteiro de estudo

## O que realmente está no enunciado

A prova pede uma API em Node.js, Express, MongoDB e Mongoose para um único recurso: `Equipamento`. O núcleo avaliado é:

1. Model com tipos, obrigatoriedade, `enum` e valores automáticos.
2. Controller com validação, consultas e respostas HTTP.
3. Routes ligando método e URL ao controller.
4. Conexão com MongoDB e inicialização do Express.
5. Swagger para testar todas as funcionalidades.

Não há pedido de front-end, usuário, login, JWT, cookie, middleware de autenticação, WebSocket, e-mail ou voz.

## Contrato correto da API

| Requisito | Método e rota | Entrada | Regra principal |
| --- | --- | --- | --- |
| Cadastrar | `POST /equipamentos` | `descricao`, `categoria`, `localizacao` | `status`, `dataCadastro` e `responsavel` são automáticos |
| Listar | `GET /equipamentos` | nenhuma | retorna todos ou array vazio com mensagem |
| Filtrar | `GET /equipamentos/status/:status` | status na URL | aceita apenas `Disponível` e `Emprestado` |
| Emprestar | `PATCH /equipamentos/:id/emprestimo` | `responsavel` no body | só altera equipamento existente e disponível |

## Primeira tentativa

Pasta: `Prova (2) Vânia Diego Lopes da Silva-20261022T001715Z-1-001`.

Problemas principais:

- O controller importa `Tarefa`, mas usa `Equipamento`, que não foi importado.
- Lê `req.user.id` mesmo sem autenticação e sem middleware no enunciado.
- O model importa `../db/Conn.js`, mas o arquivo real é `conn.js`; isso falha em sistemas que diferenciam maiúsculas de minúsculas.
- O schema é criado na variável `equipamento`, mas o model usa `equipamentoSchema`, que não existe.
- `dataCadastro` está como obrigatória e não tem `default`, contrariando o cadastro automático.
- O status usa textos diferentes dos pedidos no enunciado.
- `getAll` tenta ler `req.equipamento.id`, aplica filtros booleanos incorretos e retorna a variável errada.
- `getByStatus` usa `req.body` em uma consulta GET, tenta chamar `.find()` em uma string e não possui rota registrada.
- `realizarEmprestimo` não usa ID, não atualiza documento e também não possui rota registrada.
- A rota não tem extensão `.js`, o import no `index.js` não inclui extensão e o projeto está em ES Modules.
- O `package.json` não declara `"type": "module"` embora use `import`.
- O prefixo real é `/routes`, enquanto o Swagger declara `/Equipamento`.
- Há servidor HTTP/WebSocket e CORS de front-end sem necessidade para esta prova.

Conclusão: essa tentativa não inicia corretamente e não atende às questões 3, 4 e 5.

## Segunda tentativa

Pasta: `ProvaLabDW_AltairPretoDeGodoiJunior`.

Acertos:

- Estrutura de pastas clara.
- Cadastro usa os três campos pedidos e responde com `201`.
- Model tem `enum` e `default` para status.
- Express, conexão, rota base e Swagger estão montados.

Problemas principais:

- `dataCadastro` não tem `default: Date.now`; `timestamps` cria `createdAt`, mas não preenche o campo pedido.
- O status está como `Disponivel`, sem o acento usado pelo enunciado.
- A listagem filtra por `req.descricao`, `req.categoria` e `req.localizacao`, que não existem; deveria usar `Equipamento.find()`.
- A busca por status usa `findOne`, então retornaria no máximo um item, e usa `req.status` em vez de `req.params.status`.
- A rota `GET /:id` aponta para o método que deveria filtrar status, criando um contrato diferente do enunciado.
- O método de empréstimo redeclara `equipamento` no mesmo escopo, consulta em vez de atualizar e nunca é ligado a uma rota.
- O cadastro não trata explicitamente a tentativa de enviar status, data ou responsável.
- O CORS é importado, mas não é configurado. Isso não impede o Swagger, porém é código sem uso.

Conclusão: é uma base melhor, mas só o cadastro está próximo do esperado; filtro e empréstimo ainda não funcionam.

## Como o Todo ajuda e onde parar

Do Todo, vale estudar o fluxo `index -> routes -> middleware -> controller -> model -> MongoDB` e o uso de `enum`, `default`, validação, `req.params`, `req.body`, `find`, `findById` e atualização.

Para esta prova, pare antes dos módulos extras:

- autenticação com JWT e cookie;
- usuários relacionados por `ObjectId`;
- recuperação de senha e e-mail;
- Socket.IO e chat;
- gráficos;
- reconhecimento de voz;
- React e Vite.

## Ordem de construção durante a prova

1. `package.json` com `"type": "module"` e dependências.
2. `.env` com `PORT` e `MONGO_URI`.
3. conexão Mongoose.
4. model com todos os campos e defaults.
5. controller, começando pelo cadastro.
6. routes.
7. `app.js` ou `index.js` com `express.json()` e `app.use()`.
8. Swagger.
9. testar caso feliz e erro de cada rota.

## Checklist de revisão

- Todo `import` aponta para um arquivo existente e usa a capitalização correta.
- Toda variável usada foi declarada.
- Todo método do controller está ligado a uma rota.
- `req.body` recebe JSON; `req.params` recebe valores da URL.
- `find()` lista vários documentos; `findOne()` devolve apenas um.
- Atualização usa `new: true` para devolver o documento atualizado.
- Valores automáticos ficam no model e não são confiados ao cliente.
- O status do model, do controller, da rota e do Swagger tem a mesma grafia.
- `express.json()` vem antes das rotas.
- O Swagger mostra e permite testar as quatro operações pedidas.
