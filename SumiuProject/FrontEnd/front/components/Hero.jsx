export default function Hero() {
  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    const fetchRequisitions = async () => {
      const response = await getRequisitions();
      setRequisitions(response.data);
    };
    fetchRequisitions();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteRequisition(id);
    setRequisitions(
      requisitions.filter((requisition) => requisition._id !== id),
    );
  };
  const handleEdit = async (id) => {
    const response = await editRequisition(id);
    setRequisitions(
      requisitions.filter((requisition) => requisition._id !== id),
    );
  };
  const handleView = async (id) => {
    const response = await viewRequisition(id);
    setRequisitions(
      requisitions.filter((requisition) => requisition._id !== id),
    );
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Requisições!</h1>

          <ul>
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
              <button onClick={() => handleEdit(requisition._id)}>
                Editar
              </button>
              <button onClick={() => handleDelete(requisition._id)}>
                Deletar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
