// src/shared/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useAuth } from "../../../auth/useAuth";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth(); // usamos el contexto
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser.role === "ADMINISTRADOR") {
        navigate("/dashboard");
      } else if (storedUser.role === "EMPLEADO") {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Credenciales inválidas");
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="container-form one"></div>

        <div className="circle-logo">
          <img src="/path-to-your-icon.png" alt="Icono local" />
        </div>

        <div className="container-form">
          <form className="sign-in" onSubmit={handleSubmit}>
            <h2>Farma Nova</h2>
            <span>Use su correo y contraseña</span>

            <div className="container-input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="container-input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="container-a">
              <a href="#">¿Has olvidado la contraseña?</a>
            </div>

            <button type="submit">INICIAR SESIÓN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
