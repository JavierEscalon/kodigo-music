// --- Importaciones ---
// Importamos la librería de React, que es necesaria para crear componentes.
import React from 'react';

// --- Definición del Componente ---
// Este es un componente funcional llamado 'SongCard'. Su propósito es mostrar la información de una sola canción.
// Recibe tres "props" (propiedades) de su componente padre (como Shelf.jsx):
// 1. 'song': Un objeto que contiene toda la información de la canción (URL de la imagen, título, etc.).
// 2. 'onPlay': Una función que se ejecutará cuando el usuario haga clic en la tarjeta.
// 3. 'playerState': Un objeto que contiene el estado actual del reproductor de música global.
function SongCard({ song, onPlay, playerState }) {
  
  // --- Desestructuración de Props ---
  // Extraemos las propiedades que necesitamos del objeto 'song' para usarlas más fácilmente en el código.
  const { imageUrl, title, artist, previewUrl } = song;
  
  // --- Lógica de Estado ---
  // Creamos una variable booleana (true/false) para saber si ESTA canción específica es la que está sonando.
  // Se cumple si el reproductor está activo ('isPlaying') Y la URL de la canción en el reproductor
  // coincide con la URL de la preview de esta tarjeta.
  const isPlayingThisSong = playerState.isPlaying && playerState.previewUrl === previewUrl;

  // --- Manejador de Eventos (Event Handler) ---
  // Esta función se llama cuando el usuario hace clic en la tarjeta.
  const handleCardClick = () => {
    // Comprobamos si la canción tiene una URL de preview. Esto es para evitar que los álbumes,
    // que no tienen preview, intenten reproducirse.
    if (previewUrl) {
      // Si hay una URL, llamamos a la función 'onPlay' que recibimos como prop,
      // pasándole el objeto completo de la canción. Esto "avisa" al componente App.jsx que debe reproducir esta canción.
      onPlay(song);
    }
  };

  // --- Renderizado del Componente (JSX) ---
  // Esto es lo que se mostrará en la pantalla.
  return (
    // Contenedor principal de la tarjeta.
    // 'onClick' ejecuta nuestra función 'handleCardClick' cuando se hace clic.
    // 'className' utiliza clases de Tailwind CSS para el estilo.
    // - 'group': Permite que los elementos hijos reaccionen cuando se pasa el cursor sobre este contenedor.
    // - 'flex-shrink-0': Evita que la tarjeta se encoja en un carrusel.
    // - `${...}`: Es una plantilla literal que añade clases condicionalmente. Si hay 'previewUrl',
    //   el cursor cambia a una mano ('cursor-pointer') y el fondo cambia al pasar el cursor ('hover:bg-zinc-700').
    //   Si no, el cursor indica que no es clickeable ('cursor-not-allowed').
    <div 
      onClick={handleCardClick}
      className={`group flex-shrink-0 w-48 bg-zinc-800 rounded-lg p-4 transition-all duration-300 ${previewUrl ? 'cursor-pointer hover:bg-zinc-700' : 'cursor-not-allowed'}`}
    >
      {/* Contenedor para la imagen y el ícono de play/pause. */}
      {/* 'relative' permite posicionar el ícono de forma absoluta dentro de este div. */}
      <div className="relative">
        {/* La imagen de la carátula del álbum/canción. */}
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
        
        {/* Este bloque solo se renderiza si existe una 'previewUrl'. */}
        {previewUrl && (
          // Capa semi-transparente que aparece sobre la imagen al pasar el cursor.
          // 'group-hover:bg-opacity-50' hace que la opacidad cambie solo cuando el 'group' (el div principal) está en hover.
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
            
            {/* El ícono de Play o Pausa. */}
            {/* 'opacity-0 group-hover:opacity-100' hace que el ícono sea invisible por defecto y visible en hover. */}
            <span className="material-icons-outlined text-white text-6xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
              
              {/* Lógica para cambiar el ícono dinámicamente. */}
              {/* Si 'isPlayingThisSong' es true, muestra el ícono de pausa. Si no, muestra el de play. */}
              {isPlayingThisSong ? 'pause_circle' : 'play_circle'}
            </span>
          </div>
        )}
      </div>
      
      {/* El título de la canción. 'truncate' corta el texto con "..." si es muy largo. */}
      <h3 className="text-white font-bold truncate">{title}</h3>
      
      {/* El nombre del artista. */}
      <p className="text-gray-400 text-sm">{artist}</p>
    </div>
  );
}

// Exportamos el componente para que pueda ser importado y utilizado en otras partes de la aplicación.
export default SongCard;
