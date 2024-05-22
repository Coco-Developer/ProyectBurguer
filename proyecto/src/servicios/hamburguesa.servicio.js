// hamburguesa.servicio.js

const BASE_URL = 'https://localhost:44328/Hamburguesa';

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

// Definir un objeto que mapee los IDs de hamburguesas a las hamburguesas
let hamburguesasMap = {};

// Función para cargar las hamburguesas y crear el mapa
export const cargarHamburguesas = async () => {
  try {
    const hamburguesas = await listarHamburguesas();
    hamburguesas.forEach(hamburguesa => {
      hamburguesasMap[hamburguesa.idHamburguesa] = hamburguesa;
    });
  } catch (error) {
    console.error('Error al cargar las hamburguesas:', error.message);
    throw error;
  }
};

// Función para obtener una hamburguesa por su ID directamente del mapa
export const obtenerHamburguesaPorId = (id) => {
  const hamburguesa = hamburguesasMap[id];
  if (hamburguesa) {
    return hamburguesa;
  } else {
    throw new Error(`No se encontró una hamburguesa con el ID ${id}`);
  }
};

// Nueva función para listar ingredientes
export const listarIngredientes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Ingredientes`, {
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
