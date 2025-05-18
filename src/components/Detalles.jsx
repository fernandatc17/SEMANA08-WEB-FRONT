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
import { FaPlus, FaEdit, FaTrash, FaListAlt } from "react-icons/fa";

function Detalles() {
  const [detalles, setDetalles] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    descripcion: "",
    cantidad: "",
    precio: "",
    montouni: "",
    NroOrdenC: "",
    CodMedicamento: ""
  });

  const obtenerDatos = async () => {
    try {
      const res = await axios.get("/detalles");
      setDetalles(res.data);
    } catch (err) {
      console.error("Error al obtener detalles:", err);
    }
  };

  const obtenerOrdenes = async () => {
    try {
      const res = await axios.get("/ordenes");
      setOrdenes(res.data);
    } catch (err) {
      console.error("Error al obtener órdenes:", err);
    }
  };

  const obtenerMedicamentos = async () => {
    try {
      const res = await axios.get("/medicamentos");
      setMedicamentos(res.data);
    } catch (err) {
      console.error("Error al obtener medicamentos:", err);
    }
  };

  useEffect(() => {
    obtenerDatos();
    obtenerOrdenes();
    obtenerMedicamentos();
  }, []);

  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setEditando(null);
    setError("");
    setFormulario({
      descripcion: "",
      cantidad: "",
      precio: "",
      montouni: "",
      NroOrdenC: "",
      CodMedicamento: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formulario.descripcion || !formulario.cantidad || !formulario.precio || !formulario.NroOrdenC || !formulario.CodMedicamento) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      if (editando) {
        await axios.put(`/detalles/${editando}`, formulario);
      } else {
        await axios.post("/detalles", formulario);
      }
      handleClose();
      obtenerDatos();
    } catch (err) {
      setError("Error al guardar el detalle.");
      console.error(err);
    }
  };

  const handleEdit = (det) => {
    setFormulario({
      descripcion: det.descripcion || "",
      cantidad: det.cantidad || "",
      precio: det.precio || "",
      montouni: det.montouni || "",
      NroOrdenC: det.NroOrdenC || "",
      CodMedicamento: det.CodMedicamento || ""
    });
    setEditando(det.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este detalle?")) {
      await axios.delete(`/detalles/${id}`);
      obtenerDatos();
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3><FaListAlt className="mb-1" /> Detalles de Orden</h3>
        <Button variant="primary" onClick={handleShow}><FaPlus /> Agregar</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Monto Unitario</th>
            <th>Orden</th>
            <th>Medicamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((det) => (
            <tr key={det.id}>
              <td>{det.id}</td>
              <td>{det.descripcion}</td>
              <td>{det.cantidad}</td>
              <td>{det.precio}</td>
              <td>{det.montouni}</td>
              <td>{det.ordencompra?.NrofacturaProv || `#${det.NroOrdenC}`}</td>
              <td>{det.medicamento?.descripcionMed || `#${det.CodMedicamento}`}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(det)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(det.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><FaListAlt className="mb-1" /> {editando ? "Editar Detalle" : "Nuevo Detalle"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control type="text" value={formulario.descripcion} onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control type="number" value={formulario.cantidad} onChange={(e) => setFormulario({ ...formulario, cantidad: e.target.value })} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="number" step="0.01" value={formulario.precio} onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Monto Unitario</Form.Label>
                  <Form.Control type="number" step="0.01" value={formulario.montouni} onChange={(e) => setFormulario({ ...formulario, montouni: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Orden de Compra</Form.Label>
                  <Form.Select value={formulario.NroOrdenC} onChange={(e) => setFormulario({ ...formulario, NroOrdenC: e.target.value })} required>
                    <option value="">Seleccione una orden</option>
                    {ordenes.map((o) => (
                      <option key={o.id} value={o.id}>#{o.id} - {o.NrofacturaProv}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Medicamento</Form.Label>
                  <Form.Select value={formulario.CodMedicamento} onChange={(e) => setFormulario({ ...formulario, CodMedicamento: e.target.value })} required>
                    <option value="">Seleccione un medicamento</option>
                    {medicamentos.map((m) => (
                      <option key={m.id} value={m.id}>{m.descripcionMed}</option>
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

export default Detalles;
