// --- Importaciones ---
// Importamos las herramientas esenciales de React y la librería para manejar las rutas.
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importamos todas las páginas que hemos creado. Cada una corresponde a una sección de la app.
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import ExplorePage from './pages/ExplorePage';

// Importamos los componentes que forman la estructura visual (layout) de la aplicación.
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Player from './components/Player';
import BottomNav from './components/BottomNav';

// --- Componente Principal de la Aplicación ---
// Este es el componente raíz que organiza toda la aplicación. Es el "cerebro" del layout y el estado global.
function App() {
  // --- ESTADO GLOBAL ---
  // Usamos el hook 'useState' para crear y manejar el estado del reproductor de música.
  // Al definirlo aquí, en el componente padre más alto, nos aseguramos de que el estado sea "global".
  // Esto significa que el reproductor no se reiniciará al cambiar de página.
  const [playerState, setPlayerState] = useState({
    isPlaying: false,       // Un valor booleano (true/false) para saber si la música está sonando.
    previewUrl: null,       // La URL del archivo de audio de la canción actual.
    currentSong: null,      // Un objeto que contiene toda la información de la canción (título, artista, imagen).
  });

  // --- FUNCIONES GLOBALES ---
  // Esta función maneja la lógica cuando un usuario hace clic en una canción para reproducirla.
  // La pasamos como "prop" a las páginas que muestran listas de canciones (HomePage, SearchPage, etc.).
  const handlePlay = (song) => {
    // Si la canción no tiene una URL de preview (por ejemplo, si es un álbum), no hacemos nada.
    if (!song.previewUrl) return;

    // Si el usuario hace clic en la misma canción que ya está seleccionada...
    if (playerState.previewUrl === song.previewUrl) {
      // ...simplemente alternamos el estado de reproducción (de play a pause, o viceversa).
      setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
    } else {
      // Si es una canción nueva, actualizamos el estado para que comience a reproducirse.
      setPlayerState({
        isPlaying: true,
        previewUrl: song.previewUrl,
        currentSong: song,
      });
    }
  };

  // Esta función es para el botón de play/pause del propio reproductor en la barra inferior.
  const handlePlayPause = () => {
    // Solo funciona si ya hay una canción cargada en el reproductor.
    if (playerState.currentSong) {
      setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
    }
  };

  // --- RENDERIZADO DEL LAYOUT Y LAS RUTAS ---
  // Aquí se define la estructura visual (HTML/JSX) de toda la aplicación.
  return (
    // Contenedor principal que ocupa toda la pantalla ('h-screen') y establece el color de fondo y texto.
    <div className="bg-zinc-900 h-screen text-white">
      
      {/* Contenedor del contenido principal (Sidebar + Páginas) */}
      {/* 'flex h-full' asegura que ocupe todo el espacio vertical disponible para organizar a sus hijos. */}
      <div className="flex h-full">
        
        {/* Contenedor de la Barra Lateral (Sidebar) */}
        {/* 'hidden' la oculta por defecto (en móvil). */}
        {/* 'md:block' la muestra en pantallas medianas (md) y grandes. */}
        {/* 'flex-shrink-0' evita que la barra se encoja si el contenido es muy grande. */}
        <div className="hidden md:block flex-shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Contenido Principal (Header + Páginas que cambian) */}
        {/* 'flex-1' para que ocupe todo el espacio sobrante en la fila. */}
        {/* 'overflow-y-auto' es la clave: este es el ÚNICO contenedor que tendrá scroll vertical. */}
        {/* El padding inferior ('pb-...') asegura que el contenido no quede oculto detrás del reproductor. */}
        <main className="flex-1 overflow-y-auto pb-36 md:pb-24">
          <Header />
          {/* Este div interno añade un espaciado alrededor del contenido de las páginas. */}
          <div className="p-4 md:p-8">
            {/* El componente 'Routes' de react-router-dom decide qué página renderizar según la URL actual. */}
            <Routes>
              {/* Cada 'Route' define una URL ('path') y el componente que debe mostrar ('element'). */}
              {/* Pasamos 'handlePlay' y 'playerState' a las páginas que necesitan controlar la música. */}
              <Route path="/" element={<HomePage handlePlay={handlePlay} playerState={playerState} />} />
              <Route path="/search" element={<SearchPage handlePlay={handlePlay} playerState={playerState} />} />
              <Route path="/explore" element={<ExplorePage handlePlay={handlePlay} playerState={playerState} />} />
              <Route path="/library" element={<div className="text-white text-center text-2xl">Library Page (Coming Soon)</div>} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Componentes Fijos que se superponen al contenido */}
      {/* Estos componentes se colocan fuera del contenedor flex principal. */}
      {/* Su posicionamiento 'fixed' ahora se calculará correctamente respecto a la ventana del navegador. */}
      <div>
        <Player playerState={playerState} onPlayPause={handlePlayPause} />
        <BottomNav />
      </div>

    </div>
  );
}

// Exportamos el componente App para que pueda ser usado en 'main.jsx'.
export default App;

