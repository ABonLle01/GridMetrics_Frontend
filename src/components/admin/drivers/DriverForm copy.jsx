import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function DriverForm({ show, onHide, driverData, onDriverUpdated }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (driverData) {
      setFormData(driverData);
    }
  }, [driverData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Soporta campos anidados como "name.first"
    const keys = name.split('.');
    setFormData((prevData) => {
      let updated = { ...prevData };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested[keys[i]] = { ...nested[keys[i]] };
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${driverData._id}`, formData);
      onDriverUpdated();
      onHide();
    } catch (error) {
      console.error("Error al actualizar piloto:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  if (!formData.name) return null; // Esperar a que los datos estén listos

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar piloto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Nombre */}
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name.first" value={formData.name.first || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" name="name.last" value={formData.name.last || ''} onChange={handleChange} />
          </Form.Group>

          {/* Biografía */}
          <Form.Group className="mb-2">
            <Form.Label>Biografía</Form.Label>
            <Form.Control as="textarea" rows={4} name="biography" value={formData.biography || ''} onChange={handleChange} />
          </Form.Group>

          {/* Nacionalidad */}
          <Form.Group className="mb-2">
            <Form.Label>País</Form.Label>
            <Form.Control type="text" name="nationality.country" value={formData.nationality.country || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Bandera (URL)</Form.Label>
            <Form.Control type="text" name="nationality.flag_image" value={formData.nationality.flag_image || ''} onChange={handleChange} />
          </Form.Group>

          {/* Imagen perfil */}
          <Form.Group className="mb-2">
            <Form.Label>Imagen de perfil</Form.Label>
            <Form.Control type="text" name="profile_image" value={formData.profile_image || ''} onChange={handleChange} />
          </Form.Group>

          {/* Datos de nacimiento */}
          <Form.Group className="mb-2">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control type="date" name="birth.date" value={formData.birth.date || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Lugar de nacimiento</Form.Label>
            <Form.Control type="text" name="birth.place" value={formData.birth.place || ''} onChange={handleChange} />
          </Form.Group>

          {/* Stats */}
          <Form.Group className="mb-2">
            <Form.Label>Campeonatos</Form.Label>
            <Form.Control type="number" name="stats.world_championships" value={formData.stats.world_championships || 0} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Podios</Form.Label>
            <Form.Control type="number" name="stats.podiums" value={formData.stats.podiums || 0} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Grandes Premios</Form.Label>
            <Form.Control type="number" name="stats.gp_entered" value={formData.stats.gp_entered || 0} onChange={handleChange} />
          </Form.Group>

          {/* Imágenes */}
          <Form.Group className="mb-2">
            <Form.Label>Imagen 1</Form.Label>
            <Form.Control type="text" name="images.image_1" value={formData.images.image_1 || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Imagen 2</Form.Label>
            <Form.Control type="text" name="images.image_2" value={formData.images.image_2 || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Imagen 3</Form.Label>
            <Form.Control type="text" name="images.image_3" value={formData.images.image_3 || ''} onChange={handleChange} />
          </Form.Group>

          {/* Equipo y número */}
          <Form.Group className="mb-2">
            <Form.Label>Equipo</Form.Label>
            <Form.Control type="text" name="team" value={formData.team || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Número de coche</Form.Label>
            <Form.Control type="number" name="car_number" value={formData.car_number || 0} onChange={handleChange} />
          </Form.Group>

          <Button variant="success" type="submit">Guardar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DriverForm;
