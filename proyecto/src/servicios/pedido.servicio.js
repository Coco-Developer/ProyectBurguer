const BASE_URL = 'https://localhost:44328/api/pedidos';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

export const listarPedidos = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error.message);
    throw error;
  }
};

export const agregarPedido = async (nuevoPedido) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoPedido)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al agregar el pedido:', error.message);
    throw error;
  }
};

export const editarPedido = async (id, nuevoPedido) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoPedido)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al editar el pedido:', error.message);
    throw error;
  }
};

export const eliminarPedido = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar el pedido:', error.message);
    throw error;
  }
};
// Nueva función para obtener un pedido por ID
export const obtenerPedidoPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener el pedido:', error.message);
    throw error;
  }
};
