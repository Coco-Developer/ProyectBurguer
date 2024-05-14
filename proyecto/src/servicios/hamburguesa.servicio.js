

// Definimos la URL base para las solicitudes
const BASE_URL = 'https://localhost:44328/Hamburguesa';

// Función para manejar errores de la respuesta HTTP
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

// Función para realizar una solicitud HTTP GET y obtener todas las hamburguesas
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

// Función para agregar una nueva hamburguesa
export const agregarHamburguesa = async (nuevaHamburguesa) => {
  try {
    // Registro del cuerpo de la solicitud
    console.log('Cuerpo de la solicitud:', JSON.stringify(nuevaHamburguesa));

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaHamburguesa)
    });

    // Registro de los encabezados de la respuesta
    console.log('Encabezados de la respuesta:', response.headers);

    return handleResponse(response);
  } catch (error) {
    console.error('Error al agregar la hamburguesa:', error.message);
    throw error;
  }
};

// Función para actualizar una hamburguesa existente
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

// Función para eliminar una hamburguesa
export const eliminarHamburguesa = async (nombre) => {
  try {
    const response = await fetch(`${BASE_URL}/${nombre}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar la hamburguesa:', error.message);
    throw error;
  }
};

// Función para obtener una hamburguesa por su ID
export const obtenerHamburguesaPorId = async (id) => {
  try {
    // Obtener todas las hamburguesas
    const hamburguesas = await listarHamburguesas();

    // Filtrar la hamburguesa por su ID
    const hamburguesa = hamburguesas.find(h => h.idHamburguesa === id);

    // Verificar si se encontró la hamburguesa
    if (hamburguesa) {
      return hamburguesa;
    } else {
      throw new Error(`No se encontró una hamburguesa con el ID ${id}`);
    }
  } catch (error) {
    console.error(`Error al obtener la hamburguesa con ID ${id}:`, error.message);
    throw error;
  }
};
