import React from 'react';

function Footer() {
  return (
    <footer
      className="text-center text-light py-3 border-top px-3 px-md-5"
      style={{ backgroundColor: "rgba(255, 0, 0, 0.85)" }}
    >
      <small className="d-block mx-auto" style={{ maxWidth: "720px" }}>
        Proyecto académico desarrollado por Álvaro Bonilla Lledó, alumno de 2ºDAW &middot; {new Date().getFullYear()} <br />
        Sin fines comerciales. Para uso educativo únicamente.
      </small>
    </footer>
  );
}

export default Footer;
