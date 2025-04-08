import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CadastroServico.css";

function CadastroServico() {
  const [descricao, setDescricao] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [preco, setPreco] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://backend-msinfo.onrender.com/clientes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoServico = {
      cliente_id: clienteId,
      descricao,
      valor: parseFloat(preco),
      status,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("https://backend-msinfo.onrender.com/servicos", novoServico, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Serviço cadastrado com sucesso!");
      navigate("/servicos");
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      alert("Erro ao cadastrar serviço.");
    }
  };

  return (
    <div className="form-page">
      <img src="/logo.png" alt="Logo" />
      <h1>Cadastrar Novo Serviço</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cliente:</label>
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={() => navigate("/servicos")}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroServico;
