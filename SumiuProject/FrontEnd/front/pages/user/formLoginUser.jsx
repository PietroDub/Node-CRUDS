import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../src/api";

export default function FormLoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({ email, password });
    if (response.status === 200) {
      toast.success("Login realizado com sucesso");
      navigate("/requisition");
    } else {
      console.error(response);
      toast.error("Erro ao realizar login");
    }
  };
  return (
    <div>
      <h1 className="text-center text-4xl font-semibold text-orange-950">Login</h1>
      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-orange-600 py-3 font-medium text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
