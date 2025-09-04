// --- Importaciones ---
// Importamos 'React' y los hooks 'useState' y 'useEffect'.
// 'useState' nos permite crear y manejar el estado interno del componente (como las listas de canciones).
// 'useEffect' nos permite ejecutar código "secundario", como hacer una llamada a una API cuando el componente se carga.
import React, { useState, useEffect } from 'react';
// Importamos nuestro componente reutilizable 'Shelf' para mostrar los carruseles de canciones.
import Shelf from '../components/Shelf';

// --- Definición del Componente ---
// Este componente funcional representa la página de inicio.
// Recibe como "props" la función 'handlePlay' y el estado 'playerState' desde el componente App.jsx.
function HomePage({ handlePlay, playerState }) {
  // --- Estados del Componente ---
  // Creamos estados separados para cada lista de canciones que vamos a mostrar.
  const [mainSongs, setMainSongs] = useState([]); // Para las canciones principales (Daft Punk).
  const [popSongs, setPopSongs] = useState([]);   // Para las canciones de pop (Bad Bunny).
  const [featuredAlbums, setFeaturedAlbums] = useState([]); // Para los álbumes destacados (Taylor Swift).
  
  // Un estado para saber si los datos todavía se están cargando. Inicia en 'true'.
  const [isLoading, setIsLoading] = useState(true);

  // --- Efecto Secundario para Cargar Datos ---
  // Este hook 'useEffect' se ejecuta una sola vez, justo después de que el componente se renderiza por primera vez.
  // La lista de dependencias vacía '[]' al final asegura que solo se ejecute una vez.
  useEffect(() => {
    // Definimos una función asíncrona para poder usar 'await'.
    const fetchAllMusic = async () => {
      try {
        // Creamos un array con todas las URLs de la API que queremos consultar.
        const urls = [
          'https://itunes.apple.com/search?term=daft+punk&entity=song&limit=10',
          'https://itunes.apple.com/search?term=bad+bunny&entity=song&limit=10',
          'https://itunes.apple.com/search?term=taylor+swift&entity=album&limit=10'
        ];

        // 'Promise.all' es una forma eficiente de hacer múltiples peticiones de red al mismo tiempo
        // y esperar a que todas terminen antes de continuar.
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));

        // Una vez que tenemos los datos, actualizamos cada estado con su respectivo resultado.
        setMainSongs(data[0].results);
        setPopSongs(data[1].results);
        setFeaturedAlbums(data[2].results);
        
      } catch (error) {
        // Si ocurre un error durante la petición, lo mostramos en la consola.
        console.error("Error fetching data:", error);
      } finally {
        // El bloque 'finally' se ejecuta siempre, tanto si la petición tuvo éxito como si falló.
        // Lo usamos para indicar que la carga ha terminado.
        setIsLoading(false);
      }
    };

    fetchAllMusic(); // Llamamos a la función para que se ejecute.
  }, []);

  // --- Renderizado Condicional de Carga ---
  // Si 'isLoading' es 'true', mostramos un mensaje de carga en lugar del contenido.
  if (isLoading) {
    return <p className="text-white text-center text-lg">Cargando música...</p>;
  }

  // --- Función de Ayuda (Helper Function) ---
  // Esta función convierte los datos crudos de la API al formato que nuestros componentes esperan.
  // Esto evita repetir la misma lógica de mapeo para cada carrusel.
  const mapSongData = (song) => ({
    id: song.trackId || song.collectionId, // Usamos 'trackId' para canciones y 'collectionId' para álbumes.
    imageUrl: song.artworkUrl100.replace('100x100', '400x400'), // Pedimos una imagen de mayor calidad.
    title: song.trackName || song.collectionName, // Usamos el nombre de la canción o del álbum.
    artist: song.artistName,
    previewUrl: song.previewUrl,
  });

  // --- Renderizado del Componente (JSX) ---
  return (
    // Contenedor principal de la página.
    <div>
      {/* Renderizamos tres instancias del componente 'Shelf'. */}
      {/* A cada una le pasamos un título, la función 'onPlay', el estado del reproductor, */}
      {/* y la lista de canciones ya procesada por nuestra función 'mapSongData'. */}
      <Shelf title="Daft Punk Essentials" onPlay={handlePlay} playerState={playerState} songs={mainSongs.map(mapSongData)} />
      <Shelf title="Éxitos del Momento" onPlay={handlePlay} playerState={playerState} songs={popSongs.map(mapSongData)} />
      <Shelf title="Álbumes Destacados" onPlay={handlePlay} playerState={playerState} songs={featuredAlbums.map(mapSongData)} />
    </div>
  );
}

// Exportamos el componente HomePage para que pueda ser utilizado por el router en App.jsx.
export default HomePage;
