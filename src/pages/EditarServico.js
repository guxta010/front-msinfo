import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditarServico() {
  const { id } = useParams();
  const [descricao, setDescricao] = useState("");
  const [cliente, setCliente] = useState("");
  const [preco, setPreco] = useState("");
  const [status, setStatus] = useState("Pendente");
  const navigate = useNavigate();
  const printRef = useRef();

  const token = localStorage.getItem("token"); // 🔑 Pega o token salvo no login

  useEffect(() => {
    const fetchServico = async () => {
      try {
        const response = await axios.get(`https://backend-msinfo.onrender.com/servicos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { descricao, cliente_id, status, valor } = response.data;
        setDescricao(descricao);
        setCliente(cliente_id);
        setPreco(valor);
        setStatus(status);
      } catch (error) {
        console.error("Erro ao buscar serviço:", error);
        alert("Erro ao buscar serviço. Verifique se você está logado.");
      }
    };
    fetchServico();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const servicoAtualizado = {
      descricao,
      status,
      valor: preco,
    };

    try {
      await axios.put(`https://backend-msinfo.onrender.com/servicos/${id}`, servicoAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Serviço atualizado com sucesso!");
      navigate("/servicos");
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      alert("Erro ao atualizar serviço. Verifique se você está logado.");
    }
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Logo" className="logo mb-3" style={{ maxWidth: "120px" }} />
        <h1>Editar Serviço</h1>
      </div>

      <div ref={printRef} className="bg-dark text-white p-4 rounded w-50 mb-4 border border-danger">
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Descrição:</strong> {descricao}</p>
        <p><strong>Cliente:</strong> {cliente}</p>
        <p><strong>Preço:</strong> R$ {preco}</p>
        <p><strong>Status:</strong> {status}</p>
      </div>

      <form onSubmit={handleUpdate} className="w-50">
        <div className="form-group mb-3">
          <label>Descrição:</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-danger"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Cliente:</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-danger"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Preço:</label>
          <input
            type="number"
            className="form-control bg-dark text-white border-danger"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Status:</label>
          <select
            className="form-select bg-dark text-white border-danger"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-danger rounded-pill px-4">
            Atualizar
          </button>
          <button
            type="button"
            className="btn btn-secondary rounded-pill px-4"
            onClick={() => navigate("/servicos")}
          >
            Cancelar
          </button>
        </div>
      </form>

      {status === "Concluído" && (
        <button
          onClick={handleImprimir}
          className="btn btn-success rounded-pill mt-4 px-4"
        >
          Imprimir Ordem de Serviço
        </button>
      )}
    </div>
  );
}

export default EditarServico;
