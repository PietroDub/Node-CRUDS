import { Link, useLocation, useParams } from "react-router-dom";

export default function RequisitionView() {
  const { id } = useParams();
  const { state } = useLocation();
  const requisition = state?.requisition;

  if (!requisition) {
    return (
      <p className="text-center text-orange-950">
        Não há dados desta requisição nesta navegação.{" "}
        <Link to="/requisition" className="underline">
          Voltar para a lista
        </Link>
      </p>
    );
  }

  return (
    <article className="text-center">
      <h1 className="text-4xl font-semibold text-orange-950">
        {requisition.title}
      </h1>
      <p className="mt-4 text-stone-700">{requisition.description}</p>
      <p className="mt-2">{requisition.dadName}</p>
      <p>{requisition.dadDescription}</p>
      <p>{requisition.dadAge}</p>
      <p>{requisition.dadLastAddress}</p>
      <div className="mt-6 flex flex-col gap-3">
        <Link
          to={`/requisition/edit/${id}`}
          className="rounded-full bg-orange-600 py-3 text-white"
        >
          Editar
        </Link>
        <Link to="/requisition" className="text-orange-800 underline">
          Voltar para a lista
        </Link>
      </div>
    </article>
  );
}
