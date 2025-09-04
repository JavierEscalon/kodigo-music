// --- Importaciones ---
// Importamos 'React' y los hooks 'useState' y 'useEffect'.
import React, { useState, useEffect } from 'react';
// Importamos el hook 'useSearchParams' de react-router-dom para leer los parámetros de la URL (ej. ?query=daft+punk).
import { useSearchParams } from 'react-router-dom';
// Importamos el componente 'SongCard' para mostrar cada resultado de la búsqueda.
import SongCard from '../components/SongCard';

// --- Definición del Componente ---
// Este componente funcional representa la página de resultados de búsqueda.
// Recibe como "props" la función 'handlePlay' y el estado 'playerState' desde App.jsx.
function SearchPage({ handlePlay, playerState }) {
  // --- Estados del Componente ---
  // Un estado para almacenar la lista de canciones que devuelve la API. Inicia como un array vacío.
  const [searchResults, setSearchResults] = useState([]);
  // Un estado para saber si la búsqueda está en curso. Inicia en 'false'.
  const [isLoading, setIsLoading] = useState(false);
  
  // --- Lógica de Búsqueda ---
  // 'useSearchParams' nos da acceso a los parámetros de la URL actual.
  const [searchParams] = useSearchParams();
  // Extraemos el valor del parámetro 'query' de la URL. Si la URL es /search?query=morat, 'query' será "morat".
  const query = searchParams.get('query');

  // --- Efecto Secundario para Realizar la Búsqueda ---
  // Este hook 'useEffect' se ejecuta cada vez que el valor de 'query' cambia.
  // Esto significa que si el usuario busca algo nuevo, el efecto se disparará de nuevo.
  useEffect(() => {
    // Si no hay un término de búsqueda en la URL, limpiamos los resultados y no hacemos nada más.
    if (!query) {
      setSearchResults([]);
      return;
    }

    // Definimos una función asíncrona para buscar en la API de iTunes.
    const fetchSearchResults = async () => {
      // Indicamos que la carga ha comenzado.
      setIsLoading(true);
      try {
        // Hacemos la llamada a la API usando el 'query' de la URL para construir la petición.
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=20`);
        const data = await response.json();
        // Actualizamos el estado con los resultados encontrados.
        setSearchResults(data.results);
      } catch (error) {
        // Si hay un error, lo mostramos en la consola.
        console.error("Error en la búsqueda:", error);
      } finally {
        // Se ejecuta siempre al final, indicando que la carga ha terminado.
        setIsLoading(false);
      }
    };

    // Llamamos a la función para que se ejecute.
    fetchSearchResults();
  }, [query]); // La lista de dependencias: este efecto depende del valor de 'query'.

  // --- Función de Ayuda (Helper Function) ---
  // Convierte los datos de la API al formato que nuestro componente 'SongCard' espera.
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
      {/* Mostramos dinámicamente el término que el usuario buscó. */}
      <h1 className="text-3xl font-bold text-white mb-6">Resultados para: "{query}"</h1>
      
      {/* Si 'isLoading' es true, mostramos un mensaje de "Buscando...". */}
      {isLoading && <p className="text-white">Buscando...</p>}
      
      {/* Contenedor de la cuadrícula de resultados. */}
      {/* Las clases 'grid' y 'grid-cols-...' crean un layout de cuadrícula responsive. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Iteramos sobre los 'searchResults' y renderizamos una 'SongCard' por cada canción. */}
        {searchResults.map(song => (
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

// Exportamos el componente SearchPage para que pueda ser utilizado por el router en App.jsx.
export default SearchPage;
