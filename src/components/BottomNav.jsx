// --- Importaciones ---
// Importamos la librería de React, necesaria para crear el componente.
import React from 'react';
// Importamos 'Link' para la navegación sin recarga de página y 'useLocation' para saber en qué URL estamos.
import { Link, useLocation } from 'react-router-dom';

// --- Sub-componente Interno: NavLink ---
// Creamos un pequeño componente reutilizable para cada uno de los botones de la barra.
// Esto nos ayuda a no repetir código y a mantenerlo más limpio.
// Recibe como "props" el destino del enlace ('to'), el nombre del ícono ('icon') y el texto ('label').
const NavLink = ({ to, icon, label }) => {
  // 'useLocation' es un hook de react-router-dom que nos da información sobre la URL actual.
  const location = useLocation();
  // Comparamos la ruta del enlace ('to') con la ruta actual de la página ('location.pathname').
  // 'isActive' será 'true' si coinciden, y 'false' si no.
  const isActive = location.pathname === to;
  
  return (
    // Usamos el componente 'Link' para crear un enlace de navegación.
    // 'className' aplica estilos de Tailwind CSS de forma dinámica.
    // - Si 'isActive' es true, el texto será de color cian ('text-cyan-400').
    // - Si no, será gris ('text-gray-400') y cambiará a blanco al pasar el cursor ('hover:text-white').
    <Link to={to} className={`flex flex-col items-center justify-center w-full transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
      {/* Muestra el ícono de Google Fonts que pasamos como prop. */}
      <span className="material-icons-outlined">{icon}</span>
      {/* Muestra el texto del enlace. */}
      <span className="text-xs">{label}</span>
    </Link>
  );
};

// --- Componente Principal: BottomNav ---
// Este es el componente que exportaremos y usaremos en App.jsx.
function BottomNav() {
  return (
    // La etiqueta '<nav>' es semánticamente correcta para una barra de navegación.
    // Clases de Tailwind CSS para el posicionamiento y la visibilidad:
    // - 'fixed bottom-0 left-0 right-0': Fija la barra en la parte inferior de la pantalla.
    // - 'h-16': Le da una altura fija de 64px.
    // - 'flex': Alinea los botones de navegación en una fila.
    // - 'md:hidden': ESTA ES LA CLAVE DE LA RESPONSIVIDAD. Oculta la barra en pantallas medianas (md) y grandes.
    // - 'z-20': Asegura que la barra esté por encima de otros elementos, como el reproductor.
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 h-16 flex md:hidden z-20">
      {/* Renderizamos cuatro instancias de nuestro sub-componente NavLink, una para cada sección. */}
      <NavLink to="/" icon="home" label="Home" />
      <NavLink to="/explore" icon="explore" label="Explore" />
      <NavLink to="/search" icon="search" label="Search" />
      <NavLink to="/library" icon="library_music" label="Library" />
    </nav>
  );
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
export default BottomNav;
