import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateRequisition } from "../../src/api";

export default function FormPutRequisition() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dadName, setDadName] = useState("");
  const [dadDescription, setDadDescription] = useState("");
  const [dadAge, setDadAge] = useState("");
  const [dadLastAddress, setDadLastAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: requisitionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateRequisition(requisitionId, {
        title,
        description,
        dadName,
        dadDescription,
        dadAge,
        dadLastAddress,
      });
      console.log(response);

      toast.success("Requisição atualizada com sucesso");
      navigate("/requisition");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dad Name"
          value={dadName}
          onChange={(e) => setDadName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dad Description"
          value={dadDescription}
          onChange={(e) => setDadDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Dad Age"
          value={dadAge}
          onChange={(e) => setDadAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dad Last Address"
          value={dadLastAddress}
          onChange={(e) => setDadLastAddress(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </>
  );
}
