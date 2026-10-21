# Mission: Reconstruir a arquitetura

## Why
O Pietro já escreveu três projetos no mesmo formato — Bancada, Sumiu e o [Todo](https://github.com/PietroDub/Todo-Main) — e quer montar o próximo do zero sem adivinhar pacote nem ordem de arquivo. Quando isso estiver firme, um diretório vazio vira API e, depois, front, na mesma sequência das três.

## Success looks like
- A partir de uma pasta vazia, ele cria a API, instala os pacotes do núcleo e sobe um servidor que conecta no Mongo.
- Ele cria os arquivos nesta ordem: conexão, model, controller, rotas, `index.js`.
- Ele sobe o Vite, um cliente HTTP e as telas na mesma ordem das rotas da API.
- Ele separa o esqueleto de CRUD (Bancada) do módulo de usuário com cookie (Sumiu e Todo).

## Constraints
- Português. Ele escreve o código; a aula traz um passo e o guia impresso traz a sequência inteira.
- React com JSX, no Vite. Sem TypeScript.
- O vocabulário de desenho fica: módulo, interface, seam, adapter.

## Out of scope
- Socket, e-mail, gráficos e voz, até usuário e um recurso estarem montados.
- Reescrever os três projetos nesta sessão.
- Testes automatizados.
