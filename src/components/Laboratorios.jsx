import React, { useEffect, useState } from "react";
import axios from "../Services/axiosInstance";
import {
  Modal,
  Button,
  Form,
  Table,
  Container,
  Alert,
  Row,
  Col
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaFlask } from "react-icons/fa";

function Laboratorios() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    razonSocial: "",
    direccion: "",
    telefono: "",
    email: "",
    contacto: ""
  });

  const obtenerDatos = async () => {
    try {
      const res = await axios.get("/laboratorios");
      setLaboratorios(res.data);
    } catch (err) {
      console.error("Error al obtener laboratorios:", err);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setEditando(null);
    setError("");
    setFormulario({
      razonSocial: "",
      direccion: "",
      telefono: "",
      email: "",
      contacto: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formulario.razonSocial || !formulario.direccion) {
      setError("Razón social y dirección son obligatorias");
      return;
    }

    try {
      if (editando) {
        await axios.put(`/laboratorios/${editando}`, formulario);
      } else {
        await axios.post("/laboratorios", formulario);
      }
      handleClose();
      obtenerDatos();
    } catch (err) {
      setError("Error al guardar el laboratorio.");
      console.error(err);
    }
  };

  const handleEdit = (lab) => {
    setFormulario({
      razonSocial: lab.razonSocial || "",
      direccion: lab.direccion || "",
      telefono: lab.telefono || "",
      email: lab.email || "",
      contacto: lab.contacto || ""
    });
    setEditando(lab.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este laboratorio?")) {
      await axios.delete(`/laboratorios/${id}`);
      obtenerDatos();
    }
  };

  return (
    <>
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3><FaFlask className="mb-1" /> Gestión de Laboratorios</h3>
          <Button variant="primary" onClick={handleShow}>
            <FaPlus /> Agregar
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Razón Social</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {laboratorios.map((lab) => (
              <tr key={lab.id}>
                <td>{lab.id}</td>
                <td>{lab.razonSocial}</td>
                <td>{lab.direccion}</td>
                <td>{lab.telefono}</td>
                <td>{lab.email}</td>
                <td>{lab.contacto}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(lab)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(lab.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaFlask className="mb-1" /> {editando ? "Editar Laboratorio" : "Nuevo Laboratorio"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Razón Social</Form.Label>
                  <Form.Control
                    type="text"
                    value={formulario.razonSocial}
                    onChange={(e) => setFormulario({ ...formulario, razonSocial: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    value={formulario.direccion}
                    onChange={(e) => setFormulario({ ...formulario, direccion: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    value={formulario.telefono}
                    onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formulario.email}
                    onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Contacto</Form.Label>
                  <Form.Control
                    type="text"
                    value={formulario.contacto}
                    onChange={(e) => setFormulario({ ...formulario, contacto: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Laboratorios;
