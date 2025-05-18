import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaFlask, FaPills, FaFileInvoice, FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaFlask className="mb-1" /> Farmacia
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/medicamentos">
            <FaPills className="me-1" /> Medicamentos
          </Nav.Link>
          <Nav.Link as={Link} to="/laboratorios">
            <FaFlask className="me-1" /> Laboratorios
          </Nav.Link>
          <Nav.Link as={Link} to="/ordenes">
            <FaFileInvoice className="me-1" /> Ordenes
          </Nav.Link>
          <Nav.Link as={Link} to="/detalles">
            <FaListAlt className="me-1" /> Detalles
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
