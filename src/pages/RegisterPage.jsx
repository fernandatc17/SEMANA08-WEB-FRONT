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
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import backgroundImage from "../assets/login-bg.jpg"; // Fondo
import logo from "../assets/logo.webp"; // Logo

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      await AuthService.register(form.username, form.email, form.password);
      setSuccess(true);
      setMessage("¡Usuario registrado correctamente! Redirigiendo...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Error al registrar usuario.";
      setMessage(errMsg);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "top left",
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
          <h4 className="mt-2">Registro de Usuario</h4>
        </div>

        {message && (
          <Alert variant={success ? "success" : "danger"}>{message}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-3" controlId="email">
            <Form.Label><MailIcon /> Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo"
              name="email"
              value={form.email}
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

          <Button variant="dark" type="submit" className="w-100">
            Registrarse
          </Button>
        </Form>

        <div className="text-center mt-3">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
