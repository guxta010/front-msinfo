import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CadastroCliente.css";

function CadastroCliente() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post("https://backend-msinfo.onrender.com/clientes", {
        nome,
        endereco,
        telefone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Cliente cadastrado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente.");
    }    
  };

  return (
    <div className="cadastro-cliente">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Cadastrar Cliente</h1>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Endereço:</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />

        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="btn-dark">Cadastrar</button>
          <button type="button" onClick={() => navigate("/clientes")} className="btn-dark">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroCliente;
