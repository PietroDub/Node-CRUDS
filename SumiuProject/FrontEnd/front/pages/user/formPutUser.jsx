import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../src/api";

export default function FormPutUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateUser(userId, { name, email, password });
      toast.success("Usuário atualizado com sucesso");
      console.log(response);
      navigate("/requisition");
    } catch (error) {
      toast.error("Erro ao atualizar usuário");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}
