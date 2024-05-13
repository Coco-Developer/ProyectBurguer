// URL base de tu API de pedidos
const BASE_URL = 'https://localhost:44328/Pedido';

// Función para listar todos los pedidos
export const listarPedidos = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los pedidos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al listar los pedidos:', error.message);
    throw error;
  }
};

// Función para agregar un nuevo pedido
export const agregarPedido = async (nuevoPedido) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoPedido),
    });
    if (!response.ok) {
      throw new Error('Error al agregar el pedido');
    }
  } catch (error) {
    console.error('Error al agregar el pedido:', error.message);
    throw error;
  }
};

// Función para actualizar un pedido existente
export const editarPedido = async (id, nuevoPedido) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoPedido),
    });
    if (!response.ok) {
      throw new Error('Error al editar el pedido');
    }
  } catch (error) {
    console.error('Error al editar el pedido:', error.message);
    throw error;
  }
};

// Función para eliminar un pedido
export const eliminarPedido = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el pedido');
    }
  } catch (error) {
    console.error('Error al eliminar el pedido:', error.message);
    throw error;
  }
};
