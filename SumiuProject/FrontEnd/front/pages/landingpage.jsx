import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-semibold leading-tight text-orange-950">
        Encontre o seu melhor amigo, seu pai!
      </h1>

      <div className="mt-8 flex flex-col gap-3">
        <Link
          to="/user/register"
          className="rounded-full bg-orange-600 px-5 py-3 font-medium text-white"
        >
          Cadastrar usuário
        </Link>
        <Link
          to="/user/login"
          className="rounded-full bg-orange-600 px-5 py-3 font-medium text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
