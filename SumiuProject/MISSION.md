# Mission: Front simples do Sumiu

## Why
O Pietro quer as telas do Sumiu no ar, ligadas na API que ele já escreveu: cadastro, login e uma tela inicial com a lista de requisições. Ele escreve o código. A ajuda é um passo de cada vez, até essas três telas funcionarem de verdade.

## Success looks like
- Um formulário de cadastro cria um usuário em `POST /users`.
- Um formulário de login autentica em `POST /users/login` e a sessão segue para a tela inicial.
- A tela inicial mostra a lista de requisições com as informações que a API devolver.

## Constraints
- Passo a passo. Uma tela, ou um pedaço de tela, por vez.
- React com JSX, no Vite que já está em `FrontEnd/front`.
- Visual simples. Sem biblioteca de componentes.
- O vocabulário da API fica: User e Requisition.

## Out of scope
- TypeScript, testes e um redesign visual.
- Editar, apagar ou criar requisição na interface, até a lista existir.
- Reescrever a API inteira antes da primeira tela.
