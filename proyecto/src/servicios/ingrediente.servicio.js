const BASE_URL = 'https://localhost:44328/api/ingredientes';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

export const listarIngredientes = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener los ingredientes:', error.message);
    throw error;
  }
};

export const agregarIngrediente = async (nuevoIngrediente) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoIngrediente)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al agregar el ingrediente:', error.message);
    throw error;
  }
};

export const editarIngrediente = async (id, nuevoIngrediente) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoIngrediente)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al editar el ingrediente:', error.message);
    throw error;
  }
};

export const eliminarIngrediente = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar el ingrediente:', error.message);
    throw error;
  }
};
