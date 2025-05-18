import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { FaFlask, FaPills, FaFileInvoice, FaListAlt } from "react-icons/fa";

const AppNavbar = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const roles = user?.roles || [];

  const hasRole = (roleName) => roles.includes(roleName);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">Farmacia</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Inicio</Nav.Link>

            {/* ZONA USUARIO */}
            {(hasRole("ROLE_USER") || hasRole("ROLE_MODERATOR") || hasRole("ROLE_ADMIN")) && (
                <>
                    <Nav.Link as={Link} to="/user">Pág Usuario</Nav.Link>
                    <Nav.Link as={Link} to="/ordenes">
                    <FaFileInvoice className="me-1" /> Ordenes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/detalles">
                    <FaListAlt className="me-1" /> Detalles
                    </Nav.Link>
                </>
            )}

            {/* VISTAS FARMACIA: ORDENES Y DETALLES */}
            {(hasRole("ROLE_ADMIN") || hasRole("ROLE_USER")) && (
              <>
                
              </>
            )}

            {/* ZONA MODERADOR */}
            {(hasRole("ROLE_MODERATOR") || hasRole("ROLE_ADMIN")) && (
                <>  
                <Nav.Link as={Link} to="/medicamentos">
                    <FaPills className="me-1" /> Medicamentos
                </Nav.Link>
                <Nav.Link as={Link} to="/mod">Pág Moderador</Nav.Link>
                </>

            )}

            {/* ZONA ADMIN */}
            {hasRole("ROLE_ADMIN") && (
              <>
                <Nav.Link as={Link} to="/laboratorios">
                  <FaFlask className="me-1" /> Laboratorios
                </Nav.Link>
                <Nav.Link as={Link} to="/admin">Pág Admin</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Bienvenido: <strong>{user.username}</strong>
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
