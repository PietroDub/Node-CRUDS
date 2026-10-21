import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Encontre o seu melhor amigo, seu pai!</h1>

      <Link to="/user">Cadastrar usuário</Link>
      <Link to="/user/login">Login</Link>
    </div>
  );
}
