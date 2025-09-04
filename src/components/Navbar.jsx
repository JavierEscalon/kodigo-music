import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-zinc-800 p-4 shadow-md">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link to="/" className="text-white hover:text-cyan-400 font-semibold text-lg">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:text-cyan-400 font-semibold text-lg">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;