# Arquitetura dos três projetos — recursos

## Knowledge

- [npm-init](https://docs.npmjs.com/cli/v11/commands/npm-init)
  Cria o `package.json`. Use para: o primeiro comando da pasta da API.
- [Installing Express](https://expressjs.com/en/starter/installing.html) e [Hello world](https://expressjs.com/en/starter/hello-world.html)
  `npm install express`, `express()`, `listen`. Use para: o servidor mínimo antes de qualquer model.
- [Routing](https://expressjs.com/en/guide/routing.html) e [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
  `app.use`, `Router`, ordem dos middlewares. Use para: montar rotas e o cookie.
- [Mongoose connections](https://mongoosejs.com/docs/connections.html) e [Models](https://mongoosejs.com/docs/models.html)
  `mongoose.connect` e `mongoose.model`. Use para: `db/conn.js` e os models.
- [dotenv](https://github.com/motdotla/dotenv)
  `import "dotenv/config"` na primeira linha. Use para: `PORT`, `MONGO_URI`, `JWT_SECRET`.
- [cors](https://expressjs.com/en/resources/middleware/cors.html) e [cookie-parser](https://expressjs.com/en/resources/middleware/cookie-parser.html)
  Origem do front e leitura de `req.cookies`. Use para: o login que devolve cookie.
- [node-argon2](https://github.com/ranisalt/node-argon2) e [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  Hash de senha e assinatura do token. Use para: o módulo de usuário do Sumiu e do Todo.
- [Guia do Vite](https://vite.dev/guide/)
  `npm create vite@latest`, `npm run dev`, porta 5173. Use para: criar o front.
- [Instalação do Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite)
  `@tailwindcss/vite` e `@import "tailwindcss"`. Use para: o CSS que os três fronts já usam.
- [Routing (React Router)](https://reactrouter.com/start/declarative/routing)
  `BrowserRouter` e `Routes`. Use para: uma tela por chamada da API.
- [Axios](https://axios-http.com/docs/intro)
  `axios.create`, `baseURL`, `withCredentials`. Use para: `src/api.js`.
- [Describing the UI (React)](https://react.dev/learn/describing-the-ui)
  Componente e JSX. Use para: a página que chama uma função de `api.js`.

## Wisdom (Communities)

- [Reactiflux](https://www.reactiflux.com/)
  Discord ligado à documentação do React. Use para: travar num formulário e ouvir alguém de fora deste chat.
- [r/reactjs](https://www.reddit.com/r/reactjs/)
  Código React com moderação. Use para: mostrar um componente curto.

## Gaps

- Não há um texto único, de fonte primária, que descreva esta pasta (`conn`, model, controller, routes, `index`) como uma sequência. O guia daqui é a compressão dos três repositórios em cima dos docs acima.
