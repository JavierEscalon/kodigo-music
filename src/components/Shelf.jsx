// --- Importaciones ---
// Importamos la librería de React para poder crear el componente.
import React from 'react';
// Importamos el componente 'SongCard', que será el elemento individual dentro de nuestro carrusel.
import SongCard from './SongCard';

// --- Definición del Componente ---
// Este es un componente funcional llamado 'Shelf' (Estante).
// Recibe cuatro "props" de su componente padre (como HomePage.jsx):
// 1. 'title': El título que se mostrará encima del carrusel (ej. "Éxitos del Momento").
// 2. 'songs': Un array de objetos, donde cada objeto contiene la información de una canción.
// 3. 'onPlay': La función global del componente App.jsx para manejar la reproducción de música.
// 4. 'playerState': El objeto de estado global del reproductor para saber qué canción está sonando.
function Shelf({ title, songs, onPlay, playerState }) {
  
  // --- Renderizado del Componente (JSX) ---
  // Esto es lo que se mostrará en la pantalla.
  return (
    // Usamos una etiqueta semántica '<section>' para agrupar el contenido relacionado.
    // 'mb-8' (margin-bottom) añade un espacio vertical debajo de cada estante.
    <section className="mb-8">
      
      {/* Título del estante, que se recibe a través de las props. */}
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      
      {/* Contenedor del carrusel. */}
      {/* 'flex': Convierte a los hijos (las SongCard) en elementos flexibles, alineándolos en una fila. */}
      {/* 'space-x-4': Añade un espacio horizontal entre cada tarjeta. */}
      {/* 'overflow-x-auto': Esta es la clave del carrusel. Permite el desplazamiento horizontal cuando el contenido excede el ancho del contenedor. */}
      {/* 'pb-4': Añade un padding inferior para que la barra de scroll no se pegue a las tarjetas. */}
      {/* '-mx-4 px-4': Un truco de CSS para que el scroll se extienda a los bordes de la página, mejorando la estética. */}
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
        
        {/* Lógica para renderizar las tarjetas de canciones. */}
        {/* Usamos el método '.map()' para iterar sobre el array 'songs' que recibimos. */}
        {/* Por cada 'song' en el array, se renderiza un componente 'SongCard'. */}
        {songs.map((song) => (
          <SongCard
            // 'key' es un prop especial y obligatorio en React para listas. Ayuda a React a identificar qué elementos han cambiado.
            key={song.id}
            // Pasamos el objeto completo de la canción al componente hijo.
            song={song}
            // Pasamos la función 'onPlay' hacia abajo, para que la tarjeta pueda llamar a la función del componente App.
            onPlay={onPlay}
            // Pasamos el estado del reproductor para que la tarjeta sepa si es la canción que está sonando.
            playerState={playerState}
          />
        ))}
      </div>
    </section>
  );
}

// Exportamos el componente Shelf para que pueda ser importado y utilizado en otras partes de la aplicación.
export default Shelf;