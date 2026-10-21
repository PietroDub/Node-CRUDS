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
      <h1>Form Post User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}
