// --- Importaciones ---
// Importamos la librería de React para poder crear el componente.
import React from 'react';
// Importamos el hook 'useForm' desde la librería 'react-hook-form'.
// Este hook nos proporciona todas las herramientas necesarias para manejar el formulario.
import { useForm } from 'react-hook-form';

// --- Definición del Componente ---
// Este componente funcional representa la página de contacto.
function ContactPage() {
  // --- Lógica del Formulario ---
  // Llamamos al hook 'useForm' para obtener las funciones y objetos que necesitamos.
  // - 'register': Es una función que usamos para "registrar" cada input, conectándolo al estado del formulario.
  // - 'handleSubmit': Es una función que envuelve nuestra propia función de envío. Se encarga de validar los campos
  //                  antes de permitir que nuestros datos se envíen.
  // - 'formState: { errors }': Es un objeto que contiene los errores de validación de cada campo.
  const { register, handleSubmit, formState: { errors } } = useForm();

  // --- Función de Envío ---
  // Esta es la función que se ejecutará SOLAMENTE si el formulario pasa todas las validaciones.
  // Recibe un objeto 'data' con los valores de todos los campos registrados (ej. { fullName: '...', email: '...' }).
  const onSubmit = (data) => {
    // Mostramos los datos del formulario en la consola del navegador para verificar que se capturaron correctamente.
    console.log(data);
    // Mostramos una alerta al usuario para confirmar el envío (en una app real, aquí iría la llamada a una API).
    alert('¡Formulario enviado! Revisa la consola para ver los datos.');
  };

  // --- Renderizado del Componente (JSX) ---
  return (
    // Contenedor principal para centrar el formulario en la página.
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-lg">
        {/* La etiqueta <form>. El evento 'onSubmit' se dispara al hacer clic en el botón de tipo 'submit'. */}
        {/* Lo conectamos a 'handleSubmit(onSubmit)', que primero valida y luego llama a nuestra función 'onSubmit'. */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-bold text-white text-center mb-6">Contáctanos</h1>

          {/* --- Campo: Nombre Completo --- */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fullName">
              Nombre Completo
            </label>
            <input
              id="fullName"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-zinc-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500"
              type="text"
              placeholder="John Doe"
              // {...register(...)}: Así registramos el input.
              // 'fullName' es el nombre del campo.
              // El segundo argumento es un objeto con las reglas de validación:
              // - 'required: true': El campo no puede estar vacío.
              // - 'minLength: 3': Debe tener al menos 3 caracteres.
              {...register("fullName", { required: true, minLength: 3 })}
            />
            {/* Renderizado condicional de errores. */}
            {/* Si existe un error de tipo 'required' para 'fullName', se muestra este mensaje. */}
            {errors.fullName?.type === 'required' && <p className="text-red-500 text-xs italic mt-2">El nombre es obligatorio.</p>}
            {/* Si existe un error de tipo 'minLength' para 'fullName', se muestra este otro. */}
            {errors.fullName?.type === 'minLength' && <p className="text-red-500 text-xs italic mt-2">El nombre debe tener al menos 3 caracteres.</p>}
          </div>

          {/* --- Campo: Correo Electrónico --- */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-zinc-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500"
              type="email"
              placeholder="tu@correo.com"
              // Registramos el campo 'email' con dos reglas:
              // - 'required: true': Es obligatorio.
              // - 'pattern': Debe cumplir con una expresión regular (un formato de email simple).
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {/* Mensajes de error para el campo de email. */}
            {errors.email?.type === 'required' && <p className="text-red-500 text-xs italic mt-2">El correo es obligatorio.</p>}
            {errors.email?.type === 'pattern' && <p className="text-red-500 text-xs italic mt-2">Por favor, introduce un correo válido.</p>}
          </div>

          {/* --- Botón de Envío --- */}
          <div className="flex items-center justify-center">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser utilizado por el router en App.jsx.
export default ContactPage;