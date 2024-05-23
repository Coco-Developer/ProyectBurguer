const BASE_URL = 'https://localhost:44328/api/hamburguesas';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

export const listarHamburguesas = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener las hamburguesas:', error.message);
    throw error;
  }
};

export const agregarHamburguesa = async (nuevaHamburguesa) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaHamburguesa)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al agregar la hamburguesa:', error.message);
    throw error;
  }
};

export const obtenerHamburguesaPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener la hamburguesa por ID:', error.message);
    throw error;
  }
};


export const editarHamburguesa = async (id, nuevaHamburguesa) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaHamburguesa)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al editar la hamburguesa:', error.message);
    throw error;
  }
};

export const eliminarHamburguesa = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar la hamburguesa:', error.message);
    throw error;
  }
};





