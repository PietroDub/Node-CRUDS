import { useEffect, useState } from "react";
import { deleteRequisition, getAllRequisitions } from "../src/api";
import { Link, useNavigate } from "react-router-dom";

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
  const handleEdit = (id, requisition) => {
    navigate(`/requisition/edit/${id}`, { state: { requisition } });
  };
  const handleView = (id, requisition) => {
    navigate(`/requisition/${id}`, { state: { requisition } });
  };

  return (
    <section className="hero text-center">
      <div className="container">
        <div className="hero-content">
          <h1 className="text-4xl font-semibold text-orange-950">Requisições!</h1>
          <Link to="/requisition/create" className="mt-6 inline-block font-medium text-orange-700 underline">
            Nova requisição
          </Link>

          <ul className="mt-8 divide-y divide-orange-200">
            {requisitions.map((requisition) => (
              <li key={requisition._id} className="py-5">
                <p className="text-xl text-orange-950">{requisition.title}</p>
                <p className="mt-1 text-stone-700">{requisition.description}</p>
                <p>{requisition.dadName}</p>
                <p>{requisition.dadDescription}</p>
                <p>{requisition.dadAge}</p>
                <p>{requisition.dadLastAddress}</p>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleView(requisition._id, requisition)}
                    className="rounded-full bg-orange-600 px-3 py-1 text-sm text-white"
                  >
                    Ver mais
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(requisition._id, requisition)}
                    className="rounded-full border border-orange-600 px-3 py-1 text-sm text-orange-800"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(requisition._id, requisition)}
                    className="rounded-full border border-orange-900 px-3 py-1 text-sm text-orange-950"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
