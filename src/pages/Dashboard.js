import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      {/* Header com logo e botão de sair */}
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo da Empresa" />
          <h4 className="ms-3">Assistência Técnica</h4>
        </div>
        <button
          className="btn btn-logout"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Sair
        </button>
      </nav>

      {/* Conteúdo principal */}
      <div className="dashboard-container">
        <h1>Bem-vindo ao Painel de Controle</h1>

        <div className="card-container">
          {/* Card Clientes */}
          <div className="card">
            <h5><strong>Clientes</strong></h5>
            <p>Gerencie todos os seus clientes cadastrados.</p>
            <button
              className="btn"
              onClick={() => navigate("/clientes")}
            >
              Acessar Clientes
            </button>
          </div>

          {/* Card Serviços */}
          <div className="card">
            <h5><strong>Serviços</strong></h5>
            <p>Visualize e controle os serviços em andamento.</p>
            <button
              className="btn"
              onClick={() => navigate("/servicos")}
            >
              Acessar Serviços
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
