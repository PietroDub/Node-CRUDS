# Solução de referência da prova

Esta API implementa somente o que o enunciado pede: cadastro de equipamento, listagem, filtro por status e realização de empréstimo. Não há usuário, autenticação, WebSocket, e-mail ou front-end.

## Estrutura

```text
backend/
├── config/conn.js
├── controllers/equipamento.controller.js
├── models/equipamento.js
├── routes/equipamento.routes.js
├── tests/equipamento.controller.test.js
├── app.js
├── index.js
├── swagger.js
└── swagger-output.json
```

## Como executar

1. Copie `.env.example` para `.env`.
2. Ligue o MongoDB local.
3. Execute `npm install`.
4. Execute `npm run swagger` se alterar as rotas.
5. Execute `npm start`.
6. Abra `http://localhost:5000/docs`.

Durante o desenvolvimento, `npm run dev` usa o modo `--watch` do próprio Node.js.

## Rotas

| Método | Rota | Corpo | Resultado |
| --- | --- | --- | --- |
| POST | `/equipamentos` | `descricao`, `categoria`, `localizacao` | Cadastra com data atual, status `Disponível` e responsável vazio |
| GET | `/equipamentos` | - | Lista todos |
| GET | `/equipamentos/status/Disponível` | - | Filtra pelo status |
| PATCH | `/equipamentos/:id/emprestimo` | `responsavel` | Troca `Disponível` por `Emprestado` |

Para testar as validações sem MongoDB, execute `npm test`.

## Decisões importantes

- `dataCadastro`, `status` e `responsavel` têm valores definidos pelo sistema, não pelo usuário.
- A listagem vazia retorna `200` com array vazio e mensagem; a requisição funcionou, apenas não encontrou registros.
- Status inválido retorna `400`.
- ID inexistente retorna `404`.
- Um segundo empréstimo retorna `409`, porque existe conflito com o estado atual do equipamento.
- `findOneAndUpdate` filtra também por `status: "Disponível"`; isso impede dois empréstimos simultâneos do mesmo equipamento.
