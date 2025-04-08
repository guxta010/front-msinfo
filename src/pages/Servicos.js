import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Servicos.css";

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://backend-msinfo.onrender.com/servicos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServicos(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };
    fetchServicos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://backend-msinfo.onrender.com/servicos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServicos(servicos.filter((servico) => servico.id !== id));
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
      }
    }
  };

  const handlePrint = async (servico) => {
    try {
      const token = localStorage.getItem("token");
      const clienteResponse = await axios.get(`https://backend-msinfo.onrender.com/clientes/${servico.cliente_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cliente = clienteResponse.data;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Ordem de Serviço #${servico.id}</title>
            <link rel="stylesheet" href="${window.location.origin}/impressao.css" />
          </head>
          <body>
            <div class="duas-vias">
              ${["Via da Loja", "Via do Cliente"].map(via => `
                <div class="via">
                  <div class="header">
                    <img src="${window.location.origin}/logo.png" alt="Logo da Empresa" />
                    <h1>ORDEM DE SERVIÇO #${servico.id}</h1>
                  </div>
                  <div class="empresa">MS Informática</div>

                  <table class="table-info">
                    <tr>
                      <th>Nome do Cliente</th>
                      <td>${cliente.nome}</td>
                    </tr>
                    <tr>
                      <th>Telefone</th>
                      <td>${cliente.telefone || "Não informado"}</td>
                    </tr>
                    <tr>
                      <th>Descrição do Serviço</th>
                      <td>${servico.descricao}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>${servico.status}</td>
                    </tr>
                    <tr>
                      <th>Valor</th>
                      <td>R$ ${parseFloat(servico.valor).toFixed(2)}</td>
                    </tr>
                  </table>

                  <div class="assinatura">
                    <div>Assinatura do Cliente</div>
                    <div>Assinatura da Assistência</div>
                  </div>

                  <div class="via-title">${via}</div>
                </div>
              `).join("")}
            </div>

            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error("Erro ao buscar dados do cliente para impressão:", error);
      alert("Erro ao gerar impressão. Tente novamente.");
    }
  };

  const filteredServicos = servicos.filter((servico) =>
    servico.descricao.toLowerCase().includes(search.toLowerCase()) ||
    servico.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="clientes-page">
      <header className="clientes-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Serviços</h1>
      </header>

      <div className="clientes-actions">
        <button className="btn-dark" onClick={() => navigate("/dashboard")}>Voltar</button>
        <button className="btn-dark" onClick={() => navigate("/servicos/cadastrar")}>Novo Serviço</button>
        <input
          type="text"
          placeholder="Pesquisar serviço..."
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
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
              <th className="no-print">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredServicos.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.descricao}</td>
                <td>R$ {parseFloat(servico.valor).toFixed(2)}</td>
                <td>{servico.status}</td>
                <td className="no-print">
                  <div className="no-print">
                    <button className="btn-dark" onClick={() => navigate(`/servicos/editar/${servico.id}`)}>Editar</button>
                    <button
                      className="btn-dark"
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(servico.id)}
                    >
                      Excluir
                    </button>
                    <button className="btn-dark" onClick={() => handlePrint(servico)}>Imprimir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Servicos;
