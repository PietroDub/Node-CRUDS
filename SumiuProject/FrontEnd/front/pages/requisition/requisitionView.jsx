import { Link, useLocation, useParams } from "react-router-dom";

export default function RequisitionView() {
  const { id } = useParams();
  const { state } = useLocation();
  const requisition = state?.requisition;

  if (!requisition) {
    return (
      <p>
        Não há dados desta requisição nesta navegação.{" "}
        <Link to="/requisition">Voltar para a lista</Link>
      </p>
    );
  }

  return (
    <article>
      <h1>{requisition.title}</h1>
      <p>{requisition.description}</p>
      <p>{requisition.dadName}</p>
      <p>{requisition.dadDescription}</p>
      <p>{requisition.dadAge}</p>
      <p>{requisition.dadLastAddress}</p>
      <Link to={`/requisition/edit/${id}`}>Editar</Link>
      <Link to="/requisition">Voltar para a lista</Link>
    </article>
  );
}
