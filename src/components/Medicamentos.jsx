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
import { FaPlus, FaEdit, FaTrash, FaPills } from "react-icons/fa";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    descripcionMed: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    Presentacion: "",
    stock: "",
    precioVentaUni: "",
    precioVentaPres: "",
    Marca: "",
    CodTipoMed: "",
    CodEspec: ""
  });

  const obtenerDatos = async () => {
    try {
      const res = await axios.get("/medicamentos");
      setMedicamentos(res.data);
    } catch (err) {
      console.error("Error al cargar medicamentos:", err);
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
      descripcionMed: "",
      fechaFabricacion: "",
      fechaVencimiento: "",
      Presentacion: "",
      stock: "",
      precioVentaUni: "",
      precioVentaPres: "",
      Marca: "",
      CodTipoMed: "",
      CodEspec: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formulario.descripcionMed || !formulario.stock || !formulario.precioVentaUni) {
      setError("Descripción, stock y precio unitario son obligatorios");
      return;
    }

    try {
      if (editando) {
        await axios.put(`/medicamentos/${editando}`, formulario);
      } else {
        await axios.post("/medicamentos", formulario);
      }
      handleClose();
      obtenerDatos();
    } catch (err) {
      setError("Error al guardar el medicamento.");
      console.error(err);
    }
  };

  const handleEdit = (med) => {
    setFormulario({ ...med });
    setEditando(med.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este medicamento?")) {
      await axios.delete(`/medicamentos/${id}`);
      obtenerDatos();
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3><FaPills className="mb-1" /> Gestión de Medicamentos</h3>
        <Button variant="primary" onClick={handleShow}><FaPlus /> Agregar</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Presentación</th>
            <th>Stock</th>
            <th>Precio Unitario</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.descripcionMed}</td>
              <td>{med.Presentacion}</td>
              <td>{med.stock}</td>
              <td>{med.precioVentaUni}</td>
              <td>{med.Marca}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(med)} className="me-2">
                  <FaEdit size={20} />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(med.id)}>
                  <FaTrash size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaPills className="mb-1" /> {editando ? "Editar Medicamento" : "Nuevo Medicamento"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control type="text" value={formulario.descripcionMed} onChange={(e) => setFormulario({ ...formulario, descripcionMed: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Presentación</Form.Label>
                  <Form.Control type="text" value={formulario.Presentacion} onChange={(e) => setFormulario({ ...formulario, Presentacion: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" value={formulario.stock} onChange={(e) => setFormulario({ ...formulario, stock: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Unitario (S/)</Form.Label>
                  <Form.Control type="number" step="0.01" value={formulario.precioVentaUni} onChange={(e) => setFormulario({ ...formulario, precioVentaUni: e.target.value })} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Presentación (S/)</Form.Label>
                  <Form.Control type="number" step="0.01" value={formulario.precioVentaPres} onChange={(e) => setFormulario({ ...formulario, precioVentaPres: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" value={formulario.Marca} onChange={(e) => setFormulario({ ...formulario, Marca: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Fabricación</Form.Label>
                  <Form.Control type="date" value={formulario.fechaFabricacion} onChange={(e) => setFormulario({ ...formulario, fechaFabricacion: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Vencimiento</Form.Label>
                  <Form.Control type="date" value={formulario.fechaVencimiento} onChange={(e) => setFormulario({ ...formulario, fechaVencimiento: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Código Tipo Medicamento</Form.Label>
                  <Form.Control type="text" value={formulario.CodTipoMed} onChange={(e) => setFormulario({ ...formulario, CodTipoMed: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Código Especificación</Form.Label>
                  <Form.Control type="text" value={formulario.CodEspec} onChange={(e) => setFormulario({ ...formulario, CodEspec: e.target.value })} />
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
    </Container>
  );
}

export default Medicamentos;
