import { useEffect, useState } from 'react';
import axios from 'axios';
import DriverForm from './DriverForm';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null); // null = creación

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers`);
      setDrivers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los pilotos:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este piloto?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`);
      fetchDrivers();
    } catch (error) {
      console.error("Error al eliminar piloto:", error);
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingDriver(null); // Modo creación
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingDriver(null);
  };

  if (loading) return <p className='text-center'>Cargando pilotos...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-primary me-2" onClick={handleCreate}>
          Añadir nuevo piloto
        </button>
      </div>

      <div className="row">
        {drivers.map((driver) => (
          <div key={driver._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img
                src={driver.profile_image}
                className="card-img-top"
                alt={`${driver.name.first} ${driver.name.last}`}
                style={{ objectFit: 'cover', height: '400px' }}
              />
              <div className="card-body">
                <h5 className="card-title px-4">{driver.name.first} {driver.name.last}</h5>
                <div className="d-flex justify-content-between align-items-center px-3">
                  <button className="btn btn-warning btn-sm ms-2" onClick={() => handleEdit(driver)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(driver._id)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DriverForm
        show={showForm}
        onHide={handleFormClose}
        driverData={editingDriver}
        onDriverUpdated={fetchDrivers}
      />
    </div>
  );
}

export default DriversList;
