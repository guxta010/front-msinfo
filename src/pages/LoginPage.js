import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-msinfo.onrender.com/usuarios/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login bem-sucedido!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Email ou senha inválidos");
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img src="/logo.png" alt="Logo da Empresa" />
        <h2>Login do Sistema</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
