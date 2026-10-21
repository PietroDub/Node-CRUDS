import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../src/api";

export default function FormPostUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createUser({ name, email, password });
      console.log(response);

      toast.success("Usuário criado com sucesso");
      navigate("/requisition");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold text-orange-950">
        Form Post User
      </h1>
      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
        />
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
          disabled={loading}
          className="mt-6 w-full rounded-full bg-orange-600 py-3 font-medium text-white disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
