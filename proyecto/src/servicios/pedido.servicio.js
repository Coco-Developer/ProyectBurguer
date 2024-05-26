import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

const pedidosCollection = collection(db, 'pedidos');

const handleResponse = async (action) => {
  try {
    return await action();
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
};

export const listarPedidos = async () => {
  try {
    const querySnapshot = await getDocs(pedidosCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener los pedidos:', error.message);
    throw error;
  }
};

export const agregarPedido = async (nuevoPedido) => {
  return handleResponse(async () => {
    const docRef = await addDoc(pedidosCollection, nuevoPedido);
    return { id: docRef.id, ...nuevoPedido };
  });
};

export const obtenerPedidoPorId = async (id) => {
  try {
    const docRef = doc(pedidosCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error('No existe el pedido con el ID especificado');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el pedido por ID:', error.message);
    throw error;
  }
};

export const editarPedido = async (id, nuevoPedido) => {
  return handleResponse(async () => {
    await updateDoc(doc(pedidosCollection, id), nuevoPedido);
    return { id, ...nuevoPedido };
  });
};

export const eliminarPedido = async (id) => {
  return handleResponse(async () => {
    await deleteDoc(doc(pedidosCollection, id));
    return { id };
  });
};
