// --- Importaciones ---
// Importamos la librería de React para poder crear el componente.
import React from 'react';
// Importamos 'Link' para crear enlaces de navegación que no recargan la página,
// y 'useLocation' para obtener información sobre la URL actual.
import { Link, useLocation } from 'react-router-dom';

// --- Definición del Componente ---
// Este componente funcional representa la barra lateral de navegación.
function Sidebar() {
  // 'useLocation' es un hook que nos da un objeto con detalles de la URL actual.
  // Lo usaremos para saber qué enlace debe aparecer como "activo".
  const location = useLocation();

  // --- Función de Ayuda para Estilos Dinámicos ---
  // Esta función genera las clases de CSS para cada enlace de forma dinámica.
  // Recibe como argumento la ruta ('path') a la que apunta el enlace.
  const linkClasses = (path) => 
    // Usamos una plantilla de cadena para construir las clases.
    // 'flex items-center ...' son clases base que todos los enlaces tendrán.
    `flex items-center p-2 text-lg font-semibold rounded-lg transition-colors ${
      // Aquí viene la lógica condicional (ternaria):
      // Si la ruta actual ('location.pathname') es igual a la ruta del enlace ('path')...
      location.pathname === path 
        ? 'bg-zinc-700 text-white' // ...aplica estas clases para el estado "activo".
        : 'text-gray-400 hover:bg-zinc-800 hover:text-white' // ...si no, aplica estas clases para el estado normal/hover.
    }`;

  // --- Renderizado del Componente (JSX) ---
  return (
    // La etiqueta '<aside>' es semánticamente correcta para una barra lateral.
    // Clases de Tailwind CSS para el layout:
    // - 'w-64': Ancho fijo de la barra.
    // - 'bg-black': Color de fondo.
    // - 'p-4': Padding (espaciado interno).
    // - 'flex flex-col': Organiza a sus hijos (logo y nav) en una columna vertical.
    // - 'h-full': Ocupa toda la altura de su contenedor padre.
    // - 'pb-24': Padding en la parte inferior para dejar espacio al reproductor de música.
    <aside className="w-64 bg-black p-4 flex flex-col h-full pb-24">
      
      {/* Contenedor del logo. 'mb-8' le da un margen inferior. */}
      <div className="mb-8">
        {/* El logo es un enlace que lleva a la página de inicio. */}
        <Link to="/">
          <img src="/kodigo-music-logo.png" alt="Kodigo Music Logo" className="w-48 h-auto" /> 
        </Link>
      </div>
      
      {/* Contenedor principal de la navegación. */}
      <nav>
        {/* Lista no ordenada que contiene los elementos de navegación. */}
        <ul>
          {/* Cada 'li' es un elemento de la lista. 'mb-2' le da un pequeño margen inferior. */}
          <li className="mb-2">
            {/* Usamos el componente 'Link' y le pasamos las clases generadas por nuestra función 'linkClasses'. */}
            <Link to="/" className={linkClasses("/")}>
              <span className="material-icons-outlined mr-4">home</span>
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/explore" className={linkClasses("/explore")}>
              <span className="material-icons-outlined mr-4">explore</span>
              Explore
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/library" className={linkClasses("/library")}>
              <span className="material-icons-outlined mr-4">library_music</span>
              Library
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/contact" className={linkClasses("/contact")}>
              <span className="material-icons-outlined mr-4">mail</span>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Línea divisoria para separar la navegación principal de otras secciones (como playlists futuras). */}
      <hr className="border-zinc-800 my-4" />
      
    </aside>
  );
}

// Exportamos el componente Sidebar para que pueda ser utilizado en App.jsx.
export default Sidebar;

