const BASE_URL = 'https://localhost:44328/Usuario'; // URL del backend API

// Función para manejar errores de la respuesta HTTP
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await fetch(BASE_URL);
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    throw error;
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error.message);
    throw error;
  }
};

// Agregar usuario
export const agregarUsuario = async (usuario) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al agregar usuario:', error.message);
    throw error;
  }
};

// Eliminar usuario por ID
export const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error.message);
    throw error;
  }
};
