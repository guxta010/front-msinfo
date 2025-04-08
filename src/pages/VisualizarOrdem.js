import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VisualizarOrdem.css";

function VisualizarOrdem() {
  const { id } = useParams();
  const [ordem, setOrdem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/servicos/${id}`)
      .then((res) => res.json())
      .then((data) => setOrdem(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!ordem) return <p>Carregando...</p>;

  return (
    <div className="visualizar-container">
      <h1>Ordem de Serviço #{ordem.id}</h1>
      <p><strong>Cliente:</strong> {ordem.cliente}</p>
      <p><strong>Descrição:</strong> {ordem.descricao}</p>
      <p><strong>Status:</strong> {ordem.status}</p>
      <button onClick={handlePrint}>Imprimir</button>
    </div>
  );
}

export default VisualizarOrdem;