import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import DriversList from './drivers/DriversList';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin-auth") === "true";
    setIsAuthenticated(loggedIn);
    setShowLogin(!loggedIn);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === import.meta.env.VITE_USER_EMAIL && password === import.meta.env.VITE_USER_PASSWORD) {
      setIsAuthenticated(true);
      setShowLogin(false);
      localStorage.setItem("admin-auth", "true");
    } else {
      alert("Credenciales inválidas");
    }
  };

  
  return (
    <>
      <Modal show={showLogin} backdrop="static" keyboard={true}>
        <Modal.Header>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Cancelar
            </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {isAuthenticated && (
        <>
          <div className="container d-flex justify-content-between align-items-center mt-5">
            <h2>Listado de Pilotos en la temporada 2025</h2>
            <Button
              variant="outline-danger"
              onClick={() => {
                localStorage.removeItem("admin-auth");
                setIsAuthenticated(false);
                setShowLogin(true);
                navigate('/drivers');
              }}
            >
              Cerrar sesión
            </Button>
          </div>

          <DriversList />
        </>
      )}


      {!isAuthenticated && (
        <div className=" m-5">
          <h2>Panel de administración</h2>
          <p>Solo administradores pueden acceder a la sección. <br/> Si no eres uno de ellos, por favor, sal de la página.</p>
        </div>
      )}
    </>
  );
}

export default Admin;
