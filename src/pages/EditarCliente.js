import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditarCliente() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`https://backend-msinfo.onrender.com/clientes/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setTelefone(response.data.telefone);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };
    fetchCliente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://backend-msinfo.onrender.com/clientes/${id}`, {
        nome,
        email,
        telefone,
      });
      alert("Cliente atualizado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4">
        <img src="/logo.png" alt="Logo" className="logo mb-3" style={{ maxWidth: "120px" }} />
        <h1>Editar Cliente</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-50">
        <div className="form-group mb-3">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-danger"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control bg-dark text-white border-danger"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Telefone:</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-danger"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-danger rounded-pill px-4">
            Salvar Alterações
          </button>
          <button
            type="button"
            className="btn btn-secondary rounded-pill px-4"
            onClick={() => navigate("/clientes")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarCliente;
