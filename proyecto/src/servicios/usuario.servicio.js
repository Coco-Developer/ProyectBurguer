const BASE_URL = 'https://localhost:44328/api/usuarios';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

export const listarUsuarios = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    throw error;
  }
};

export const agregarUsuario = async (nuevoUsuario) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoUsuario)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al agregar el usuario:', error.message);
    throw error;
  }
};

export const editarUsuario = async (id, nuevoUsuario) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoUsuario)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al editar el usuario:', error.message);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message);
    throw error;
  }
};
