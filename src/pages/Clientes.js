import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Clientes.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
    (cliente.email && cliente.email.toLowerCase().includes(search.toLowerCase())) ||
    cliente.telefone.includes(search)
  );

  return (
    <div className="clientes-page">
      <header className="clientes-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Clientes</h1>
      </header>

      <div className="clientes-actions">
        <button className="btn-dark" onClick={() => navigate("/dashboard")}>
          Voltar
        </button>
        <button className="btn-dark" onClick={() => navigate("/clientes/cadastrar")}>
          Novo Cliente
        </button>
        <input
          type="text"
          placeholder="Pesquisar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="clientes-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
