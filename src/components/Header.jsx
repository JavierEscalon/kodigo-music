// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm.trim()}`);
    }
  };

  return (
    <header className="bg-zinc-900 text-white p-4 flex justify-center sticky top-0 z-10">
      <form onSubmit={handleSearch} className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="Buscar canciones, artistas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </form>
    </header>
  );
}

export default Header;