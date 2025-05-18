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
import { FaPlus, FaEdit, FaTrash, FaFileInvoice } from "react-icons/fa";

function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    fechaEmision: "",
    Situacion: "",
    Total: "",
    NrofacturaProv: "",
    CodLab: ""
  });

  const obtenerDatos = async () => {
    try {
      const res = await axios.get("/ordenes");
      setOrdenes(res.data);
    } catch (err) {
      console.error("Error al obtener órdenes:", err);
    }
  };

  const obtenerLaboratorios = async () => {
    try {
      const res = await axios.get("/laboratorios");
      setLaboratorios(res.data);
    } catch (err) {
      console.error("Error al obtener laboratorios:", err);
    }
  };

  useEffect(() => {
    obtenerDatos();
    obtenerLaboratorios();
  }, []);

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setEditando(null);
    setError("");
    setFormulario({
      fechaEmision: "",
      Situacion: "",
      Total: "",
      NrofacturaProv: "",
      CodLab: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formulario.fechaEmision || !formulario.Total || !formulario.CodLab) {
      setError("Fecha, Total y Laboratorio son obligatorios");
      return;
    }

    try {
      if (editando) {
        await axios.put(`/ordenes/${editando}`, formulario);
      } else {
        await axios.post("/ordenes", formulario);
      }
      handleClose();
      obtenerDatos();
    } catch (err) {
      setError("Error al guardar la orden de compra.");
      console.error(err);
    }
  };

  const handleEdit = (orden) => {
    setFormulario({
      fechaEmision: orden.fechaEmision || "",
      Situacion: orden.Situacion || "",
      Total: orden.Total || "",
      NrofacturaProv: orden.NrofacturaProv || "",
      CodLab: orden.CodLab || ""
    });
    setEditando(orden.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      await axios.delete(`/ordenes/${id}`);
      obtenerDatos();
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3><FaFileInvoice className="mb-1" /> Gestión de Órdenes de Compra</h3>
        <Button variant="primary" onClick={handleShow}><FaPlus /> Agregar</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Emisión</th>
            <th>Factura</th>
            <th>Total</th>
            <th>Situación</th>
            <th>Laboratorio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.fechaEmision}</td>
              <td>{orden.NrofacturaProv}</td>
              <td>{orden.Total}</td>
              <td>{orden.Situacion}</td>
              <td>{orden.laboratorio?.razonSocial}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(orden)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(orden.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><FaFileInvoice className="mb-1" /> {editando ? "Editar Orden" : "Nueva Orden"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Emisión</Form.Label>
                  <Form.Control type="date" value={formulario.fechaEmision} onChange={(e) => setFormulario({ ...formulario, fechaEmision: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nro. Factura Proveedor</Form.Label>
                  <Form.Control type="text" value={formulario.NrofacturaProv} onChange={(e) => setFormulario({ ...formulario, NrofacturaProv: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total</Form.Label>
                  <Form.Control type="number" step="0.01" value={formulario.Total} onChange={(e) => setFormulario({ ...formulario, Total: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Situación</Form.Label>
                  <Form.Control type="text" value={formulario.Situacion} onChange={(e) => setFormulario({ ...formulario, Situacion: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Laboratorio</Form.Label>
                  <Form.Select value={formulario.CodLab} onChange={(e) => setFormulario({ ...formulario, CodLab: e.target.value })} required>
                    <option value="">Seleccione un laboratorio</option>
                    {laboratorios.map((lab) => (
                      <option key={lab.id} value={lab.id}>{lab.razonSocial}</option>
                    ))}
                  </Form.Select>
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

export default Ordenes;
