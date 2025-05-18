import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import backgroundImage from "../assets/login-bg.jpg"; // Usa una imagen propia aquí
import logo from "../assets/logo.webp"; // Usa tu logo aquí
import AuthService from "../Services/AuthService";


const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await AuthService.login(form.username, form.password);
      const roles = data.roles || [];
      if (roles.includes("ROLE_ADMIN")) navigate("/admin");
      else if (roles.includes("ROLE_MODERATOR")) navigate("/mod");
      else navigate("/user");
    } catch (error) {
      const errMsg =
        (error.response?.data?.message) || "Error al iniciar sesión.";
      setMessage(errMsg);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat", // ✅ permite que se repita
        backgroundSize: "auto",     // ✅ mantiene el tamaño original de la imagen
        backgroundPosition: "top left", // ✅ coloca la imagen en la parte superior izquierda
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: "1rem",
        }}
      >
        <div className="text-center mb-3">
          <img src={logo} alt="Logo" height={60} />
          <h4 className="mt-2">Iniciar Sesión</h4>
        </div>

        {message && <Alert variant="danger">{message}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label><AccountCircleIcon /> Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label><LockIcon /> Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Iniciar Sesión
          </Button>
        </Form>

        <div className="text-center mt-3">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
