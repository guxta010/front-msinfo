import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Servicos from "./pages/Servicos";
import CadastroCliente from "./pages/CadastroCliente";
import EditarCliente from "./pages/EditarCliente";
import CadastroServico from "./pages/CadastroServico";
import EditarServico from "./pages/EditarServico";
import VisualizarOrdem from "./pages/VisualizarOrdem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/cadastrar" element={<CadastroCliente />} />
      <Route path="/clientes/editar/:id" element={<EditarCliente />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/servicos/cadastrar" element={<CadastroServico />} />
      <Route path="/servicos/editar/:id" element={<EditarServico />} />
      <Route path="/ordens/visualizar/:id" element={<VisualizarOrdem />} />
    </Routes>
  );
}

export default App;
