// --- Importaciones ---
// Importamos 'React' y los hooks 'useEffect' y 'useRef'.
// 'useEffect' nos permite ejecutar código en respuesta a cambios (como cambiar de canción).
// 'useRef' nos da acceso directo al elemento <audio> del DOM para controlarlo (play, pause, etc.).
import React, { useEffect, useRef } from 'react';

// --- Definición del Componente ---
// Este componente funcional recibe dos "props" desde App.jsx:
// 1. 'playerState': El objeto que contiene toda la información del reproductor (qué canción suena, si está en play, etc.).
// 2. 'onPlayPause': La función del componente App.jsx que permite alternar el estado de reproducción.
function Player({ playerState, onPlayPause }) {
  // Creamos una "referencia" para vincularla a nuestra etiqueta <audio>.
  // Esto nos permite controlar el reproductor de audio de HTML directamente con JavaScript.
  const audioRef = useRef(null);

  // --- Efecto Secundario para Controlar el Audio ---
  // Este hook 'useEffect' se ejecuta cada vez que el 'playerState' cambia.
  // Es el "cerebro" que sincroniza el estado de nuestra aplicación con el reproductor de audio real.
  useEffect(() => {
    // Nos aseguramos de que la referencia al elemento <audio> exista.
    if (audioRef.current) {
      // Establecemos un volumen predeterminado (30% para no ser muy ruidoso).
      audioRef.current.volume = 0.3;
      // Si el estado dice que la música debe estar sonando...
      if (playerState.isPlaying) {
        // ...le damos play al elemento de audio. El '.catch' previene errores si el navegador bloquea la reproducción automática.
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      } else {
        // Si no, le ponemos pausa.
        audioRef.current.pause();
      }
    }
  }, [playerState]); // La lista de dependencias: este efecto solo se re-ejecuta si 'playerState' cambia.

  // --- Renderizado Condicional ---
  // Si no hay ninguna canción seleccionada en el estado global ('currentSong' es null)...
  if (!playerState.currentSong) {
    // ...no renderizamos nada. El reproductor permanecerá oculto.
    return null;
  }

  // Desestructuramos la información de la canción actual para un código más limpio.
  const { imageUrl, title, artist } = playerState.currentSong;

  // --- Renderizado del Componente (JSX) ---
  return (
    // La etiqueta '<footer>' es semántica para el pie de página o barra inferior.
    // Clases de Tailwind CSS para el posicionamiento y la visibilidad:
    // - 'fixed': Fija el elemento en la pantalla, no se mueve con el scroll.
    // - 'bottom-16': Lo posiciona por defecto (móvil) a 64px de la parte inferior, justo encima de la BottomNav.
    // - 'md:bottom-0': En pantallas de escritorio (md y superiores), anula lo anterior y lo pega a la base.
    // - 'left-0 right-0': Hace que ocupe todo el ancho.
    // - 'z-20': Asegura que esté en una capa superior a otros elementos.
    <footer className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-zinc-800 border-t border-zinc-700 h-20 flex items-center px-4 text-white z-20">
      
      {/* Muestra la carátula del álbum de la canción actual. */}
      <img src={imageUrl} alt={title} className="w-14 h-14 rounded-md" />
      
      {/* Contenedor para el título y el artista. */}
      <div className="ml-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>
      
      {/* Contenedor para los controles de reproducción, centrados. */}
      <div className="flex-grow flex justify-center items-center">
        <span className="material-icons-outlined text-4xl cursor-pointer">skip_previous</span>
        
        {/* El botón principal de Play/Pausa. Llama a la función 'onPlayPause' al hacer clic. */}
        <span onClick={onPlayPause} className="material-icons-outlined text-6xl cursor-pointer mx-4">
          {/* Lógica ternaria: si 'isPlaying' es true, muestra el ícono de pausa, si no, el de play. */}
          {playerState.isPlaying ? 'pause_circle' : 'play_circle'}
        </span>
        
        <span className="material-icons-outlined text-4xl cursor-pointer">skip_next</span>
      </div>
      
      {/* El elemento de audio de HTML. Es invisible para el usuario, pero es el que realmente reproduce la música. */}
      {/* 'ref={audioRef}' lo conecta con nuestra referencia. */}
      {/* 'src={playerState.previewUrl}' actualiza la fuente de audio cada vez que cambia la canción en el estado. */}
      <audio ref={audioRef} src={playerState.previewUrl} />
    </footer>
  );
}

// Exportamos el componente Player para que pueda ser utilizado en App.jsx.
export default Player;