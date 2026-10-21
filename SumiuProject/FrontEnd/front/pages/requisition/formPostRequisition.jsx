import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequisition } from "../../src/api";

export default function FormPostRequisition() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dadName, setDadName] = useState("");
  const [dadDescription, setDadDescription] = useState("");
  const [dadAge, setDadAge] = useState("");
  const [dadLastAddress, setDadLastAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createRequisition({
        title,
        description,
        dadName,
        dadDescription,
        dadAge,
        dadLastAddress,
      });
      console.log(response);

      toast.success("Requisição criada com sucesso");
      navigate("/requisition");
    } catch (error) {
      toast.error("Erro ao criar requisição");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
      />
      <input
        type="text"
        placeholder="Dad Name"
        value={dadName}
        onChange={(e) => setDadName(e.target.value)}
        className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
      />
      <input
        type="text"
        placeholder="Dad Description"
        value={dadDescription}
        onChange={(e) => setDadDescription(e.target.value)}
        className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
      />
      <input
        type="number"
        placeholder="Dad Age"
        value={dadAge}
        onChange={(e) => setDadAge(e.target.value)}
        className="mt-4 w-full border border-orange-200 bg-white px-3 py-2 outline-none focus:border-orange-600"
      />
      <input
        type="text"
        placeholder="Dad Last Address"
        value={dadLastAddress}
        onChange={(e) => setDadLastAddress(e.target.value)}
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
