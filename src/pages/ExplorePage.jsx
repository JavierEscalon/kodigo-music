// --- Importaciones ---
// Importamos 'React' y los hooks 'useState' y 'useEffect' para manejar el estado y los efectos secundarios.
import React, { useState, useEffect } from 'react';
// Importamos el componente 'SongCard' para mostrar cada canción en la cuadrícula.
import SongCard from '../components/SongCard';

// --- Definición del Componente ---
// Este componente funcional representa la página de "Explorar".
// Recibe como "props" la función 'handlePlay' y el estado 'playerState' desde App.jsx para la funcionalidad de reproducción.
function ExplorePage({ handlePlay, playerState }) {
  // --- Estados del Componente ---
  // Un estado para almacenar la lista de canciones de pop que devuelve la API. Inicia como un array vacío.
  const [popSongs, setPopSongs] = useState([]);
  // Un estado para saber si los datos todavía se están cargando. Inicia en 'true'.
  const [isLoading, setIsLoading] = useState(true);

  // --- Efecto Secundario para Cargar Datos ---
  // Este hook 'useEffect' se ejecuta una sola vez cuando el componente se carga por primera vez,
  // gracias a la lista de dependencias vacía '[]' al final.
  useEffect(() => {
    // Definimos una función asíncrona para poder usar 'await' al hacer la llamada a la API.
    const fetchPopSongs = async () => {
      try {
        // Hacemos una llamada a la API de iTunes, buscando específicamente canciones del género "pop" y limitando a 50 resultados.
        const response = await fetch('https://itunes.apple.com/search?term=pop&entity=song&limit=50');
        const data = await response.json();
        // Actualizamos el estado 'popSongs' con los resultados obtenidos de la API.
        setPopSongs(data.results);
      } catch (error) {
        // Si ocurre un error durante la petición, lo mostramos en la consola del navegador.
        console.error("Error:", error);
      } finally {
        // Este bloque se ejecuta siempre, independientemente de si la petición tuvo éxito o no.
        // Lo usamos para indicar que el proceso de carga ha finalizado.
        setIsLoading(false);
      }
    };
    
    // Llamamos a la función para que se ejecute y comience la carga de datos.
    fetchPopSongs();
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez.

  // --- Función de Ayuda (Helper Function) ---
  // Esta función convierte los datos crudos de la API al formato que nuestro componente 'SongCard' espera.
  // Esto nos permite tener un formato de datos consistente en toda la aplicación.
  const mapSongData = (song) => ({
    id: song.trackId,
    imageUrl: song.artworkUrl100,
    title: song.trackName,
    artist: song.artistName,
    previewUrl: song.previewUrl,
  });

  // --- Renderizado del Componente (JSX) ---
  return (
    <div>
      {/* Título de la página. */}
      <h1 className="text-3xl font-bold text-white mb-6">Explorar Pop</h1>
      
      {/* Si 'isLoading' es true, mostramos un mensaje de "Cargando...". */}
      {isLoading && <p className="text-white">Cargando...</p>}
      
      {/* Contenedor de la cuadrícula de resultados. */}
      {/* Las clases 'grid' y 'grid-cols-...' de Tailwind CSS crean un layout de cuadrícula que se adapta a diferentes tamaños de pantalla (responsive). */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Iteramos sobre el array 'popSongs' y por cada canción, renderizamos un componente 'SongCard'. */}
        {popSongs.map(song => (
          <SongCard 
            key={song.trackId} 
            song={mapSongData(song)} 
            onPlay={handlePlay} 
            playerState={playerState} 
          />
        ))}
      </div>
    </div>
  );
}

// Exportamos el componente ExplorePage para que pueda ser utilizado por el router en App.jsx.
export default ExplorePage;
