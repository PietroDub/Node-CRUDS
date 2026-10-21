import { useEffect, useState } from "react";
import {
  deleteRequisition,
  getAllRequisitions,
  getRequisition,
  updateRequisition,
} from "../src/api";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [requisitions, setRequisitions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRequisitions = async () => {
      const response = await getAllRequisitions();
      setRequisitions(response.requisition.data);
    };
    fetchRequisitions();
  }, []);

  const handleDelete = async (id, requisition) => {
    const response = await deleteRequisition(id);
    if (response.status === 200) {
      toast.success("Requisição deletada com sucesso");
      setRequisitions(
        requisitions.filter((requisition) => requisition._id !== id),
      );
    } else {
      toast.error("Erro ao deletar requisição");
      console.error(response);
    }
  };
  const handleEdit = async (id, requisition) => {
    navigate(`/requisition/edit/${id}`, { state: { requisition } });
    if (response.status === 200) {
      toast.success("Requisição editada com sucesso");
      setRequisitions(
        requisitions.filter((requisition) => requisition._id !== id),
      );
    } else {
      toast.error("Erro ao editar requisição");
      console.error(response);
    }
  };
  const handleView = async (id) => {
    navigate(`/requisition/${id}`, { state: { requisition } });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Requisições!</h1>

          <ul>
            {requisitions.map((requisition) => (
              <li key={requisition._id}>
                {requisition.title}
                <p>{requisition.description}</p>
                <p>{requisition.dadName}</p>
                <p>{requisition.dadDescription}</p>
                <p>{requisition.dadAge}</p>
                <p>{requisition.dadLastAddress}</p>
                <button onClick={() => handleView(requisition._id)}>
                  Ver mais
                </button>
                <button
                  onClick={() => handleEdit(requisition._id, requisition)}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(requisition._id, requisition)}
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
