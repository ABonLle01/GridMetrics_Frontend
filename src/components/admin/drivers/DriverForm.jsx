import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function DriverForm({ show, onHide, driverData, onDriverUpdated }) {
  const [formData, setFormData] = useState({
    name: { first: "", last: "" },
    biography: "",
    nationality: { country: "", flag_image: "" },
    profile_image: "",
    birth: { date: "", place: "" },
    stats: {
      world_championships: 0,
      podiums: 0,
      gp_entered: 0,
      highest_race_finish: 0,
      highest_grid_position: 0,
      total_points: 0,
      season_points: 0,
    },
    career: {
      teams: [],
      first_race: "",
      first_victory: "",
      last_victory: "",
    },
    images: { image_1: "", image_2: "", image_3: "" },
    team: "",
    car_number: 0,
  });

  // Carga datos en el formulario al editar, o resetea para creación
  useEffect(() => {
    if (driverData) {
      setFormData({
        _id: driverData._id || "",
        name: {
          first: driverData.name?.first || "",
          last: driverData.name?.last || "",
        },
        biography: driverData.biography || "",
        nationality: {
          country: driverData.nationality?.country || "",
          flag_image: driverData.nationality?.flag_image || "",
        },
        profile_image: driverData.profile_image || "",
        birth: {
          date: driverData.birth?.date || "",
          place: driverData.birth?.place || "",
        },
        stats: {
          world_championships: driverData.stats?.world_championships || 0,
          podiums: driverData.stats?.podiums || 0,
          gp_entered: driverData.stats?.gp_entered || 0,
          highest_race_finish: driverData.stats?.highest_race_finish || 0,
          highest_grid_position: driverData.stats?.highest_grid_position || 0,
          total_points: driverData.stats?.total_points || 0,
          season_points: driverData.stats?.season_points || 0,
        },
        career: {
          teams: driverData.career?.teams || [],
          first_race: driverData.career?.first_race || "",
          first_victory: driverData.career?.first_victory || "",
          last_victory: driverData.career?.last_victory || "",
        },
        images: {
          image_1: driverData.images?.image_1 || "",
          image_2: driverData.images?.image_2 || "",
          image_3: driverData.images?.image_3 || "",
        },
        team: driverData.team || "",
        car_number: driverData.car_number || 0,
      });
    } else {
      // Resetea el formulario para creación
      setFormData({
        _id: "",
        name: { first: "", last: "" },
        biography: "",
        nationality: { country: "", flag_image: "" },
        profile_image: "",
        birth: { date: "", place: "" },
        stats: {
          world_championships: 0,
          podiums: 0,
          gp_entered: 0,
          highest_race_finish: 0,
          highest_grid_position: 0,
          total_points: 0,
          season_points: 0,
        },
        career: {
          teams: [],
          first_race: "",
          first_victory: "",
          last_victory: "",
        },
        images: { image_1: "", image_2: "", image_3: "" },
        team: "",
        car_number: 0,
      });
    }
  }, [driverData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      let updated = { ...prev };
      let nested = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!nested[keys[i]]) nested[keys[i]] = {};
        nested[keys[i]] = { ...nested[keys[i]] };
        nested = nested[keys[i]];
      }

      const lastKey = keys[keys.length - 1];

      // Campos numéricos que deben parsearse a número
      const numericFields = [
        "car_number",
        "stats.world_championships",
        "stats.podiums",
        "stats.gp_entered",
        "stats.highest_race_finish",
        "stats.highest_grid_position",
        "stats.total_points",
        "stats.season_points",
      ];

    if (numericFields.includes(name)) {
      nested[lastKey] = Number(value);
    } else if (name === "career.teams") {
      nested[lastKey] = value.split(",").map((team) => team.trim());
    } else if (name === "_id") {
      nested[lastKey] = value.startsWith("driver_") ? value : `driver_${value}`;
    } else {
      nested[lastKey] = value;
    }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (driverData) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${driverData._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, formData);
      }
      onDriverUpdated();
      onHide();
    } catch (error) {
      console.error("Error guardando piloto:", error);
      alert("Hubo un error al guardar el piloto.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{driverData ? "Editar piloto" : "Nuevo piloto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        {!driverData && (
        <Form.Group className="mb-2 text-primary">
            <Form.Label>ID único (ej: lewis_hamilton)</Form.Label>
            <Form.Control
            type="text"
            name="_id"
            value={formData._id}
            onChange={handleChange}
            required
            />
        </Form.Group>
        )}
          {/* Nombre */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name.first"
              value={formData.name.first}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="name.last"
              value={formData.name.last}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Biografía */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Biografía</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="biography"
              value={formData.biography}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Nacionalidad */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              name="nationality.country"
              value={formData.nationality.country}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Bandera (URL)</Form.Label>
            <Form.Control
              type="text"
              name="nationality.flag_image"
              value={formData.nationality.flag_image}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Imagen perfil */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Imagen de perfil</Form.Label>
            <Form.Control
              type="text"
              name="profile_image"
              value={formData.profile_image}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Datos de nacimiento */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birth.date"
              value={formData.birth.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Lugar de nacimiento</Form.Label>
            <Form.Control
              type="text"
              name="birth.place"
              value={formData.birth.place}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Stats */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Campeonatos</Form.Label>
            <Form.Control
              type="number"
              name="stats.world_championships"
              value={formData.stats.world_championships}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Podios</Form.Label>
            <Form.Control
              type="number"
              name="stats.podiums"
              value={formData.stats.podiums}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Grandes Premios</Form.Label>
            <Form.Control
              type="number"
              name="stats.gp_entered"
              value={formData.stats.gp_entered}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Mejor posición en carrera</Form.Label>
            <Form.Control
              type="number"
              name="stats.highest_race_finish"
              value={formData.stats.highest_race_finish}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Mejor posición en parrilla</Form.Label>
            <Form.Control
              type="number"
              name="stats.highest_grid_position"
              value={formData.stats.highest_grid_position}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Puntos totales</Form.Label>
            <Form.Control
              type="number"
              name="stats.total_points"
              value={formData.stats.total_points}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Puntos en temporada</Form.Label>
            <Form.Control
              type="number"
              name="stats.season_points"
              value={formData.stats.season_points}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Carrera */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Equipos (separados por coma)</Form.Label>
            <Form.Control
              type="text"
              name="career.teams"
              value={formData.career.teams.join(", ")}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Primera carrera</Form.Label>
            <Form.Control
              type="text"
              name="career.first_race"
              value={formData.career.first_race}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Primera victoria</Form.Label>
            <Form.Control
              type="text"
              name="career.first_victory"
              value={formData.career.first_victory}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Última victoria</Form.Label>
            <Form.Control
              type="text"
              name="career.last_victory"
              value={formData.career.last_victory}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Imágenes */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Imagen 1</Form.Label>
            <Form.Control
              type="text"
              name="images.image_1"
              value={formData.images.image_1}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Imagen 2</Form.Label>
            <Form.Control
              type="text"
              name="images.image_2"
              value={formData.images.image_2}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Imagen 3</Form.Label>
            <Form.Control
              type="text"
              name="images.image_3"
              value={formData.images.image_3}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Equipo y número */}
          <Form.Group className="mb-2 text-primary">
            <Form.Label>Equipo</Form.Label>
            <Form.Control
              type="text"
              name="team"
              value={formData.team}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-primary">
            <Form.Label>Número de coche</Form.Label>
            <Form.Control
              type="number"
              name="car_number"
              value={formData.car_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            {driverData ? "Guardar" : "Crear piloto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DriverForm;
