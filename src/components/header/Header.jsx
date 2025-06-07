import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);

   return (
    <nav className="navbar navbar-expand-lg px-4">
      <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
        <img
          src="https://media-public.canva.com/9_CDQ/MAEFZr9_CDQ/1/tl.png"
          alt="Logo"
          width="40"
          height="40"
          className="rounded-circle"
        />
        <div className="d-flex flex-column lh-sm">
          <span className="text-white">Grid</span>
          <span className="text-white">Metrics</span>
        </div>
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-controls="navbarNav"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto gap-lg-5 gap-2 text-center align-items-center">
          <li className="nav-item">
            <NavLink to="/results" className={({ isActive }) => isActive ? "nav-link text-danger-emphasis" : "nav-link text-white"}>
              Resultados
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/drivers" className={({ isActive }) => isActive ? "nav-link text-danger-emphasis" : "nav-link text-white"}>
              Pilotos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teams" className={({ isActive }) => isActive ? "nav-link text-danger-emphasis" : "nav-link text-white"}>
              Equipos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/schedule" className={({ isActive }) => isActive ? "nav-link text-danger-emphasis" : "nav-link text-white"}>
              Calendario
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/compare" className={({ isActive }) => isActive ? "nav-link text-danger-emphasis" : "nav-link text-white"}>
              Comparar Pilotos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
